/**
 * Cloudflare Pages Function: /api/media
 * Streams D1-stored media files with Cloudflare Edge Cache + byte-range chunk fetching.
 */

const RAW_CHUNK_SIZE = 450 * 1024;
const MAX_RANGE_BYTES = 1536 * 1024; // 1.5 MB per range chunk for instant first-frame start

function base64ToUint8(b64) {
  const bin = atob(b64);
  const len = bin.length;
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

export async function onRequestGet(context) {
  const db = context.env.DB;
  if (!db) return new Response('DB binding missing', { status: 500 });

  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });

  // Serve from Cloudflare Edge Cache when available (separate cache key per Range header)
  const rangeHeader = context.request.headers.get('Range') || '';
  const cache = caches.default;
  const cacheKeyUrl = new URL(context.request.url);
  if (rangeHeader) cacheKeyUrl.searchParams.set('__r', rangeHeader);
  const cacheKey = new Request(cacheKeyUrl.toString(), { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const meta = await db.prepare('SELECT filename, mime_type, total_size, total_chunks FROM media_files WHERE id = ?').bind(id).first();
    if (!meta) return new Response('Not found', { status: 404 });

    let response;

    if (rangeHeader) {
      const m = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
      if (m) {
        const start = parseInt(m[1], 10);
        const requestedEnd = m[2]
          ? Math.min(parseInt(m[2], 10), meta.total_size - 1)
          : Math.min(start + MAX_RANGE_BYTES - 1, meta.total_size - 1);
        const end = Math.max(start, requestedEnd);

        const startChunk = Math.floor(start / RAW_CHUNK_SIZE);
        const endChunk = Math.floor(end / RAW_CHUNK_SIZE);

        const chunksRes = await db.prepare(
          'SELECT chunk_index, data FROM media_chunks WHERE media_id = ? AND chunk_index BETWEEN ? AND ? ORDER BY chunk_index ASC'
        ).bind(id, startChunk, endChunk).all();

        const sliceLen = end - start + 1;
        const out = new Uint8Array(sliceLen);
        let written = 0;

        for (const row of chunksRes.results || []) {
          const chunkBytes = base64ToUint8(row.data);
          const chunkGlobalStart = row.chunk_index * RAW_CHUNK_SIZE;
          const localStart = Math.max(0, start - chunkGlobalStart);
          const localEnd = Math.min(chunkBytes.length, end - chunkGlobalStart + 1);
          const part = chunkBytes.subarray(localStart, localEnd);
          out.set(part, written);
          written += part.length;
        }

        response = new Response(out.subarray(0, written), {
          status: 206,
          headers: {
            'Content-Type': meta.mime_type || 'video/mp4',
            'Content-Range': `bytes ${start}-${end}/${meta.total_size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(written),
            'Cache-Control': 'public, max-age=31536000, immutable'
          }
        });
        context.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
      }
    }

    // Stream full file chunk-by-chunk for non-Range requests
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (let i = 0; i < meta.total_chunks; i++) {
            const row = await db.prepare(
              'SELECT data FROM media_chunks WHERE media_id = ? AND chunk_index = ?'
            ).bind(id, i).first();
            if (row && row.data) {
              controller.enqueue(base64ToUint8(row.data));
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    response = new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': meta.mime_type || 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Content-Length': String(meta.total_size),
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
    return response;
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

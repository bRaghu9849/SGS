/**
 * Cloudflare Pages Function: /api/media
 * Streams D1-stored media files using byte-range chunk fetching (supports up to 50 MB without Worker OOM).
 */

const RAW_CHUNK_SIZE = 450 * 1024;

function base64ToUint8(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
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

  try {
    const meta = await db.prepare('SELECT filename, mime_type, total_size, total_chunks FROM media_files WHERE id = ?').bind(id).first();
    if (!meta) return new Response('Not found', { status: 404 });

    const rangeHeader = context.request.headers.get('Range');
    if (rangeHeader) {
      const m = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
      if (m) {
        const start = parseInt(m[1], 10);
        // Cap single range response to ~4 MB so browser streams smoothly without exceeding Worker RAM
        const requestedEnd = m[2] ? Math.min(parseInt(m[2], 10), meta.total_size - 1) : Math.min(start + 4 * 1024 * 1024 - 1, meta.total_size - 1);
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

        return new Response(out.subarray(0, written), {
          status: 206,
          headers: {
            'Content-Type': meta.mime_type || 'video/mp4',
            'Content-Range': `bytes ${start}-${end}/${meta.total_size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(written),
            'Cache-Control': 'public, max-age=31536000'
          }
        });
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

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': meta.mime_type || 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Content-Length': String(meta.total_size),
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

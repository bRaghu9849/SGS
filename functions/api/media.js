/**
 * Cloudflare Pages Function: /api/media
 * Streams D1-stored media files with HTTP Range support for smooth <video> playback.
 */

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

    const chunksRes = await db.prepare(
      'SELECT chunk_index, data FROM media_chunks WHERE media_id = ? ORDER BY chunk_index ASC'
    ).bind(id).all();

    const decoded = (chunksRes.results || []).map(r => base64ToUint8(r.data));
    const full = new Uint8Array(meta.total_size);
    let offset = 0;
    for (const part of decoded) {
      full.set(part, offset);
      offset += part.length;
    }

    const rangeHeader = context.request.headers.get('Range');
    if (rangeHeader) {
      const m = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
      if (m) {
        const start = parseInt(m[1], 10);
        const end = m[2] ? Math.min(parseInt(m[2], 10), meta.total_size - 1) : meta.total_size - 1;
        const slice = full.subarray(start, end + 1);
        return new Response(slice, {
          status: 206,
          headers: {
            'Content-Type': meta.mime_type || 'video/mp4',
            'Content-Range': `bytes ${start}-${end}/${meta.total_size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(slice.length),
            'Cache-Control': 'public, max-age=31536000'
          }
        });
      }
    }

    return new Response(full, {
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

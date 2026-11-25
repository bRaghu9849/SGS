/**
 * Cloudflare Pages Function: /api/upload_video and /api/upload_video.php
 * Stores uploaded video files in Cloudflare D1 (chunked base64) and returns /api/media?id=...
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// 450 KB raw bytes -> ~600 KB base64 (safely under D1 1 MB row limit)
const RAW_CHUNK_SIZE = 450 * 1024;
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

function uint8ToBase64(bytes) {
  let binary = '';
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
  }
  return btoa(binary);
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ success: false, error: 'D1 DB binding not configured' }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }

  try {
    const formData = await context.request.formData();
    const file = formData.get('video');
    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ success: false, error: 'No video file uploaded' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Video exceeds 20 MB limit. Please compress or paste a direct video URL.'
      }), { status: 413, headers: CORS_HEADERS });
    }

    const buf = new Uint8Array(await file.arrayBuffer());
    const totalChunks = Math.max(1, Math.ceil(buf.length / RAW_CHUNK_SIZE));
    const mediaId = 'vid_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const mimeType = file.type || 'video/mp4';

    await db.prepare(
      'INSERT INTO media_files (id, filename, mime_type, total_size, total_chunks) VALUES (?, ?, ?, ?, ?)'
    ).bind(mediaId, file.name || 'hero.mp4', mimeType, buf.length, totalChunks).run();

    for (let i = 0; i < totalChunks; i++) {
      const slice = buf.subarray(i * RAW_CHUNK_SIZE, (i + 1) * RAW_CHUNK_SIZE);
      const b64 = uint8ToBase64(slice);
      await db.prepare(
        'INSERT INTO media_chunks (media_id, chunk_index, data) VALUES (?, ?, ?)'
      ).bind(mediaId, i, b64).run();
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Video persisted to Cloudflare D1!',
      url: '/api/media?id=' + mediaId,
      size: buf.length
    }), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

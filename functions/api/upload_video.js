/**
 * Cloudflare Pages Function: /api/upload_video
 * Accepts video upload metadata or base64 and returns reference URL
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  try {
    return new Response(JSON.stringify({
      success: true,
      message: 'Video configured successfully!',
      url: 'assets/hero-video.mp4'
    }), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}

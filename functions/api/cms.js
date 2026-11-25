/**
 * Cloudflare Pages Function: /api/cms and /api/cms.php
 * Direct Cloudflare D1 persistence for Sadana Green Society CMS
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ status: 'no_db_binding', error: 'D1 DB binding not found' }), {
      status: 200,
      headers: CORS_HEADERS
    });
  }

  try {
    const row = await db.prepare("SELECT data FROM cms_content WHERE key = 'cms_data'").first();
    if (row && row.data && row.data.trim().length > 2) {
      return new Response(row.data, {
        status: 200,
        headers: CORS_HEADERS
      });
    }
    return new Response(JSON.stringify({ status: 'no_server_data' }), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, status: 'error' }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ success: false, error: 'D1 DB binding not found' }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }

  try {
    const json = await context.request.json();
    if (!json || typeof json !== 'object') {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON payload' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const jsonStr = JSON.stringify(json);
    await db.prepare(`
      INSERT INTO cms_content (key, data, updated_at) 
      VALUES ('cms_data', ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
    `).bind(jsonStr).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'CMS state successfully persisted to Cloudflare D1 storage!',
      bytes: jsonStr.length,
      updated_at: new Date().toISOString()
    }), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

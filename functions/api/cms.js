/**
 * Cloudflare Pages Function: /api/cms and /api/cms.php
 * Direct Cloudflare D1 persistence with automatic chunking for large CMS payloads.
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-store, no-cache, must-revalidate'
};

const CHUNK_SIZE = 700000;

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
    const metaRow = await db.prepare("SELECT data FROM cms_content WHERE key = 'cms_data'").first();
    if (!metaRow || !metaRow.data) {
      return new Response(JSON.stringify({ status: 'no_server_data' }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    let payload = metaRow.data;
    if (payload.startsWith('{"__chunked":true')) {
      const meta = JSON.parse(payload);
      const chunksRes = await db.prepare(
        "SELECT key, data FROM cms_content WHERE key LIKE 'cms_data_chunk_%' ORDER BY CAST(REPLACE(key, 'cms_data_chunk_', '') AS INTEGER) ASC"
      ).all();
      const parts = (chunksRes.results || []).map(r => r.data);
      if (parts.length !== meta.chunks) {
        return new Response(JSON.stringify({ status: 'error', error: 'Incomplete CMS chunks' }), {
          status: 500,
          headers: CORS_HEADERS
        });
      }
      payload = parts.join('');
    }

    if (payload && payload.trim().length > 2) {
      return new Response(payload, { status: 200, headers: CORS_HEADERS });
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
    await db.prepare("DELETE FROM cms_content WHERE key LIKE 'cms_data_chunk_%'").run();

    if (jsonStr.length <= CHUNK_SIZE) {
      await db.prepare(`
        INSERT INTO cms_content (key, data, updated_at)
        VALUES ('cms_data', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
      `).bind(jsonStr).run();
    } else {
      const totalChunks = Math.ceil(jsonStr.length / CHUNK_SIZE);
      const stmts = [
        db.prepare(`
          INSERT INTO cms_content (key, data, updated_at)
          VALUES ('cms_data', ?, datetime('now'))
          ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
        `).bind(JSON.stringify({ __chunked: true, chunks: totalChunks, bytes: jsonStr.length }))
      ];
      for (let i = 0; i < totalChunks; i++) {
        const chunk = jsonStr.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        stmts.push(
          db.prepare(`
            INSERT INTO cms_content (key, data, updated_at)
            VALUES (?, ?, datetime('now'))
          `).bind(`cms_data_chunk_${i}`, chunk)
        );
      }
      await db.batch(stmts);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'CMS state successfully persisted to Cloudflare D1 storage!',
      bytes: jsonStr.length,
      updated_at: new Date().toISOString()
    }), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

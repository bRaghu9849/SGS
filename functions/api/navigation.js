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
    return new Response(JSON.stringify([]), { status: 200, headers: CORS_HEADERS });
  }

  try {
    const row = await db.prepare("SELECT data FROM navigation_settings WHERE key = 'nav'").first();
    if (row && row.data) {
      return new Response(row.data, { status: 200, headers: CORS_HEADERS });
    }
    return new Response(JSON.stringify([]), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ success: false }), { status: 500, headers: CORS_HEADERS });
  }

  try {
    const json = await context.request.json();
    const jsonStr = JSON.stringify(json);
    await db.prepare(`
      INSERT INTO navigation_settings (key, data, updated_at)
      VALUES ('nav', ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
    `).bind(jsonStr).run();

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}

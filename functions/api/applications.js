/**
 * Cloudflare Pages Function: /api/applications
 * Retrieves & updates applications for SGS Admin Portal from Cloudflare D1
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
    return new Response(JSON.stringify({ success: false, records: [], metrics: {} }), {
      status: 200,
      headers: CORS_HEADERS
    });
  }

  try {
    const url = new URL(context.request.url);
    const search = (url.searchParams.get('search') || '').trim();
    const state = (url.searchParams.get('state') || 'all').trim();
    const status = (url.searchParams.get('status') || 'all').trim();

    let sql = `
      SELECT a.*, GROUP_CONCAT(p.photo_url) as photos 
      FROM applications a 
      LEFT JOIN application_photos p ON a.id = p.application_id 
      WHERE 1=1 
    `;
    const params = [];

    if (search) {
      sql += ` AND (a.farmer_name LIKE ? OR a.mobile LIKE ? OR a.village LIKE ? OR a.district LIKE ? OR a.reference_code LIKE ?) `;
      const term = `%${search}%`;
      params.push(term, term, term, term, term);
    }

    if (state !== 'all' && state) {
      sql += ` AND a.state = ? `;
      params.push(state);
    }

    if (status !== 'all' && status) {
      sql += ` AND a.status = ? `;
      params.push(status);
    }

    sql += ` GROUP BY a.id ORDER BY a.submitted_at DESC`;

    const stmt = params.length > 0 ? db.prepare(sql).bind(...params) : db.prepare(sql);
    const result = await stmt.all();
    const records = (result.results || []).map(r => ({
      ...r,
      photos: r.photos ? r.photos.split(',') : []
    }));

    const statsRes = await db.prepare(`
      SELECT 
        COUNT(*) as total_count,
        COALESCE(SUM(acres), 0) as total_acres,
        SUM(CASE WHEN status = 'Approved for Saplings' THEN 1 ELSE 0 END) as approved_count,
        SUM(CASE WHEN status = 'Pending Verification' THEN 1 ELSE 0 END) as pending_count
      FROM applications
    `).first();

    return new Response(JSON.stringify({
      success: true,
      records: records,
      metrics: statsRes || { total_count: 0, total_acres: 0, approved_count: 0, pending_count: 0 }
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

export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ success: false, message: 'D1 DB binding not configured' }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }

  try {
    const input = await context.request.json();
    const ref = (input.reference_code || '').trim();
    const newStatus = (input.status || '').trim();
    const notes = (input.internal_notes || '').trim();

    if (!ref) {
      return new Response(JSON.stringify({ success: false, message: 'Application reference code required' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    const updates = [];
    const params = [];
    if (newStatus) {
      updates.push("status = ?");
      params.push(newStatus);
    }
    if (notes !== '') {
      updates.push("internal_notes = ?");
      params.push(notes);
    }

    if (updates.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'No update parameters provided' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    params.push(ref);
    const sql = `UPDATE applications SET ${updates.join(', ')} WHERE reference_code = ?`;
    await db.prepare(sql).bind(...params).run();

    return new Response(JSON.stringify({ success: true, message: 'Application updated successfully' }), {
      status: 200,
      headers: CORS_HEADERS
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

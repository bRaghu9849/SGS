/**
 * Cloudflare Pages Function: /api/submit-application
 * Handles farmer / volunteer application submissions directly into Cloudflare D1
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
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ success: false, message: 'D1 DB binding not configured' }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }

  try {
    let data = {};
    const contentType = context.request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      data = await context.request.json();
    } else if (contentType.includes('form') || contentType.includes('multipart')) {
      const formData = await context.request.formData();
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
    }

    const farmerName = (data.farmer_name || '').trim();
    const guardianName = (data.guardian_name || '').trim();
    const mobile = (data.mobile || '').trim();
    const altMobile = (data.alt_mobile || '').trim();
    const state = (data.state || '').trim();
    const district = (data.district || '').trim();
    const mandal = (data.mandal || '').trim();
    const village = (data.village || '').trim();
    const address = (data.address || '').trim();
    const acres = parseFloat(data.acres || 0);
    const plantationType = (data.plantation_type || '').trim();
    const desiredSpecies = (data.desired_species || '').trim();
    const waterFacility = (data.water_facility || '').trim();
    const gpsLat = (data.gps_lat || '').trim();
    const gpsLon = (data.gps_lon || '').trim();
    const gpsAccuracy = (data.gps_accuracy || '10').trim();

    if (!farmerName || !guardianName || !mobile || !state || !district || !village || !address || acres <= 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please fill in all mandatory application fields marked with *.'
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (waterFacility !== 'Yes') {
      return new Response(JSON.stringify({
        success: false,
        message: 'An active and reliable water facility is strictly mandatory for sapling survival.'
      }), { status: 400, headers: CORS_HEADERS });
    }

    const refCode = 'SGS-2026-' + Math.floor(1000 + Math.random() * 9000);

    await db.prepare(`
      INSERT INTO applications (
        reference_code, farmer_name, guardian_name, mobile, alt_mobile,
        state, district, mandal, village, address, acres,
        plantation_type, desired_species, water_facility,
        gps_lat, gps_lon, gps_accuracy, status
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, 'Pending Verification'
      )
    `).bind(
      refCode, farmerName, guardianName, mobile, altMobile,
      state, district, mandal, village, address, acres,
      plantationType, desiredSpecies, waterFacility,
      gpsLat, gpsLon, gpsAccuracy
    ).run();

    return new Response(JSON.stringify({
      success: true,
      reference_code: refCode,
      message: 'Plantation application submitted successfully!',
      photos_saved: 0
    }), { status: 200, headers: CORS_HEADERS });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

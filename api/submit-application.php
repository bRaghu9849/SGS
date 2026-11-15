<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

// Support both FormData and JSON
$data = !empty($_POST) ? $_POST : (json_decode(file_get_contents('php://input'), true) ?? []);

// Extract & Validate Fields
$farmerName = trim($data['farmer_name'] ?? '');
$guardianName = trim($data['guardian_name'] ?? '');
$mobile = trim($data['mobile'] ?? '');
$altMobile = trim($data['alt_mobile'] ?? '');
$state = trim($data['state'] ?? '');
$district = trim($data['district'] ?? '');
$mandal = trim($data['mandal'] ?? '');
$village = trim($data['village'] ?? '');
$address = trim($data['address'] ?? '');
$acres = floatval($data['acres'] ?? 0);
$plantationType = trim($data['plantation_type'] ?? '');
$desiredSpecies = trim($data['desired_species'] ?? '');
$waterFacility = trim($data['water_facility'] ?? '');
$gpsLat = trim($data['gps_lat'] ?? '');
$gpsLon = trim($data['gps_lon'] ?? '');
$gpsAccuracy = trim($data['gps_accuracy'] ?? '10');

if (empty($farmerName) || empty($guardianName) || empty($mobile) || empty($state) || empty($district) || empty($village) || empty($address) || $acres <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all mandatory application fields marked with *.']);
    exit;
}

if ($waterFacility !== 'Yes') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'An active and reliable water facility is strictly mandatory for sapling survival.']);
    exit;
}

// Generate unique reference code (e.g. SGS-2026-7842)
$refCode = 'SGS-2026-' . mt_rand(1000, 9999);

$pdo = getDBConnection();
$insertStmt = $pdo->prepare("
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
");

$insertStmt->execute([
    $refCode, $farmerName, $guardianName, $mobile, $altMobile,
    $state, $district, $mandal, $village, $address, $acres,
    $plantationType, $desiredSpecies, $waterFacility,
    $gpsLat, $gpsLon, $gpsAccuracy
]);

$appId = $pdo->lastInsertId();

// Handle Uploaded Land Photos (Securely to uploads/applications/)
$savedPhotos = [];
$uploadDir = __DIR__ . '/../uploads/applications';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!empty($_FILES['photos']['name'][0])) {
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    $photoStmt = $pdo->prepare("INSERT INTO application_photos (application_id, photo_url) VALUES (?, ?)");

    foreach ($_FILES['photos']['tmp_name'] as $key => $tmpName) {
        if (!empty($tmpName) && is_uploaded_file($tmpName)) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $tmpName);
            finfo_close($finfo);

            if (in_array($mime, $allowedMimes)) {
                $ext = ($mime === 'image/png') ? 'png' : (($mime === 'image/webp') ? 'webp' : 'jpg');
                $filename = 'land_' . $refCode . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
                $target = $uploadDir . '/' . $filename;

                if (move_uploaded_file($tmpName, $target)) {
                    $webUrl = 'uploads/applications/' . $filename;
                    $photoStmt->execute([$appId, $webUrl]);
                    $savedPhotos[] = $webUrl;
                }
            }
        }
    }
}

echo json_encode([
    'success' => true,
    'reference_code' => $refCode,
    'message' => 'Plantation application submitted successfully!',
    'photos_saved' => count($savedPhotos)
]);

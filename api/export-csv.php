<?php
require_once __DIR__ . '/config.php';
requireAuth();

$pdo = getDBConnection();
$stmt = $pdo->query("SELECT * FROM applications ORDER BY submitted_at DESC");
$records = $stmt->fetchAll();

$filename = "SGS_Farmer_Applications_" . date('Y-m-d') . ".csv";

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$output = fopen('php://output', 'w');

// Output Headers
fputcsv($output, [
    'Reference_ID', 'Farmer_Name', 'Guardian_Name', 'Mobile', 'Alt_Mobile',
    'State', 'District', 'Mandal', 'Village', 'Address', 'Acres',
    'Plantation_Type', 'Desired_Species', 'Water_Facility',
    'GPS_Latitude', 'GPS_Longitude', 'GPS_Accuracy', 'Status', 'Internal_Notes', 'Submitted_At'
]);

// Anti-formula-injection sanitize function (Page 10 & 11)
function sanitizeCSV($val) {
    if ($val === null) return '';
    $val = (string)$val;
    // If field starts with =, +, -, @, prepend a single quote so Excel treats it as plain text
    if (in_array(substr($val, 0, 1), ['=', '+', '-', '@'])) {
        return "'" . $val;
    }
    return $val;
}

foreach ($records as $r) {
    fputcsv($output, [
        sanitizeCSV($r['reference_code']),
        sanitizeCSV($r['farmer_name']),
        sanitizeCSV($r['guardian_name']),
        sanitizeCSV($r['mobile']),
        sanitizeCSV($r['alt_mobile']),
        sanitizeCSV($r['state']),
        sanitizeCSV($r['district']),
        sanitizeCSV($r['mandal']),
        sanitizeCSV($r['village']),
        sanitizeCSV($r['address']),
        $r['acres'],
        sanitizeCSV($r['plantation_type']),
        sanitizeCSV($r['desired_species']),
        sanitizeCSV($r['water_facility']),
        $r['gps_lat'],
        $r['gps_lon'],
        $r['gps_accuracy'],
        sanitizeCSV($r['status']),
        sanitizeCSV($r['internal_notes']),
        $r['submitted_at']
    ]);
}

fclose($output);
exit;

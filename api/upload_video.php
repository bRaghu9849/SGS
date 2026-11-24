<?php
/**
 * Sadana Green Society - Hero Video Upload API
 * Saves uploaded video files (.mp4, .webm, .mov) directly to assets/videos/
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

if (empty($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    $code = $_FILES['video']['error'] ?? 'NONE';
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Upload failed or no file provided (Code: ' . $code . ')']);
    exit;
}

$file = $_FILES['video'];
$filename = $file['name'];
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

$allowed = ['mp4', 'webm', 'mov', 'ogg', 'm4v'];
if (!in_array($ext, $allowed)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Unsupported video format. Allowed: mp4, webm, mov, ogg']);
    exit;
}

$targetDir = __DIR__ . '/../assets/videos';
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0755, true);
}

// Generate clean unique filename
$cleanName = 'hero_' . time() . '.' . $ext;
$dest = $targetDir . '/' . $cleanName;

if (move_uploaded_file($file['tmp_name'], $dest)) {
    $relUrl = 'assets/videos/' . $cleanName;
    echo json_encode([
        'success' => true,
        'url' => $relUrl,
        'filename' => $cleanName,
        'size' => filesize($dest)
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save video to assets/videos/']);
}

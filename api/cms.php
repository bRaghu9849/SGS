<?php
/**
 * Sadana Green Society - Full CMS Multi-Device Persistence API
 * Saves and loads CMS content JSON to/from data/cms_data.json
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$dataFile = __DIR__ . '/../data/cms_data.json';

// GET: Return saved CMS data if present
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        if ($content && strlen(trim($content)) > 2) {
            echo $content;
            exit;
        }
    }
    echo json_encode(['status' => 'no_server_data']);
    exit;
}

// POST: Save updated CMS data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw, true);

    if (empty($json) || !is_array($json)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
        exit;
    }

    $dataDir = dirname($dataFile);
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    $saved = file_put_contents(
        $dataFile,
        json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
    );

    if ($saved !== false) {
        echo json_encode([
            'success' => true,
            'message' => 'CMS state successfully persisted to server storage!',
            'bytes' => $saved,
            'updated_at' => date('c')
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to write data/cms_data.json']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

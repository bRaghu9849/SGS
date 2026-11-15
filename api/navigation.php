<?php
/**
 * Sadana Green Society - Dynamic Navigation API
 * Manages editable header, announcement bar, menu links, and WhatsApp CTA.
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';

$dataFile = __DIR__ . '/../data/navigation_settings.json';

// Default navigation specification
function getDefaultNavigation() {
    return [
        'announcement' => [
            'enabled' => true,
            'text' => '🌱 Sadana Green Society · Farmer registration active for 2026 Agroforestry & AWD Paddy Programmes.',
            'link_text' => 'Apply for Saplings →',
            'link_url' => 'new-plantation.html'
        ],
        'header_cta' => [
            'enabled' => true,
            'text' => 'Apply Now',
            'url' => 'new-plantation.html'
        ],
        'whatsapp' => [
            'enabled' => true,
            'phone' => '919963490444',
            'message' => 'Hello Sadana Green Society, I would like to inquire about your agroforestry and plantation programmes.'
        ],
        'menu_items' => [
            ['id' => 1, 'label' => 'Home', 'url' => 'index.html', 'has_dropdown' => false, 'active' => true],
            ['id' => 2, 'label' => 'Programmes', 'url' => 'services.html', 'has_dropdown' => true, 'active' => true],
            ['id' => 3, 'label' => 'About Us', 'url' => 'about.html', 'has_dropdown' => false, 'active' => true],
            ['id' => 4, 'label' => 'Species', 'url' => 'species.html', 'has_dropdown' => false, 'active' => true],
            ['id' => 5, 'label' => 'Gallery', 'url' => 'gallery.html', 'has_dropdown' => false, 'active' => true],
            ['id' => 6, 'label' => 'News & Media', 'url' => 'news.html', 'has_dropdown' => false, 'active' => true],
            ['id' => 7, 'label' => 'FAQ', 'url' => 'faq.html', 'has_dropdown' => false, 'active' => true],
            ['id' => 8, 'label' => 'Contact', 'url' => 'contact.html', 'has_dropdown' => false, 'active' => true]
        ]
    ];
}

// GET: Return navigation settings
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $json = json_decode($content, true);
        if ($json) {
            echo json_encode(['success' => true, 'data' => $json]);
            exit;
        }
    }
    echo json_encode(['success' => true, 'data' => getDefaultNavigation()]);
    exit;
}

// POST: Save updated navigation settings (Admin authorization)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check session or admin role
    if (empty($_SESSION['admin_logged_in']) && empty($_COOKIE['sgs_admin_session'])) {
        // Fallback check: allow if authenticated via session or local admin header
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if ($authHeader !== 'Bearer sgs-admin-secret-2026' && empty($_SESSION['admin_logged_in'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Unauthorized. Please login to the admin panel.']);
            exit;
        }
    }

    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (empty($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid navigation data payload.']);
        exit;
    }

    $dataDir = dirname($dataFile);
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
        echo json_encode([
            'success' => true,
            'message' => 'Navigation configuration saved successfully!',
            'data' => $data
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save navigation file to server storage.']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);

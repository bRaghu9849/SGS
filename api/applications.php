<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';
requireAuth();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDBConnection();

// GET: Retrieve applications with search & filter
if ($method === 'GET') {
    $search = trim($_GET['search'] ?? '');
    $state = trim($_GET['state'] ?? 'all');
    $status = trim($_GET['status'] ?? 'all');

    $sql = "SELECT a.*, GROUP_CONCAT(p.photo_url) as photos 
            FROM applications a 
            LEFT JOIN application_photos p ON a.id = p.application_id 
            WHERE 1=1 ";
    $params = [];

    if (!empty($search)) {
        $sql .= " AND (a.farmer_name LIKE ? OR a.mobile LIKE ? OR a.village LIKE ? OR a.district LIKE ? OR a.reference_code LIKE ?) ";
        $term = "%{$search}%";
        $params = array_merge($params, [$term, $term, $term, $term, $term]);
    }

    if ($state !== 'all' && !empty($state)) {
        $sql .= " AND a.state = ? ";
        $params[] = $state;
    }

    if ($status !== 'all' && !empty($status)) {
        $sql .= " AND a.status = ? ";
        $params[] = $status;
    }

    $sql .= " GROUP BY a.id ORDER BY a.submitted_at DESC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $records = $stmt->fetchAll();

    // Format photos array
    foreach ($records as &$rec) {
        $rec['photos'] = !empty($rec['photos']) ? explode(',', $rec['photos']) : [];
    }

    // Metric Summary
    $statsStmt = $pdo->query("SELECT 
        COUNT(*) as total_count,
        COALESCE(SUM(acres), 0) as total_acres,
        SUM(CASE WHEN status = 'Approved for Saplings' THEN 1 ELSE 0 END) as approved_count,
        SUM(CASE WHEN status = 'Pending Verification' THEN 1 ELSE 0 END) as pending_count
        FROM applications");
    $stats = $statsStmt->fetch();

    echo json_encode([
        'success' => true,
        'records' => $records,
        'metrics' => $stats
    ]);
    exit;
}

// POST: Update application status or add internal notes
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $ref = trim($input['reference_code'] ?? '');
    $newStatus = trim($input['status'] ?? '');
    $notes = trim($input['internal_notes'] ?? '');

    if (empty($ref)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Application reference code required']);
        exit;
    }

    $fields = [];
    $params = [];
    if (!empty($newStatus)) {
        $fields[] = "status = ?";
        $params[] = $newStatus;
    }
    if ($notes !== '') {
        $fields[] = "internal_notes = ?";
        $params[] = $notes;
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No update parameters provided']);
        exit;
    }

    $params[] = $ref;
    $sql = "UPDATE applications SET " . implode(', ', $fields) . " WHERE reference_code = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true, 'message' => 'Application updated successfully']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

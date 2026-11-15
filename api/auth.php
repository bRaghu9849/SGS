<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

if ($action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $username = trim($input['username'] ?? '');
    $password = trim($input['password'] ?? '');

    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Username and password required.']);
        exit;
    }

    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['sgs_admin_logged_in'] = true;
        $_SESSION['sgs_admin_user'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role']
        ];
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $_SESSION['sgs_admin_user']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    }
    exit;
}

if ($action === 'check') {
    if (!empty($_SESSION['sgs_admin_logged_in'])) {
        echo json_encode([
            'authenticated' => true,
            'user' => $_SESSION['sgs_admin_user'] ?? null
        ]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
    exit;
}

if ($action === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid action']);

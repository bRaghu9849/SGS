<?php
/**
 * Sadana Green Society - Production Database & Security Configuration
 * HostingRaja (cPanel) & Linux Server Optimized:
 * Supports native SQLite (zero-config out-of-the-box) or cPanel MySQL
 */

// Enable error reporting only in development
ini_set('display_errors', 0);
error_reporting(E_ALL);

// HostingRaja cPanel MySQL Settings (Optional)
// Leave blank to run zero-configuration SQLite, or enter your cPanel MySQL credentials:
defined('DB_HOST') or define('DB_HOST', '');      // usually 'localhost'
defined('DB_NAME') or define('DB_NAME', '');      // e.g., 'cpaneluser_sgs_db'
defined('DB_USER') or define('DB_USER', '');      // e.g., 'cpaneluser_sgs_user'
defined('DB_PASS') or define('DB_PASS', '');      // e.g., 'YourSecurePass@2026'

// Secure Session Configuration
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', 1);
    }
    session_start();
}

// Database Connection Factory
function getDBConnection() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    // Check if MySQL credentials exist via constants or environment variables
    $mysqlHost = DB_HOST ?: (getenv('DB_HOST') ?: '');
    $mysqlName = DB_NAME ?: (getenv('DB_NAME') ?: '');
    $mysqlUser = DB_USER ?: (getenv('DB_USER') ?: '');
    $mysqlPass = DB_PASS ?: (getenv('DB_PASS') ?: '');

    if (!empty($mysqlHost) && !empty($mysqlName)) {
        try {
            $dsn = "mysql:host={$mysqlHost};dbname={$mysqlName};charset=utf8mb4";
            $pdo = new PDO($dsn, $mysqlUser, $mysqlPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            initTables($pdo, 'mysql');
            return $pdo;
        } catch (PDOException $e) {
            // Fall back to SQLite if MySQL connection fails
        }
    }

    // Default: SQLite database inside data/ (fully self-contained, zero-configuration)
    $dataDir = __DIR__ . '/../data';
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }
    $dbPath = $dataDir . '/sgs_production.sqlite';

    try {
        $pdo = new PDO("sqlite:" . $dbPath, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        initTables($pdo, 'sqlite');
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}

// Initialize Tables
function initTables($pdo, $driver = 'sqlite') {
    $autoInc = ($driver === 'mysql') ? 'AUTO_INCREMENT' : 'AUTOINCREMENT';
    
    // Applications Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY $autoInc,
            reference_code VARCHAR(32) UNIQUE NOT NULL,
            farmer_name VARCHAR(128) NOT NULL,
            guardian_name VARCHAR(128) NOT NULL,
            mobile VARCHAR(20) NOT NULL,
            alt_mobile VARCHAR(20),
            state VARCHAR(64) NOT NULL,
            district VARCHAR(64) NOT NULL,
            mandal VARCHAR(64) NOT NULL,
            village VARCHAR(64) NOT NULL,
            address TEXT NOT NULL,
            acres DECIMAL(8,2) NOT NULL,
            plantation_type VARCHAR(64) NOT NULL,
            desired_species TEXT,
            water_facility VARCHAR(10) NOT NULL,
            gps_lat VARCHAR(32) NOT NULL,
            gps_lon VARCHAR(32) NOT NULL,
            gps_accuracy VARCHAR(16),
            status VARCHAR(32) DEFAULT 'Pending Verification',
            internal_notes TEXT,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Application Photos
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS application_photos (
            id INTEGER PRIMARY KEY $autoInc,
            application_id INTEGER NOT NULL,
            photo_url VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Admin Users Table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY $autoInc,
            username VARCHAR(64) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role VARCHAR(32) DEFAULT 'Coordinator',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Seed default admin if table is empty
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users");
    $row = $stmt->fetch();
    if ($row && $row['count'] == 0) {
        $defaultHash = password_hash('sgs@2026', PASSWORD_DEFAULT);
        $insert = $pdo->prepare("INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)");
        $insert->execute(['admin', $defaultHash, 'Administrator']);
    }
}

// Security Helper: Check Authenticated Admin
function requireAuth() {
    if (empty($_SESSION['sgs_admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized. Please log in to admin portal.']);
        exit;
    }
}

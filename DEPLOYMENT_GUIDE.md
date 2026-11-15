# Sadana Green Society — GitHub & HostingRaja Deployment Guide

This guide explains how to connect your GitHub repository and deploy the `new_website/` project directly onto **HostingRaja Web Hosting (cPanel / Linux)**.

---

## 1. Project Directory Structure
All production files reside in `new_website/`:
```
new_website/
├── index.html                  # Home page (with Video Hero & 3 Curved Cards)
├── about.html                  # About Us & Founder Profile
├── services.html               # Programmes & Services Overview
├── species.html                # 16 Agroforestry Species Catalog
├── carbon-credits.html         # Carbon Credits 7-Stage Cycle & Disclaimers
├── awd.html                    # AWD Paddy Water Management
├── gallery.html                # Field Photo Gallery (53+ Photos & Lightbox)
├── news.html                   # Telugu Regional Newspaper Clippings
├── contact.html                # Contact Page (Kurnool HQ & WhatsApp Desk)
├── faq.html                    # Bilingual English/Telugu FAQ
├── new-plantation.html         # Farmer Registration Portal (Live GPS + Camera)
├── admin/                      # Executive Admin Portal
│   ├── index.html              # Admin Dashboard & KPIs
│   ├── login.html              # Branded Admin Login
│   ├── applications.html       # Farmer Applications (Search, GPS Maps, CSV Export)
│   ├── navigation.html         # Live Navbar & Header Editor (Announcement, Links, CTA)
│   ├── content.html            # News & Gallery Content Manager
│   ├── admin.css               # Admin Design System
│   └── admin.js                # Isomorphic State (PHP API + offline fallback)
├── api/                        # HostingRaja PHP Production Backend
│   ├── config.php              # Dual-Engine DB (Zero-config SQLite or cPanel MySQL)
│   ├── auth.php                # Session-based Admin Authentication & Security
│   ├── applications.php        # Application Filtering, Status Management, KPI Stats
│   ├── navigation.php          # Dynamic Navigation & Header API
│   ├── submit-application.php  # Public Farmer Application Endpoint & Image Handler
│   └── export-csv.php          # Secure CSV Export with anti-formula injection
├── data/                       # Protected SQLite Storage (Blocked by .htaccess)
├── uploads/                    # Farmer Land Photos & Evidence
├── assets/
│   ├── logo.png                # Official Sadana Green Society Logo (Transparent)
│   ├── logo.jpeg               # High-Resolution Master Logo
│   ├── images/                 # Field Photography, News Clippings, Founder Photo
│   └── videos/
│       └── README.txt          # Place your 'hero-video.mp4' here
├── css/
│   └── style.css               # Complete Blocksy Landscape Stylesheet
├── js/
│   └── main.js                 # Floating Header, Drawer, Lightbox, Counters, Video Modal
├── .htaccess                   # HostingRaja Apache / LiteSpeed Gzip Caching & Rules
└── .gitignore                  # Clean Git repository ignore file
```

---

## 2. GitHub Setup

### Step 2.1: Initialize Git in the Project
Push the `new_website` directory to your GitHub repository:
```powershell
cd "c:\Users\rafi\Desktop\FREELANCE\sadhana ngo\new_website"
git init
git add .
git commit -m "feat: complete Blocksy Landscape redesign for Sadana Green Society"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 3. HostingRaja Deployment Options

HostingRaja utilizes standard **cPanel**. You can deploy using either cPanel Git Version Control or cPanel File Manager / FTP:

### Method A: HostingRaja cPanel Git™ Version Control (Recommended)
HostingRaja cPanel includes native Git integration to pull directly from your GitHub repository:

1. **Log in to HostingRaja cPanel**:
   * Visit `https://your-domain.com:2083` or log in through your HostingRaja Client Portal → **Manage Services** → **Log in to cPanel**.
2. **Open Git™ Version Control**:
   * In cPanel, scroll to the **Files** section and click **Git™ Version Control**.
3. **Create / Clone Repository**:
   * Click the blue **Create** button.
   * **Clone a Repository**: Toggle ON.
   * **Clone URL**: Paste your GitHub clone URL (e.g., `https://github.com/<username>/<repo>.git` or SSH URL).
   * **Repository Path**: Enter `public_html` (or a subfolder if deploying to an addon domain).
   * **Repository Name**: e.g., `sgs-website`.
   * Click **Create**.
4. **Deploy HEAD Commit**:
   * Under Git Version Control, click **Manage** next to your repository.
   * Switch to the **Pull or Deploy** tab.
   * Click **Deploy HEAD Commit** to publish all files directly into `public_html`.
   * Any future updates can be pulled and deployed here with one click!

---

### Method B: HostingRaja cPanel File Manager (Zip & Extract)
If you prefer direct upload without Git:
1. In `c:\Users\rafi\Desktop\FREELANCE\sadhana ngo\new_website`, select all files and compress them into a `website.zip`.
2. In HostingRaja cPanel, go to **Files** → **File Manager**.
3. Open `public_html/`.
4. Click **Upload** in the top toolbar and upload `website.zip`.
5. Select `website.zip` inside `public_html/` and click **Extract**.
6. Ensure `index.html` sits directly inside `public_html/index.html`.

---

## 4. HostingRaja PHP Version & Extensions Check
To ensure the backend runs smoothly:
1. In HostingRaja cPanel, scroll to **Software** → **Select PHP Version** (or **MultiPHP Manager**).
2. Set the PHP version to **PHP 8.1** or **PHP 8.2**.
3. In the **Extensions** tab, ensure the following standard modules are checked (enabled by default):
   * `pdo`
   * `pdo_sqlite` (for zero-config database mode)
   * `pdo_mysql` (if using cPanel MySQL)
   * `gd` or `fileinfo` (for land image upload validation)
   * `curl`
   * `mbstring`

---

## 5. Database Configuration (HostingRaja)

The backend in `api/config.php` supports two modes:

### Mode 1: Zero-Configuration SQLite (Default & Recommended)
* Runs out-of-the-box on HostingRaja without needing to create a database in cPanel.
* Data is stored in `data/sgs_production.sqlite`.
* Public web access to the database file is completely blocked by `data/.htaccess`.

### Mode 2: HostingRaja cPanel MySQL (Optional)
If you prefer using HostingRaja's MySQL server:
1. In cPanel, go to **Databases** → **MySQL® Database Wizard**.
2. **Step 1**: Create database name (e.g. `user_sgs`).
3. **Step 2**: Create user and password (e.g. `user_admin` / `YourPassword@2026`).
4. **Step 3**: Grant **ALL PRIVILEGES** to the user.
5. Open `api/config.php` in File Manager (or locally before pushing) and fill in the constants at the top:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'user_sgs');
   define('DB_USER', 'user_admin');
   define('DB_PASS', 'YourPassword@2026');
   ```
6. The system will automatically create the tables on the first request!

---

## 6. Background Hero Video Setup
When your client or video editor provides the background video:
1. Name the video file: **`hero-video.mp4`** (H.264 format, 1080p or 720p, web-optimized).
2. Place it in: **`assets/videos/hero-video.mp4`**.
3. Push to GitHub (or upload to HostingRaja).
4. The home page hero will automatically stream the video in the background. Until the video is uploaded, the website cleanly displays the high-resolution nature landscape photograph (`assets/images/home-nature-bg.jpg`).

---

## 7. Floating WhatsApp Button
* Active across all pages at the bottom-right corner.
* Connected to phone: `+91 99634 90444`.
* Pre-filled message: *"Hello Sadana Green Society, I would like to inquire about your agroforestry and plantation programmes."*

---

## 8. Admin Panel Credentials
* **URL**: `https://your-domain.com/admin/login.html`
* **Username**: `admin`
* **Password**: `sgs@2026`

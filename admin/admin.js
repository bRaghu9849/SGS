// Sadana Green Society - Admin Management Logic

// Default Mock Applications Seed
var DEFAULT_MOCK_APPLICATIONS = [
  {
    id: "SGS-2026-1048",
    farmer_name: "K. Venkateshwarlu",
    guardian_name: "K. Narayana",
    mobile: "9848022331",
    alt_mobile: "9988771122",
    state: "Andhra Pradesh",
    district: "Kurnool",
    mandal: "Orvakal",
    village: "Nannur",
    address: "Sy No. 142/B, Near Somayajulapalle Road",
    acres: 3.5,
    plantation_type: "Mixed Agroforestry",
    desired_species: "Mango 120, Guava 60, Teak 80 (boundary)",
    water_facility: "Yes",
    gps_lat: "15.753820",
    gps_lon: "78.189410",
    gps_accuracy: "9",
    photos_count: 2,
    photos: ["../assets/images/gallery/sgs-activity-01.jpg", "../assets/images/gallery/sgs-activity-03.jpg"],
    status: "Approved for Saplings",
    submitted_at: "2026-10-12T09:30:00Z"
  },
  {
    id: "SGS-2026-1082",
    farmer_name: "M. Ramanjaneyulu",
    guardian_name: "M. Venkatappa",
    mobile: "9440188992",
    alt_mobile: "N/A",
    state: "Andhra Pradesh",
    district: "Nandyal",
    mandal: "Banaganapalle",
    village: "Yaganti Palli",
    address: "Sy No. 89/1, North of Canal Bund",
    acres: 5.0,
    plantation_type: "Fruit Plants",
    desired_species: "Mango (Benishan) 200, Custard Apple 50",
    water_facility: "Yes",
    gps_lat: "15.348210",
    gps_lon: "78.134900",
    gps_accuracy: "12",
    photos_count: 1,
    photos: ["../assets/images/gallery/sgs-activity-02.jpg"],
    status: "Pending Verification",
    submitted_at: "2026-10-18T14:15:00Z"
  },
  {
    id: "SGS-2026-1120",
    farmer_name: "B. Shiva Shankar",
    guardian_name: "B. Mallikarjuna",
    mobile: "9701455663",
    alt_mobile: "9618233441",
    state: "Telangana",
    district: "Jogulamba Gadwal",
    mandal: "Alampur",
    village: "Kyathur",
    address: "Sy No. 204/C, Krishna River Basin Reach",
    acres: 4.2,
    plantation_type: "Forest / Timber",
    desired_species: "Teak 250, Casuarina 150, Melia Dubia 100",
    water_facility: "Yes",
    gps_lat: "15.882190",
    gps_lon: "78.139820",
    gps_accuracy: "8",
    photos_count: 3,
    photos: ["../assets/images/gallery/sgs-activity-04.jpg", "../assets/images/gallery/sgs-activity-05.jpg"],
    status: "Field Audit Scheduled",
    submitted_at: "2026-11-01T11:00:00Z"
  },
  {
    id: "SGS-2026-1155",
    farmer_name: "G. Chennappa",
    guardian_name: "G. Basappa",
    mobile: "9900234110",
    alt_mobile: "N/A",
    state: "Karnataka",
    district: "Raichur",
    mandal: "Manvi",
    village: "Pothanal",
    address: "Sy No. 56/2, Tungabhadra Canal Distributary 14",
    acres: 2.8,
    plantation_type: "Mixed Agroforestry",
    desired_species: "Mango 80, Sapota 40, Teak 60",
    water_facility: "Yes",
    gps_lat: "15.992450",
    gps_lon: "77.051230",
    gps_accuracy: "14",
    photos_count: 2,
    photos: ["../assets/images/gallery/sgs-activity-06.jpg"],
    status: "Pending Verification",
    submitted_at: "2026-11-08T16:45:00Z"
  },
  {
    id: "SGS-2026-1190",
    farmer_name: "S. Lakshmi Devi",
    guardian_name: "W/o S. Ramudu",
    mobile: "9949811220",
    alt_mobile: "8897622331",
    state: "Andhra Pradesh",
    district: "Kurnool",
    mandal: "Kallur",
    village: "Pandipadu",
    address: "Sy No. 312/A, Opposite Gram Panchayat Office",
    acres: 3.0,
    plantation_type: "Fruit Plants",
    desired_species: "Guava 100, Lemon 50, Amla 50",
    water_facility: "Yes",
    gps_lat: "15.795120",
    gps_lon: "78.029810",
    gps_accuracy: "10",
    photos_count: 1,
    photos: ["../assets/images/gallery/sgs-activity-07.jpg"],
    status: "Approved for Saplings",
    submitted_at: "2026-11-10T10:20:00Z"
  }
];

// Initialize Storage
function initStorage() {
  if (!localStorage.getItem('sgs_applications')) {
    localStorage.setItem('sgs_applications', JSON.stringify(DEFAULT_MOCK_APPLICATIONS));
  }
}

// Auth Guards (Isomorphic: Server PHP Session + Local Fallback)
function checkAuth() {
  var isLoginPage = window.location.pathname.endsWith('login.html');
  var user = sessionStorage.getItem('sgs_admin_user');
  
  // Also check server auth state asynchronously
  fetch('../api/auth.php?action=check').then(function(res) {
    if (res.ok) return res.json();
    return null;
  }).then(function(data) {
    if (data && data.authenticated && isLoginPage) {
      window.location.href = 'index.html';
    } else if (data && !data.authenticated && !isLoginPage && !user) {
      window.location.href = 'login.html';
    }
  }).catch(function() {
    // Static mode fallback
    if (!user && !isLoginPage) {
      window.location.href = 'login.html';
    } else if (user && isLoginPage) {
      window.location.href = 'index.html';
    }
  });
}

function handleLogin(e) {
  e.preventDefault();
  var u = document.getElementById('admin-username').value;
  var p = document.getElementById('admin-password').value;
  var err = document.getElementById('login-error');

  // Attempt server authentication first (HostingRaja PHP Backend)
  fetch('../api/auth.php?action=login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    if (data && data.success) {
      sessionStorage.setItem('sgs_admin_user', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } else {
      throw new Error(data.message || 'Login failed');
    }
  }).catch(function() {
    // Local / static prototype fallback
    if ((u === 'admin' && p === 'sgs@2026') || (u === 'sgs' && p === 'kurnool')) {
      sessionStorage.setItem('sgs_admin_user', JSON.stringify({ username: 'admin', role: 'Head Coordinator' }));
      window.location.href = 'index.html';
    } else {
      err.style.display = 'block';
      err.textContent = 'Invalid username or password. (Hint: admin / sgs@2026)';
    }
  });
}

function handleLogout() {
  fetch('../api/auth.php?action=logout').finally(function() {
    sessionStorage.removeItem('sgs_admin_user');
    window.location.href = 'login.html';
  });
}

// Retrieve Applications
function getApplications() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem('sgs_applications') || '[]');
  } catch (e) {
    return [];
  }
}

function saveApplications(apps) {
  localStorage.setItem('sgs_applications', JSON.stringify(apps));
}

// Dashboard Metrics Update
function loadDashboardMetrics() {
  var apps = getApplications();
  var totalCount = apps.length;
  var totalAcres = apps.reduce(function(acc, item) { return acc + (parseFloat(item.acres) || 0); }, 0);
  var approvedCount = apps.filter(function(i) { return i.status === 'Approved for Saplings'; }).length;
  var pendingCount = apps.filter(function(i) { return i.status === 'Pending Verification'; }).length;

  var elTotal = document.getElementById('stat-total-apps');
  var elAcres = document.getElementById('stat-total-acres');
  var elApproved = document.getElementById('stat-approved-apps');
  var elPending = document.getElementById('stat-pending-apps');

  if (elTotal) elTotal.textContent = totalCount;
  if (elAcres) elAcres.textContent = totalAcres.toFixed(1) + ' ac';
  if (elApproved) elApproved.textContent = approvedCount;
  if (elPending) elPending.textContent = pendingCount;

  // Render recent 5 table in dashboard
  var recentTable = document.getElementById('recent-applications-body');
  if (recentTable) {
    recentTable.innerHTML = '';
    var recentSlice = apps.slice(0, 5);
    recentSlice.forEach(function(app) {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${app.id}</strong></td>
        <td>
          <div style="font-weight:700;">${escapeHtml(app.farmer_name)}</div>
          <small style="color:var(--admin-muted);">${escapeHtml(app.village)}, ${escapeHtml(app.district)}</small>
        </td>
        <td>${app.acres} ac (${escapeHtml(app.plantation_type)})</td>
        <td>
          <a href="https://maps.google.com/?q=${app.gps_lat},${app.gps_lon}" target="_blank" class="gps-pill" title="View on Google Maps">
            📍 ${app.gps_lat}, ${app.gps_lon}
          </a>
        </td>
        <td>${getStatusBadge(app.status)}</td>
        <td>
          <button class="btn-admin btn-admin-outline" onclick="openApplicationModal('${app.id}')" style="padding:4px 10px; font-size:0.8rem;">
            Inspect
          </button>
        </td>
      `;
      recentTable.appendChild(row);
    });
  }
}

// Status Badge Generator
function getStatusBadge(status) {
  if (status === 'Approved for Saplings') {
    return `<span class="badge badge-approved">✓ Approved</span>`;
  } else if (status === 'Field Audit Scheduled') {
    return `<span class="badge badge-scheduled">⏳ Audit Scheduled</span>`;
  } else if (status === 'Rejected') {
    return `<span class="badge badge-rejected">✕ Ineligible</span>`;
  } else {
    return `<span class="badge badge-pending">● Pending Review</span>`;
  }
}

// Full Applications Table Rendering
function renderApplicationsTable() {
  var apps = getApplications();
  var search = (document.getElementById('search-app-input')?.value || '').toLowerCase();
  var stateFilter = document.getElementById('filter-state')?.value || 'all';
  var statusFilter = document.getElementById('filter-status')?.value || 'all';

  var tbody = document.getElementById('applications-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  var filtered = apps.filter(function(app) {
    var matchSearch = !search || 
      app.farmer_name.toLowerCase().includes(search) ||
      app.mobile.includes(search) ||
      app.village.toLowerCase().includes(search) ||
      app.district.toLowerCase().includes(search) ||
      app.id.toLowerCase().includes(search);

    var matchState = (stateFilter === 'all') || (app.state === stateFilter);
    var matchStatus = (statusFilter === 'all') || (app.status === statusFilter);

    return matchSearch && matchState && matchStatus;
  });

  document.getElementById('filtered-count-display').textContent = filtered.length + ' Applications Found';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:var(--admin-muted);">No farmer applications match the current filter criteria.</td></tr>`;
    return;
  }

  filtered.forEach(function(app) {
    var tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${app.id}</strong></td>
      <td>
        <div style="font-weight:700;">${escapeHtml(app.farmer_name)}</div>
        <small style="color:var(--admin-muted);">S/o, W/o: ${escapeHtml(app.guardian_name)}</small><br>
        <small style="color:var(--admin-accent);"><a href="tel:${app.mobile}" style="color:inherit; text-decoration:none;">📞 ${app.mobile}</a></small>
      </td>
      <td>
        <div>${escapeHtml(app.village)}, ${escapeHtml(app.mandal)}</div>
        <small style="color:var(--admin-muted);">${escapeHtml(app.district)} (${escapeHtml(app.state)})</small>
      </td>
      <td>
        <strong>${app.acres} Acres</strong>
        <div style="font-size:0.8rem; color:var(--admin-muted);">${escapeHtml(app.plantation_type)}</div>
      </td>
      <td>
        <a href="https://maps.google.com/?q=${app.gps_lat},${app.gps_lon}" target="_blank" class="gps-pill" title="Open Google Maps">
          📍 ${app.gps_lat}, ${app.gps_lon}
        </a>
        <div style="font-size:0.75rem; color:var(--admin-muted); margin-top:2px;">Accuracy: ±${app.gps_accuracy}m</div>
      </td>
      <td>${getStatusBadge(app.status)}</td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn-admin btn-admin-primary" onclick="openApplicationModal('${app.id}')" style="padding:6px 12px; font-size:0.82rem;">
            Details
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Modal Details & Status Action
var currentInspectingId = null;

function openApplicationModal(id) {
  var apps = getApplications();
  var app = apps.find(function(i) { return i.id === id; });
  if (!app) return;
  currentInspectingId = id;

  document.getElementById('modal-app-id-title').textContent = app.id + ' — ' + app.farmer_name;
  document.getElementById('m-farmer-name').textContent = app.farmer_name;
  document.getElementById('m-guardian').textContent = app.guardian_name;
  document.getElementById('m-mobile').textContent = app.mobile + (app.alt_mobile ? ' / ' + app.alt_mobile : '');
  document.getElementById('m-location').textContent = app.village + ', ' + app.mandal + ', ' + app.district + ', ' + app.state;
  document.getElementById('m-address').textContent = app.address;
  document.getElementById('m-acres').textContent = app.acres + ' Acres (' + app.plantation_type + ')';
  document.getElementById('m-species').textContent = app.desired_species || 'Not specified';
  document.getElementById('m-water').textContent = app.water_facility === 'Yes' ? 'Active / Available (Verified)' : 'Unavailable';
  document.getElementById('m-gps').innerHTML = `
    <strong>${app.gps_lat}, ${app.gps_lon}</strong> (±${app.gps_accuracy}m accuracy) 
    &nbsp; <a href="https://maps.google.com/?q=${app.gps_lat},${app.gps_lon}" target="_blank" class="gps-pill">Open Google Maps &rarr;</a>
  `;
  document.getElementById('m-status-select').value = app.status;

  // Render land photos
  var photoBox = document.getElementById('m-photos-grid');
  photoBox.innerHTML = '';
  if (app.photos && app.photos.length > 0) {
    app.photos.forEach(function(src) {
      var img = document.createElement('img');
      img.src = src;
      img.style.cssText = 'width:120px; height:90px; object-fit:cover; border-radius:8px; border:1px solid #ccc; cursor:pointer;';
      img.onclick = function() { window.open(src, '_blank'); };
      photoBox.appendChild(img);
    });
  } else {
    photoBox.innerHTML = '<span style="color:var(--admin-muted); font-size:0.85rem;">No photos attached</span>';
  }

  document.getElementById('app-inspect-modal').style.display = 'flex';
}

function closeInspectModal() {
  document.getElementById('app-inspect-modal').style.display = 'none';
  currentInspectingId = null;
}

function updateApplicationStatus() {
  if (!currentInspectingId) return;
  var newStatus = document.getElementById('m-status-select').value;
  var apps = getApplications();
  var app = apps.find(function(i) { return i.id === currentInspectingId; });
  if (app) {
    app.status = newStatus;
    saveApplications(apps);
    closeInspectModal();
    if (typeof renderApplicationsTable === 'function') renderApplicationsTable();
    if (typeof loadDashboardMetrics === 'function') loadDashboardMetrics();
    alert('Application status successfully updated to: ' + newStatus);
  }
}

// CSV Export Utility
function exportApplicationsCSV() {
  var apps = getApplications();
  if (apps.length === 0) {
    alert('No applications to export.');
    return;
  }

  var headers = [
    "Application_ID",
    "Farmer_Name",
    "Guardian_Name",
    "Mobile",
    "Alt_Mobile",
    "State",
    "District",
    "Mandal",
    "Village",
    "Survey_Address",
    "Acres",
    "Plantation_Type",
    "Desired_Species",
    "Water_Facility",
    "GPS_Latitude",
    "GPS_Longitude",
    "GPS_Accuracy_Metres",
    "Status",
    "Submission_Date"
  ];

  var csvRows = [headers.join(",")];

  apps.forEach(function(a) {
    var row = [
      escapeCSV(a.id),
      escapeCSV(a.farmer_name),
      escapeCSV(a.guardian_name),
      escapeCSV(a.mobile),
      escapeCSV(a.alt_mobile),
      escapeCSV(a.state),
      escapeCSV(a.district),
      escapeCSV(a.mandal),
      escapeCSV(a.village),
      escapeCSV(a.address),
      a.acres,
      escapeCSV(a.plantation_type),
      escapeCSV(a.desired_species),
      escapeCSV(a.water_facility),
      a.gps_lat,
      a.gps_lon,
      a.gps_accuracy,
      escapeCSV(a.status),
      escapeCSV(a.submitted_at)
    ];
    csvRows.push(row.join(","));
  });

  var csvString = csvRows.join("\n");
  var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "SGS_Farmer_Applications_" + new Date().toISOString().slice(0, 10) + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  var str = String(val).replace(/"/g, '""');
  return '"' + str + '"';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Auto init
document.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  initStorage();
});

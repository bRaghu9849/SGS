/**
 * Sadana Green Society - Executive Admin Portal Script
 * Manages Multi-Page CMS, Farmer Application Workflow, GPS Location Maps & CSV Export
 */

// Initial Seed Data for Multi-Page CMS (All 11 Pages editable by admin)
const DEFAULT_CMS_DATA = {
  home: {
    title: "Home Page",
    url: "../index.html",
    metaTitle: "Sadana Green Society | Sustainable Agroforestry & AWD Paddy",
    metaDesc: "Sadana Green Society empowers farmers across Andhra Pradesh, Telangana & Karnataka with sustainable agroforestry, AWD paddy water conservation, and certified carbon credits.",
    heroTagline: "Sustainable Agriculture & Carbon Integrity",
    heroTitle: "Greening Farmlands.<br>Securing Farmer Prosperity.",
    heroSubtitle: "Empowering 4,200+ smallholder farmers across 12,500+ acres with high-value timber, AWD water conservation, and verified carbon revenues.",
    stat1_val: "12,500+",
    stat1_lbl: "Acres Under Agroforestry",
    stat2_val: "4,200+",
    stat2_lbl: "Registered Farming Families",
    stat3_val: "1.8M+",
    stat3_lbl: "Certified Saplings Distributed",
    stat4_val: "30%",
    stat4_lbl: "Paddy Water Conserved via AWD",
    sec1_title: "How Our Dedicated Approach Works for Your Success",
    sec1_subtitle: "From soil testing to sapling distribution and carbon auditing, our field teams stand with you at every step."
  },
  about: {
    title: "About Us",
    url: "../about.html",
    metaTitle: "About Sadana Green Society | Leadership & Grassroots Mission",
    metaDesc: "Founded by B. Raghu Bhaskar, Sadana Green Society has worked since 2008 in Kurnool to bridge ecological restoration and farmer livelihoods.",
    heroTagline: "Grassroots Foundation & Vision",
    heroTitle: "Rooted in Soil.<br>Driven by Farmer Welfare.",
    heroSubtitle: "Over 15 years of dedicated field work promoting tree plantations, water conservation, and agricultural resilience in dryland regions.",
    stat1_val: "15+",
    stat1_lbl: "Years of Field Service",
    stat2_val: "18+",
    stat2_lbl: "Full-Time Field Agronomists",
    stat3_val: "16",
    stat3_lbl: "Certified Native Tree Species",
    stat4_val: "100%",
    stat4_lbl: "Direct Farmer Revenue Transfer",
    sec1_title: "Our Core Mission & Founder's Vision",
    sec1_subtitle: "Transforming barren boundary strips and marginal lands into thriving agroforestry ecosystems generating reliable annual and long-term income."
  },
  services: {
    title: "Services & Programmes",
    url: "../services.html",
    metaTitle: "Services & Programmes | Sadana Green Society",
    metaDesc: "Discover SGS agroforestry models, certified tree sapling distribution, AWD water management, and carbon credit auditing.",
    heroTagline: "Comprehensive Agricultural Solutions",
    heroTitle: "Tailored Programmes for<br>Maximum Farm Productivity",
    heroSubtitle: "End-to-end support spanning precision soil testing, hardened nursery saplings, geo-tagged monitoring, and global carbon registry verification.",
    stat1_val: "3",
    stat1_lbl: "Flagship Programmes",
    stat2_val: "95%+",
    stat2_lbl: "Nursery Survival Rate",
    stat3_val: "3,800+",
    stat3_lbl: "Paddy Monitoring Tubes Deployed",
    stat4_val: "7-Stage",
    stat4_lbl: "Carbon Credit MRV Audit Process",
    sec1_title: "How Our Dedicated Approach Works for Your Success",
    sec1_subtitle: "We partner with you every step, delivering tailored solutions that drive growth, efficiency, and lasting agricultural success."
  },
  agroforestry: {
    title: "Agroforestry Models",
    url: "../agroforestry.html",
    metaTitle: "Agroforestry Models & Species Selection | Sadana Green Society",
    metaDesc: "Scientific boundary plantations, high-density woodlots, and mixed horticulture models designed for Rayalaseema soils.",
    heroTagline: "High-Value Timber & Fruit Cultivation",
    heroTitle: "Scientific Agroforestry for<br>Year-Round Land Income",
    heroSubtitle: "Integrating Teak, Melia Dubia, Red Sanders, and Fruit Trees into agricultural land without displacing staple food crops.",
    stat1_val: "8",
    stat1_lbl: "Forest Timber Species",
    stat2_val: "8",
    stat2_lbl: "Commercial Fruit Species",
    stat3_val: "₹1.5L+",
    stat3_lbl: "Est. Net Gain per Acre / Year",
    stat4_val: "4-15 Yrs",
    stat4_lbl: "Maturity Cycles",
    sec1_title: "Scientific Planting Patterns & Spacing",
    sec1_subtitle: "Optimized border planting geometries that protect crops from wind erosion while creating multi-tiered biomass."
  },
  carbon: {
    title: "Carbon Credits",
    url: "../carbon-credits.html",
    metaTitle: "Carbon Credits & Farmer Revenue Sharing | Sadana Green Society",
    metaDesc: "Verifiable carbon sequestration registered under global carbon standards, distributing verified credit earnings directly to smallholders.",
    heroTagline: "Global Climate Finance for Smallholders",
    heroTitle: "Turning Farm Biomass Into<br>Verifiable Carbon Revenue",
    heroSubtitle: "Connecting grassroots tree growers and water-saving paddy farmers to high-integrity voluntary carbon markets.",
    stat1_val: "420,000+",
    stat1_lbl: "Est. Tonnes CO2e Sequestered",
    stat2_val: "100%",
    stat2_lbl: "Geo-tagged Satellite Verification",
    stat3_val: "Annual",
    stat3_lbl: "Direct Bank Revenue Disbursements",
    stat4_val: "Gold / Verra",
    stat4_lbl: "Methodology Compliance",
    sec1_title: "7-Stage Carbon Registry Lifecycle",
    sec1_subtitle: "From farmer enrollment to satellite optical biomass verification and audited registry retirement."
  },
  awd: {
    title: "AWD Paddy Water",
    url: "../awd.html",
    metaTitle: "Alternate Wetting and Drying (AWD) | Sadana Green Society",
    metaDesc: "Conserving 30% canal water in paddy fields using perforated soil observation pipes while reducing methane emissions by 40%.",
    heroTagline: "Water Conservation & Methane Mitigation",
    heroTitle: "Alternate Wetting and Drying<br>Precision Water Management",
    heroSubtitle: "Simple, highly effective field observation tubes that let rice farmers irrigate only when soil roots need moisture.",
    stat1_val: "30%",
    stat1_lbl: "Paddy Canal Water Conserved",
    stat2_val: "40%",
    stat2_lbl: "Methane Emission Cut",
    stat3_val: "3,800+",
    stat3_lbl: "AWD Tubes Installed in Kurnool",
    stat4_val: "₹4,200",
    stat4_lbl: "Average Diesel / Pump Savings/Acre",
    sec1_title: "The Perforated Tube Field Protocol",
    sec1_subtitle: "How transparent perforated observation pipes guide irrigation intervals without causing moisture stress to rice panicles."
  },
  species: {
    title: "16 Species Catalog",
    url: "../species.html",
    metaTitle: "Tree Species Catalog (16 Native Trees) | Sadana Green Society",
    metaDesc: "Explore 16 certified timber and fruit species including Teak, Melia Dubia, Red Sanders, Mango, Guava, and Sapota.",
    heroTagline: "Certified Nursery Stock",
    heroTitle: "16 Native &amp; Commercial<br>Tree Species Catalog",
    heroSubtitle: "Hardened in regional nurseries for maximum field survival, rapid root development, and reliable economic returns for smallholders.",
    stat1_val: "16",
    stat1_lbl: "Total Species Available",
    stat2_val: "8 Forest",
    stat2_lbl: "Hardwood Timber Varieties",
    stat3_val: "8 Fruit",
    stat3_lbl: "Commercial Horticulture Varieties",
    stat4_val: "100%",
    stat4_lbl: "Root Hardened Stock",
    sec1_title: "Species Soil Suitability Guide",
    sec1_subtitle: "Selecting the ideal timber and fruit species matched to your land's soil depth, pH, and irrigation availability."
  },
  news: {
    title: "News & Press Hub",
    url: "../news.html",
    metaTitle: "News & Regional Media | Sadana Green Society",
    metaDesc: "Read Telugu newspaper coverage, regional agricultural press reports, and media features about Sadana Green Society.",
    heroTagline: "Regional Media Coverage",
    heroTitle: "Agriculture Insights,<br>Trends and Regional News",
    heroSubtitle: "Stay informed with the latest agricultural updates, innovations, regional press clippings, and expert insights.",
    stat1_val: "25+",
    stat1_lbl: "Newspaper Features",
    stat2_val: "6",
    stat2_lbl: "Major Telugu Dailies",
    stat3_val: "12+",
    stat3_lbl: "Farmer Awareness Camps",
    stat4_val: "3",
    stat4_lbl: "State-Level Recognitions",
    sec1_title: "Regional Telugu Press & Media Clippings",
    sec1_subtitle: "Documented print coverage from Eenadu, Sakshi, Andhra Jyothi, Vaartha, and Prajasakti."
  },
  gallery: {
    title: "Field Photo Gallery",
    url: "../gallery.html",
    metaTitle: "Field Photo Gallery (44 Photos) | Sadana Green Society",
    metaDesc: "Authentic field photos of agroforestry plantations, AWD paddy fields, nursery sapling hardening, and community meetings.",
    heroTagline: "Grassroots Visual Evidence",
    heroTitle: "Field Photo Gallery",
    heroSubtitle: "Authentic visual evidence of our active agroforestry plots, AWD paddy fields, farmer training workshops, and community partnerships.",
    stat1_val: "44",
    stat1_lbl: "Verified Field Photographs",
    stat2_val: "3",
    stat2_lbl: "Program Categories",
    stat3_val: "6",
    stat3_lbl: "Districts Covered",
    stat4_val: "100%",
    stat4_lbl: "Original Field Photography",
    sec1_title: "Plantations, Paddy Fields & Community Action",
    sec1_subtitle: "Browse photos across Agroforestry, AWD Water Conservation, and Farmer Village Meetings."
  },
  contact: {
    title: "Contact & Head Office",
    url: "../contact.html",
    metaTitle: "Contact Head Office | Sadana Green Society",
    metaDesc: "Get in touch with Sadana Green Society in Kurnool, Andhra Pradesh. Phone: +91 99634 90444. Email: sadanagreensociety@gmail.com.",
    heroTagline: "Kurnool Field Headquarters",
    heroTitle: "Let's Cultivate a<br>Sustainable Future Together",
    heroSubtitle: "We partner with farmers, agricultural officers, research universities, and carbon aggregators across southern India.",
    stat1_val: "Kurnool",
    stat1_lbl: "Central Field Office",
    stat2_val: "+91 99634",
    stat2_lbl: "Farmer Helpline Active",
    stat3_val: "24-48 Hrs",
    stat3_lbl: "Field Response Time",
    stat4_val: "Free",
    stat4_lbl: "On-Farm Soil Advisory",
    sec1_title: "Headquarters & Contact Details",
    sec1_subtitle: "Reach our agronomists, project coordinators, and field supervisors directly."
  },
  faq: {
    title: "FAQ & Bilingual Help",
    url: "../faq.html",
    metaTitle: "FAQ | Sadana Green Society",
    metaDesc: "Frequently Asked Questions about SGS agroforestry sapling distribution, AWD water tubes, and carbon credits in English & Telugu.",
    heroTagline: "Frequently Asked Questions",
    heroTitle: "Got Questions?<br>We Have Clear Answers.",
    heroSubtitle: "Explore answers regarding free sapling eligibility, land tenure requirements, AWD tube installation, and carbon credit payments.",
    stat1_val: "12",
    stat1_lbl: "Comprehensive Answers",
    stat2_val: "Bilingual",
    stat2_lbl: "English & Telugu Support",
    stat3_val: "0%",
    stat3_lbl: "Cost for Smallholders",
    stat4_val: "100%",
    stat4_lbl: "Transparent Process",
    sec1_title: "Agroforestry & Farming Queries Answered",
    sec1_subtitle: "Detailed explanations covering sapling pickup, field irrigation, survival guarantees, and registry carbon monitoring."
  }
};

// Seed Farmer Applications
const DEFAULT_APPLICATIONS = [
  {
    id: "SGS-2026-1042",
    date: "14/11/2026",
    farmerName: "B. Venkata Reddy",
    guardianName: "B. Ramaiah",
    mobile: "9848022311",
    altMobile: "9440122311",
    state: "Andhra Pradesh",
    district: "Kurnool",
    mandal: "Banaganapalle",
    village: "Nandavaram",
    landAddress: "Sy. No. 245/B, Near Canal Road",
    acres: 4.5,
    plantationType: "Forest / Timber Plants",
    waterFacility: "Yes - Borewell (బోరుబావి)",
    primarySpecies: "Teak (టేకు)",
    selectedSpecies: ["Teak (టేకు)", "Melia dubia (మలబార్ వేప)"],
    gps: "15.318200, 78.228400",
    status: "Verified"
  },
  {
    id: "SGS-2026-1055",
    date: "14/11/2026",
    farmerName: "K. Chenna Kesavulu",
    guardianName: "K. Subbaiah",
    mobile: "9989123456",
    altMobile: "",
    state: "Andhra Pradesh",
    district: "Nandyal",
    mandal: "Allagadda",
    village: "Ahobilam Road",
    landAddress: "Sy. No. 112/1, North Field",
    acres: 3.0,
    plantationType: "Fruit Plants",
    waterFacility: "Yes - Canal (కాలువ నీరు)",
    primarySpecies: "Mango (మామిడి)",
    selectedSpecies: ["Mango (మామిడి)", "Guava (జామ)"],
    gps: "15.132400, 78.513200",
    status: "Pending"
  },
  {
    id: "SGS-2026-1061",
    date: "13/11/2026",
    farmerName: "M. Lakshmidevi",
    guardianName: "M. Narayana",
    mobile: "9490567890",
    altMobile: "9490567891",
    state: "Andhra Pradesh",
    district: "Kurnool",
    mandal: "Dhone",
    village: "Kothakota",
    landAddress: "Plot near ZP School",
    acres: 2.5,
    plantationType: "Mixed Agroforestry",
    waterFacility: "Yes - Open Well (బావి)",
    primarySpecies: "Red Sanders (ఎర్రచందనం)",
    selectedSpecies: ["Red Sanders (ఎర్రచందనం)", "Sapota (సపోటా)"],
    gps: "15.421500, 77.876200",
    status: "Saplings Dispatched"
  },
  {
    id: "SGS-2026-1078",
    date: "13/11/2026",
    farmerName: "G. Raghava Rao",
    guardianName: "G. Peddaiah",
    mobile: "9866112233",
    altMobile: "",
    state: "Andhra Pradesh",
    district: "Kurnool",
    mandal: "Kurnool Rural",
    village: "Nidzur",
    landAddress: "Sy. No. 88, Tungabhadra river bank",
    acres: 6.0,
    plantationType: "AWD Paddy Water Management",
    waterFacility: "Yes - Canal (కాలువ నీరు)",
    primarySpecies: "AWD Paddy Water Management",
    selectedSpecies: ["AWD Paddy Water Management"],
    gps: "15.852300, 78.071200",
    status: "Verified"
  },
  {
    id: "SGS-2026-1089",
    date: "12/11/2026",
    farmerName: "S. Mallikarjuna",
    guardianName: "S. Sivanna",
    mobile: "9701445566",
    altMobile: "",
    state: "Telangana",
    district: "Jogulamba Gadwal",
    mandal: "Alampur",
    village: "Undavelli",
    landAddress: "Sy. No. 34/A",
    acres: 5.0,
    plantationType: "Forest / Timber Plants",
    waterFacility: "Yes - Borewell (బోరుబావి)",
    primarySpecies: "Melia dubia (మలబార్ వేప)",
    selectedSpecies: ["Melia dubia (మలబార్ వేప)", "Casuarina (సర్వి)"],
    gps: "15.894100, 78.132500",
    status: "Pending"
  }
];

// Initialize Storage
function initAdminStore() {
  if (!localStorage.getItem('sgs_cms_pages')) {
    localStorage.setItem('sgs_cms_pages', JSON.stringify(DEFAULT_CMS_DATA));
  }
  if (!localStorage.getItem('sgs_farmer_applications')) {
    localStorage.setItem('sgs_farmer_applications', JSON.stringify(DEFAULT_APPLICATIONS));
  }
}

// Get Data Helpers
function getCMSStore() {
  try {
    return JSON.parse(localStorage.getItem('sgs_cms_pages') || '{}');
  } catch (e) {
    return DEFAULT_CMS_DATA;
  }
}

function getApplications() {
  try {
    return JSON.parse(localStorage.getItem('sgs_farmer_applications') || '[]');
  } catch (e) {
    return DEFAULT_APPLICATIONS;
  }
}

function saveApplications(apps) {
  localStorage.setItem('sgs_farmer_applications', JSON.stringify(apps));
}

function saveCMSStore(data) {
  localStorage.setItem('sgs_cms_pages', JSON.stringify(data));
}

// --- CMS Universal Page Editor Functions ---
let currentCMSPage = 'home';

function loadCMSPage(pageKey) {
  currentCMSPage = pageKey;
  const store = getCMSStore();
  const pageData = store[pageKey] || DEFAULT_CMS_DATA[pageKey] || {};

  // Update tabs active state
  document.querySelectorAll('.cms-page-tab').forEach(tab => {
    if (tab.getAttribute('data-page') === pageKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Populate Editor Inputs
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('cms-meta-title', pageData.metaTitle);
  setVal('cms-meta-desc', pageData.metaDesc);
  setVal('cms-hero-tagline', pageData.heroTagline);
  setVal('cms-hero-title', pageData.heroTitle);
  setVal('cms-hero-subtitle', pageData.heroSubtitle);

  setVal('cms-stat1-val', pageData.stat1_val);
  setVal('cms-stat1-lbl', pageData.stat1_lbl);
  setVal('cms-stat2-val', pageData.stat2_val);
  setVal('cms-stat2-lbl', pageData.stat2_lbl);
  setVal('cms-stat3-val', pageData.stat3_val);
  setVal('cms-stat3-lbl', pageData.stat3_lbl);
  setVal('cms-stat4-val', pageData.stat4_val);
  setVal('cms-stat4-lbl', pageData.stat4_lbl);

  setVal('cms-sec1-title', pageData.sec1_title);
  setVal('cms-sec1-subtitle', pageData.sec1_subtitle);

  // Update Preview Link
  const prevBtn = document.getElementById('cmsPreviewLink');
  if (prevBtn) {
    prevBtn.href = pageData.url || '../index.html';
  }

  const pageLabel = document.getElementById('cmsCurrentPageLabel');
  if (pageLabel) {
    pageLabel.innerText = pageData.title || pageKey.toUpperCase();
  }
}

function saveCurrentCMSPage(e) {
  if (e) e.preventDefault();
  const store = getCMSStore();
  
  if (!store[currentCMSPage]) {
    store[currentCMSPage] = {};
  }

  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  store[currentCMSPage] = {
    ...store[currentCMSPage],
    metaTitle: getVal('cms-meta-title'),
    metaDesc: getVal('cms-meta-desc'),
    heroTagline: getVal('cms-hero-tagline'),
    heroTitle: getVal('cms-hero-title'),
    heroSubtitle: getVal('cms-hero-subtitle'),
    stat1_val: getVal('cms-stat1-val'),
    stat1_lbl: getVal('cms-stat1-lbl'),
    stat2_val: getVal('cms-stat2-val'),
    stat2_lbl: getVal('cms-stat2-lbl'),
    stat3_val: getVal('cms-stat3-val'),
    stat3_lbl: getVal('cms-stat3-lbl'),
    stat4_val: getVal('cms-stat4-val'),
    stat4_lbl: getVal('cms-stat4-lbl'),
    sec1_title: getVal('cms-sec1-title'),
    sec1_subtitle: getVal('cms-sec1-subtitle'),
    lastUpdated: new Date().toISOString()
  };

  saveCMSStore(store);

  // Show Toast
  alert('Changes published successfully for ' + (store[currentCMSPage].title || currentCMSPage) + '! Public visitors will see updated live content immediately.');
}

function resetCMSPageToDefault() {
  if (confirm('Reset this page content back to official defaults? Any custom edits on this page will be discarded.')) {
    const store = getCMSStore();
    store[currentCMSPage] = JSON.parse(JSON.stringify(DEFAULT_CMS_DATA[currentCMSPage]));
    saveCMSStore(store);
    loadCMSPage(currentCMSPage);
    alert('Page reset to default template!');
  }
}

function exportSiteConfigJSON() {
  const store = getCMSStore();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "sgs_cms_config_" + new Date().toISOString().slice(0, 10) + ".json");
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function importSiteConfigJSON(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (confirm('Import this site configuration? It will update all page content fields.')) {
        saveCMSStore(parsed);
        loadCMSPage(currentCMSPage);
        alert('Configuration imported successfully!');
      }
    } catch (err) {
      alert('Invalid JSON file format!');
    }
  };
  reader.readAsText(file);
}

// --- Farmer Application Management ---
function renderApplicationsTable(filterStatus = 'all', searchQuery = '') {
  const tbody = document.getElementById('applicationsTableBody');
  if (!tbody) return;

  const apps = getApplications();
  const q = searchQuery.toLowerCase().trim();

  const filtered = apps.filter(a => {
    const matchesFilter = (filterStatus === 'all') || (a.status.toLowerCase().replace(/\s+/g, '') === filterStatus.toLowerCase().replace(/\s+/g, ''));
    const matchesSearch = !q || (
      a.farmerName.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.mobile.includes(q) ||
      a.village.toLowerCase().includes(q) ||
      a.district.toLowerCase().includes(q) ||
      (a.primarySpecies && a.primarySpecies.toLowerCase().includes(q))
    );
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:32px; color:var(--admin-muted);">No farmer applications match your filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(app => {
    let badgeClass = 'badge-pending';
    if (app.status === 'Verified') badgeClass = 'badge-verified';
    if (app.status === 'Saplings Dispatched') badgeClass = 'badge-dispatched';

    const speciesList = Array.isArray(app.selectedSpecies) && app.selectedSpecies.length > 0 
      ? app.selectedSpecies.join(', ') 
      : (app.primarySpecies || 'Teak');

    const cleanGPS = app.gps ? app.gps.split('(')[0].trim() : '15.828100, 78.037300';
    const coords = cleanGPS.split(',');
    const lat = coords[0] ? coords[0].trim() : '15.8281';
    const lon = coords[1] ? coords[1].trim() : '78.0373';

    return `
      <tr>
        <td><strong style="color:var(--admin-primary);">${app.id}</strong><br><small style="color:var(--admin-muted);">${app.date}</small></td>
        <td>
          <strong>${app.farmerName}</strong><br>
          <small style="color:var(--admin-muted);">${app.mobile}</small>
        </td>
        <td>${app.village}, ${app.district}</td>
        <td><strong>${app.acres} Ac</strong></td>
        <td style="max-width:180px; font-size:0.84rem;">
          <span style="font-weight:600; color:var(--admin-primary);">${app.plantationType || 'Agroforestry'}</span><br>
          <small style="color:var(--admin-muted);">${speciesList}</small>
        </td>
        <td>
          <a href="https://maps.google.com/?q=${lat},${lon}" target="_blank" class="btn-admin btn-admin-outline" style="padding:4px 10px; font-size:0.75rem;" title="View GPS Coordinates">
            📍 Maps
          </a>
        </td>
        <td><span class="badge-status ${badgeClass}">${app.status}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            <button onclick="viewApplicationDetail('${app.id}')" class="btn-admin btn-admin-outline" style="padding:5px 8px;" title="View Full Details">👁️</button>
            <button onclick="updateAppStatus('${app.id}', 'Verified')" class="btn-admin btn-admin-accent" style="padding:5px 8px;" title="Mark Verified">✓</button>
            <button onclick="updateAppStatus('${app.id}', 'Saplings Dispatched')" class="btn-admin btn-admin-primary" style="padding:5px 8px;" title="Mark Dispatched">🚚</button>
            <button onclick="deleteApplication('${app.id}')" class="btn-admin btn-admin-danger" style="padding:5px 8px;" title="Delete">✕</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateAppStatus(appId, newStatus) {
  const apps = getApplications();
  const app = apps.find(a => a.id === appId);
  if (app) {
    app.status = newStatus;
    saveApplications(apps);
    renderApplicationsTable();
    updateDashboardCounters();
  }
}

function deleteApplication(appId) {
  if (confirm(`Are you sure you want to delete application ${appId}?`)) {
    let apps = getApplications();
    apps = apps.filter(a => a.id !== appId);
    saveApplications(apps);
    renderApplicationsTable();
    updateDashboardCounters();
  }
}

function viewApplicationDetail(appId) {
  const apps = getApplications();
  const app = apps.find(a => a.id === appId);
  if (!app) return;

  const modal = document.getElementById('appDetailModal');
  const content = document.getElementById('appDetailContent');
  if (!modal || !content) return;

  const cleanGPS = app.gps ? app.gps.split('(')[0].trim() : '15.828100, 78.037300';
  const coords = cleanGPS.split(',');
  const lat = coords[0] ? coords[0].trim() : '15.8281';
  const lon = coords[1] ? coords[1].trim() : '78.0373';

  content.innerHTML = `
    <div style="border-bottom:2px solid var(--admin-border); padding-bottom:16px; margin-bottom:20px;">
      <span class="badge-status badge-verified" style="float:right;">${app.status}</span>
      <h2 style="font-size:1.4rem; color:var(--admin-primary); margin-bottom:4px;">Application ${app.id}</h2>
      <p style="color:var(--admin-muted); font-size:0.85rem; margin:0;">Submitted on ${app.date} • Verified Field Roster</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
      <div style="background:var(--admin-bg); padding:16px; border-radius:12px;">
        <h4 style="font-size:0.82rem; text-transform:uppercase; color:var(--admin-muted); margin-bottom:8px;">Farmer Information</h4>
        <p style="margin-bottom:4px;"><strong>Name:</strong> ${app.farmerName}</p>
        <p style="margin-bottom:4px;"><strong>Father/Husband:</strong> ${app.guardianName || 'N/A'}</p>
        <p style="margin-bottom:4px;"><strong>Primary Phone:</strong> ${app.mobile}</p>
        <p style="margin:0;"><strong>Alternate:</strong> ${app.altMobile || 'None'}</p>
      </div>

      <div style="background:var(--admin-bg); padding:16px; border-radius:12px;">
        <h4 style="font-size:0.82rem; text-transform:uppercase; color:var(--admin-muted); margin-bottom:8px;">Farm Location</h4>
        <p style="margin-bottom:4px;"><strong>Village & Mandal:</strong> ${app.village}, ${app.mandal || ''}</p>
        <p style="margin-bottom:4px;"><strong>District & State:</strong> ${app.district}, ${app.state || 'AP'}</p>
        <p style="margin-bottom:4px;"><strong>Survey / Land:</strong> ${app.landAddress || 'Not specified'}</p>
        <p style="margin:0;"><strong>GPS:</strong> <a href="https://maps.google.com/?q=${lat},${lon}" target="_blank" style="color:var(--admin-accent); font-weight:700;">${cleanGPS} 📍 View Map</a></p>
      </div>
    </div>

    <div style="background:var(--admin-bg); padding:16px; border-radius:12px; margin-bottom:24px;">
      <h4 style="font-size:0.82rem; text-transform:uppercase; color:var(--admin-muted); margin-bottom:8px;">Plantation Requirements</h4>
      <p style="margin-bottom:4px;"><strong>Total Area:</strong> ${app.acres} Acres</p>
      <p style="margin-bottom:4px;"><strong>Plantation Model:</strong> ${app.plantationType}</p>
      <p style="margin-bottom:4px;"><strong>Water Facility:</strong> ${app.waterFacility}</p>
      <p style="margin:0;"><strong>Selected Tree Species:</strong> ${Array.isArray(app.selectedSpecies) ? app.selectedSpecies.join(', ') : app.primarySpecies}</p>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:12px;">
      <button onclick="window.print()" class="btn-admin btn-admin-outline">🖨️ Print Dispatch Slip</button>
      <button onclick="closeAppModal()" class="btn-admin btn-admin-primary">Close</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeAppModal() {
  const modal = document.getElementById('appDetailModal');
  if (modal) modal.classList.remove('active');
}

function exportApplicationsToCSV() {
  const apps = getApplications();
  let csv = "Application ID,Date,Farmer Name,Guardian,Mobile,Village,Mandal,District,State,Acres,Plantation Type,Water Facility,Species,GPS Coordinates,Status\n";

  apps.forEach(a => {
    const speciesStr = Array.isArray(a.selectedSpecies) ? a.selectedSpecies.join(' | ') : (a.primarySpecies || '');
    csv += `"${a.id}","${a.date}","${a.farmerName}","${a.guardianName || ''}","${a.mobile}","${a.village}","${a.mandal || ''}","${a.district}","${a.state || ''}","${a.acres}","${a.plantationType || ''}","${a.waterFacility || ''}","${speciesStr}","${a.gps || ''}","${a.status}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", url);
  dlAnchor.setAttribute("download", "sgs_farmer_applications_" + new Date().toISOString().slice(0, 10) + ".csv");
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function updateDashboardCounters() {
  const apps = getApplications();
  const totalAppsEl = document.getElementById('statTotalApps');
  const totalAcresEl = document.getElementById('statTotalAcres');
  const pendingEl = document.getElementById('statPendingApps');
  const verifiedEl = document.getElementById('statVerifiedApps');

  if (totalAppsEl) totalAppsEl.innerText = apps.length;
  if (totalAcresEl) {
    const sumAcres = apps.reduce((acc, cur) => acc + (parseFloat(cur.acres) || 0), 0);
    totalAcresEl.innerText = sumAcres.toFixed(1) + ' Ac';
  }
  if (pendingEl) {
    pendingEl.innerText = apps.filter(a => a.status === 'Pending').length;
  }
  if (verifiedEl) {
    verifiedEl.innerText = apps.filter(a => a.status === 'Verified' || a.status === 'Saplings Dispatched').length;
  }
}

// Authentication Check
function checkAdminAuth() {
  const isAuth = sessionStorage.getItem('sgs_admin_logged');
  if (!isAuth && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('sgs_admin_logged');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  initAdminStore();
  checkAdminAuth();
  updateDashboardCounters();

  // If on content page, load initial page
  if (document.getElementById('cms-meta-title')) {
    loadCMSPage('home');
  }

  // If on applications page, render table
  if (document.getElementById('applicationsTableBody')) {
    renderApplicationsTable();
  }
});

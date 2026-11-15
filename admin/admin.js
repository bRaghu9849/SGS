/**
 * Sadana Green Society - Executive Operations Engine
 * Direct In-Place Editable & Savable Farmer Records (Zero Approvals/Bureaucracy)
 * Direct Universal CMS Editor
 */

const SEED_FARMERS = [
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
    species: "Teak 200, Melia dubia 100",
    gps: "15.318200, 78.228400"
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
    species: "Mango 150, Guava 50",
    gps: "15.132400, 78.513200"
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
    species: "Red Sanders 80, Sapota 40",
    gps: "15.421500, 77.876200"
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
    species: "AWD Paddy Observation Pipes (15 Units)",
    gps: "15.852300, 78.071200"
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
    species: "Melia dubia 250, Casuarina 100",
    gps: "15.894100, 78.132500"
  }
];

function getFarmerRecords() {
  try {
    const raw = localStorage.getItem('sgs_farmer_applications');
    if (!raw) {
      localStorage.setItem('sgs_farmer_applications', JSON.stringify(SEED_FARMERS));
      return SEED_FARMERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_FARMERS;
  } catch (e) {
    return SEED_FARMERS;
  }
}

function saveFarmerRecords(records) {
  localStorage.setItem('sgs_farmer_applications', JSON.stringify(records));
}

// Render All Editable Farmer Cards
function renderEditableFarmerList() {
  const container = document.getElementById('farmerCardsContainer');
  if (!container) return;

  const records = getFarmerRecords();
  if (records.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:48px; background:#fff; border-radius:18px; border:1px solid #e0e7e2; color:var(--admin-muted);">No farmer records found. Click "+ Add New Farmer Record" above to create one.</div>`;
    return;
  }

  container.innerHTML = records.map((f, idx) => {
    const cleanGPS = (f.gps || '15.828100, 78.037300').split('(')[0].trim();
    const [lat, lon] = cleanGPS.split(',').map(s => s.trim());
    const speciesVal = f.species || (Array.isArray(f.selectedSpecies) ? f.selectedSpecies.join(', ') : (f.primarySpecies || 'Teak'));

    return `
      <div class="farmer-edit-card" data-index="${idx}">
        <div class="farmer-card-header">
          <div class="farmer-card-ref">
            <span>🌾 Record #${idx + 1} &bull; ${f.id || 'SGS-2026-NEW'}</span>
            <span class="farmer-card-date">${f.date || 'Recent'}</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <a href="https://maps.google.com/?q=${lat},${lon}" target="_blank" class="btn-selio btn-selio-outline" style="padding:6px 14px; font-size:0.8rem;">
              📍 Open Google Maps &nearr;
            </a>
            <button onclick="removeFarmerRecord(${idx})" class="btn-selio btn-selio-danger">
              🗑️ Delete
            </button>
          </div>
        </div>

        <!-- Row 1: Personal Particulars -->
        <div class="form-grid-4">
          <div class="edit-field">
            <label>Farmer Full Name / రైతు పేరు</label>
            <input type="text" class="inp-farmer-name" value="${f.farmerName || ''}" placeholder="Full Name">
          </div>
          <div class="edit-field">
            <label>Father / Guardian Name</label>
            <input type="text" class="inp-guardian-name" value="${f.guardianName || ''}" placeholder="Guardian Name">
          </div>
          <div class="edit-field">
            <label>Primary Mobile / ఫోన్ నంబర్</label>
            <input type="tel" class="inp-mobile" value="${f.mobile || ''}" placeholder="10-digit number">
          </div>
          <div class="edit-field">
            <label>Alternate Mobile</label>
            <input type="tel" class="inp-alt-mobile" value="${f.altMobile || ''}" placeholder="Optional number">
          </div>
        </div>

        <!-- Row 2: Location Particulars -->
        <div class="form-grid-4">
          <div class="edit-field">
            <label>State / రాష్ట్రం</label>
            <select class="inp-state">
              <option value="Andhra Pradesh" ${f.state === 'Andhra Pradesh' ? 'selected' : ''}>Andhra Pradesh</option>
              <option value="Telangana" ${f.state === 'Telangana' ? 'selected' : ''}>Telangana</option>
              <option value="Karnataka" ${f.state === 'Karnataka' ? 'selected' : ''}>Karnataka</option>
            </select>
          </div>
          <div class="edit-field">
            <label>District / జిల్లా</label>
            <select class="inp-district">
              <option value="Kurnool" ${f.district === 'Kurnool' ? 'selected' : ''}>Kurnool / కర్నూలు</option>
              <option value="Nandyal" ${f.district === 'Nandyal' ? 'selected' : ''}>Nandyal / నంద్యాల</option>
              <option value="Anantapur" ${f.district === 'Anantapur' ? 'selected' : ''}>Anantapur / అనంతపురం</option>
              <option value="YSR Kadapa" ${f.district === 'YSR Kadapa' ? 'selected' : ''}>YSR Kadapa / కడప</option>
              <option value="Mahbubnagar" ${f.district === 'Mahbubnagar' ? 'selected' : ''}>Mahbubnagar / మహబూబ్‌నగర్</option>
              <option value="Jogulamba Gadwal" ${f.district === 'Jogulamba Gadwal' ? 'selected' : ''}>Jogulamba Gadwal / గద్వాల</option>
              <option value="Other" ${f.district === 'Other' ? 'selected' : ''}>Other District</option>
            </select>
          </div>
          <div class="edit-field">
            <label>Mandal or Taluk / మండలం</label>
            <input type="text" class="inp-mandal" value="${f.mandal || ''}" placeholder="Mandal">
          </div>
          <div class="edit-field">
            <label>Village / గ్రామం</label>
            <input type="text" class="inp-village" value="${f.village || ''}" placeholder="Village">
          </div>
        </div>

        <!-- Row 3: Farm & Irrigation Specs -->
        <div class="form-grid-3">
          <div class="edit-field">
            <label>Total Land Area (Acres) / విస్తీర్ణం</label>
            <input type="number" step="0.25" class="inp-acres" value="${f.acres || 1}">
          </div>
          <div class="edit-field">
            <label>Plantation Model / సాగు విధానం</label>
            <select class="inp-plantation-type">
              <option value="Forest / Timber Plants" ${f.plantationType === 'Forest / Timber Plants' ? 'selected' : ''}>Forest / Timber Plants</option>
              <option value="Fruit Plants" ${f.plantationType === 'Fruit Plants' ? 'selected' : ''}>Fruit Plants</option>
              <option value="Mixed Agroforestry" ${f.plantationType === 'Mixed Agroforestry' ? 'selected' : ''}>Mixed Agroforestry</option>
              <option value="Boundary Plantation" ${f.plantationType === 'Boundary Plantation' ? 'selected' : ''}>Boundary Plantation</option>
              <option value="AWD Paddy Water Management" ${f.plantationType === 'AWD Paddy Water Management' ? 'selected' : ''}>AWD Paddy Water Management</option>
            </select>
          </div>
          <div class="edit-field">
            <label>Water Facility / నీటి వసతి</label>
            <select class="inp-water-facility">
              <option value="Yes - Borewell (బోరుబావి)" ${f.waterFacility && f.waterFacility.includes('Borewell') ? 'selected' : ''}>Yes - Borewell (బోరుబావి)</option>
              <option value="Yes - Canal (కాలువ నీరు)" ${f.waterFacility && f.waterFacility.includes('Canal') ? 'selected' : ''}>Yes - Canal (కాలువ నీరు)</option>
              <option value="Yes - Open Well (బావి)" ${f.waterFacility && f.waterFacility.includes('Open Well') ? 'selected' : ''}>Yes - Open Well (బావి)</option>
              <option value="No - Rainfed (వర్షాధారం)" ${f.waterFacility && f.waterFacility.includes('Rainfed') ? 'selected' : ''}>No - Rainfed (వర్షాధారం)</option>
            </select>
          </div>
        </div>

        <!-- Row 4: Land Address, Species & GPS -->
        <div class="form-grid-3">
          <div class="edit-field">
            <label>Full Land Address / Survey Number</label>
            <input type="text" class="inp-land-address" value="${f.landAddress || ''}" placeholder="Survey No or Location">
          </div>
          <div class="edit-field">
            <label>Desired Species &amp; Quantity (Editable)</label>
            <input type="text" class="inp-species" value="${speciesVal}" placeholder="e.g. Teak 200, Mango 50">
          </div>
          <div class="edit-field">
            <label>GPS Coordinates (Lat, Lon)</label>
            <input type="text" class="inp-gps" value="${f.gps || '15.828100, 78.037300'}" placeholder="15.828100, 78.037300">
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateFarmerCountSummary(records.length);
}

function updateFarmerCountSummary(count) {
  const badge = document.getElementById('totalFarmerCountBadge');
  if (badge) badge.innerText = `${count} Active Farmers`;
}

// Collect all inputs and SAVE to storage
function saveAllFarmerRecords() {
  const cards = document.querySelectorAll('.farmer-edit-card');
  const records = [];

  cards.forEach((card, idx) => {
    const originalRecords = getFarmerRecords();
    const orig = originalRecords[idx] || {};

    records.push({
      id: orig.id || ('SGS-2026-' + Math.floor(1000 + Math.random() * 9000)),
      date: orig.date || new Date().toLocaleDateString('en-GB'),
      farmerName: card.querySelector('.inp-farmer-name').value.trim(),
      guardianName: card.querySelector('.inp-guardian-name').value.trim(),
      mobile: card.querySelector('.inp-mobile').value.trim(),
      altMobile: card.querySelector('.inp-alt-mobile').value.trim(),
      state: card.querySelector('.inp-state').value,
      district: card.querySelector('.inp-district').value,
      mandal: card.querySelector('.inp-mandal').value.trim(),
      village: card.querySelector('.inp-village').value.trim(),
      acres: parseFloat(card.querySelector('.inp-acres').value) || 1,
      plantationType: card.querySelector('.inp-plantation-type').value,
      waterFacility: card.querySelector('.inp-water-facility').value,
      landAddress: card.querySelector('.inp-land-address').value.trim(),
      species: card.querySelector('.inp-species').value.trim(),
      gps: card.querySelector('.inp-gps').value.trim()
    });
  });

  saveFarmerRecords(records);
  showToast('✓ All farmer details successfully updated & saved!');
}

function addNewFarmerRecord() {
  const records = getFarmerRecords();
  records.unshift({
    id: 'SGS-2026-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleDateString('en-GB'),
    farmerName: '',
    guardianName: '',
    mobile: '',
    altMobile: '',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    mandal: '',
    village: '',
    landAddress: '',
    acres: 2.0,
    plantationType: 'Forest / Timber Plants',
    waterFacility: 'Yes - Borewell (బోరుబావి)',
    species: 'Teak (టేకు) 100',
    gps: '15.828100, 78.037300'
  });
  saveFarmerRecords(records);
  renderEditableFarmerList();
  window.scrollTo({ top: 120, behavior: 'smooth' });
  showToast('+ Blank farmer record added. Edit details and click Save!');
}

function removeFarmerRecord(index) {
  if (confirm('Are you sure you want to delete this farmer record?')) {
    const records = getFarmerRecords();
    records.splice(index, 1);
    saveFarmerRecords(records);
    renderEditableFarmerList();
    showToast('Record removed.');
  }
}

function exportFarmerCSV() {
  const records = getFarmerRecords();
  let csv = "ID,Date,Farmer Name,Guardian,Mobile,Alt Mobile,State,District,Mandal,Village,Acres,Plantation Model,Water Facility,Species,GPS\n";
  records.forEach(f => {
    csv += `"${f.id || ''}","${f.date || ''}","${f.farmerName || ''}","${f.guardianName || ''}","${f.mobile || ''}","${f.altMobile || ''}","${f.state || ''}","${f.district || ''}","${f.mandal || ''}","${f.village || ''}","${f.acres || ''}","${f.plantationType || ''}","${f.waterFacility || ''}","${f.species || ''}","${f.gps || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sgs_farmers_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('📥 Downloaded farmer spreadsheet CSV.');
}

function showToast(msg) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

// Authentication
function checkAdminAuth() {
  let isAuth = sessionStorage.getItem('sgs_admin_logged');
  // Auto-authenticate for direct operations access
  if (!isAuth) {
    sessionStorage.setItem('sgs_admin_logged', 'true');
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('sgs_admin_logged');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  if (document.getElementById('farmerCardsContainer')) {
    renderEditableFarmerList();
  }
});


// ==========================================
// UNIVERSAL CMS PAGE EDITOR LOGIC
// ==========================================

const DEFAULT_CMS_DATA = {
  home: {
    title: "Home Page",
    url: "/",
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
    url: "/about/",
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
    url: "/services/",
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
    url: "/agroforestry/",
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
    url: "/carbon-credits/",
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
    sec1_title: "7-Stage Carbon Registry Verification",
    sec1_subtitle: "From field measurement plots to third-party validation and direct DBT disbursement into farmer accounts."
  },
  awd: {
    title: "AWD Paddy Water",
    url: "/awd/",
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
    url: "/species/",
    metaTitle: "Tree Species Catalog (16 Native Trees) | Sadana Green Society",
    metaDesc: "Explore 16 certified timber and fruit species including Teak, Melia Dubia, Red Sanders, Mango, Guava, and Sapota.",
    heroTagline: "Certified Nursery Stock",
    heroTitle: "16 Native & Commercial<br>Tree Species Catalog",
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
    url: "/news/",
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
    url: "/gallery/",
    metaTitle: "Field Photo Gallery (44 Photos) | Sadana Green Society",
    metaDesc: "Authentic field photos of agroforestry plantations, AWD paddy field installations, nursery saplings, and farmer community meetings.",
    heroTagline: "Visual Field Documentation",
    heroTitle: "Moments of Transformation<br>from Grassroots Fields",
    heroSubtitle: "Explore photographic evidence of vibrant tree lines, water-saving AWD tubes, and empowered farming communities in Kurnool & Nandyal.",
    stat1_val: "44",
    stat1_lbl: "Curated Field Photos",
    stat2_val: "4",
    stat2_lbl: "Categories (Agroforestry, AWD, Nursery, Events)",
    stat3_val: "100%",
    stat3_lbl: "Authentic Field Documentation",
    stat4_val: "Rayalaseema",
    stat4_lbl: "Farming Villages Covered",
    sec1_title: "Complete Photographic Archive",
    sec1_subtitle: "High-resolution photos showcasing nursery development, sapling distribution, and healthy farmer yields."
  },
  contact: {
    title: "Contact & Head Office",
    url: "/contact/",
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
    url: "/faq/",
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
    sec1_subtitle: "Detailed explanations of seedling supply, soil requirements, and annual carbon revenue cycles."
  }
};

function getCMSStore() {
  try {
    const raw = localStorage.getItem('sgs_cms_pages');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
}

function saveCMSStore(data) {
  localStorage.setItem('sgs_cms_pages', JSON.stringify(data));
}

let currentCMSPage = 'home';

function loadCMSPage(pageKey) {
  currentCMSPage = pageKey;
  const store = getCMSStore();
  const pageData = store[pageKey] || DEFAULT_CMS_DATA[pageKey] || {};

  document.querySelectorAll('.cms-page-tab').forEach(tab => {
    if (tab.getAttribute('data-page') === pageKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

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

  const prevBtn = document.getElementById('cmsPreviewLink');
  if (prevBtn) {
    prevBtn.href = pageData.url || '/';
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
    ...DEFAULT_CMS_DATA[currentCMSPage],
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
    lastModified: new Date().toISOString()
  };

  saveCMSStore(store);
  showToast(`✓ Page "${store[currentCMSPage].title}" published successfully!`);
}

function resetCMSPageToDefault() {
  if (confirm(`Reset "${currentCMSPage}" content back to default factory content?`)) {
    const store = getCMSStore();
    store[currentCMSPage] = JSON.parse(JSON.stringify(DEFAULT_CMS_DATA[currentCMSPage]));
    saveCMSStore(store);
    loadCMSPage(currentCMSPage);
    showToast(`Page "${DEFAULT_CMS_DATA[currentCMSPage].title}" reset to defaults.`);
  }
}

function exportSiteConfigJSON() {
  const store = getCMSStore();
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sgs_website_cms_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('📥 Site CMS Configuration exported as JSON.');
}

function importSiteConfigJSON(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      saveCMSStore(data);
      loadCMSPage(currentCMSPage);
      showToast('✓ Site CMS Configuration successfully imported!');
    } catch (err) {
      alert('Invalid JSON file format.');
    }
  };
  reader.readAsText(file);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cmsCurrentPageLabel')) {
    loadCMSPage('home');
  }
});

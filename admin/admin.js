/**
 * Sadana Green Society - Executive Admin Portal & CMS Engine
 */

const SEED_FARMERS = [
  {
    id: "SGS-101",
    date: "2026-11-12",
    farmerName: "B. Venkata Reddy",
    guardianName: "B. Rami Reddy",
    mobile: "+91 98480 23456",
    aadhaar: "4589-2140-7782",
    village: "Nandyal",
    mandal: "Nandyal Rural",
    district: "Nandyal",
    state: "Andhra Pradesh",
    totalAcres: "4.5",
    plantationAcres: "4.0",
    model: "Agroforestry Boundary",
    species: "Teak (టేకు), Melia Dubia (మలబార్ వేప)",
    waterSource: "Borewell + Drip",
    soilType: "Black Cotton",
    notes: "Boundary plantation 400 saplings delivered and planted"
  },
  {
    id: "SGS-102",
    date: "2026-11-10",
    farmerName: "K. Chenna Kesavulu",
    guardianName: "K. Subbaiah",
    mobile: "+91 94401 87654",
    aadhaar: "8891-3412-9012",
    village: "Orvakal",
    mandal: "Orvakal",
    district: "Kurnool",
    state: "Andhra Pradesh",
    totalAcres: "3.0",
    plantationAcres: "3.0",
    model: "Block Plantation",
    species: "Red Sanders (ఎర్రచందనం), Casuarina (సర్వి)",
    waterSource: "Canal + Seasonal Borewell",
    soilType: "Red Sandy Loam",
    notes: "Block plantation 300 Red Sanders saplings"
  },
  {
    id: "SGS-103",
    date: "2026-11-08",
    farmerName: "M. Lakshmidevi",
    guardianName: "W/o M. Krishna Murthy",
    mobile: "+91 99887 11223",
    aadhaar: "3419-8761-0021",
    village: "Dhone",
    mandal: "Dhone",
    district: "Nandyal",
    state: "Andhra Pradesh",
    totalAcres: "5.0",
    plantationAcres: "5.0",
    model: "Horticulture Mix",
    species: "Mango (మామిడి - Benishan), Guava (జామ)",
    waterSource: "Drip Irrigation",
    soilType: "Alluvial Red Soil",
    notes: "High density horticulture orchard"
  },
  {
    id: "SGS-104",
    date: "2026-11-05",
    farmerName: "G. Raghava Rao",
    guardianName: "G. Venkata Subbaiah",
    mobile: "+91 91234 56789",
    aadhaar: "7721-0943-5561",
    village: "Kollapur",
    mandal: "Kollapur",
    district: "Mahabubnagar",
    state: "Telangana",
    totalAcres: "6.0",
    plantationAcres: "6.0",
    model: "AWD Paddy Water",
    species: "Paddy (BPT 5204) + Boundary Subabul",
    waterSource: "Krishna River Lift Irrigation",
    soilType: "Clay Loam",
    notes: "6 AWD perforated tubes installed, 30% water saving documented"
  },
  {
    id: "SGS-105",
    date: "2026-11-02",
    farmerName: "S. Mallikarjuna",
    guardianName: "S. Thimmappa",
    mobile: "+91 97401 22334",
    aadhaar: "5561-2389-1144",
    village: "Siruguppa",
    mandal: "Siruguppa",
    district: "Bellary",
    state: "Karnataka",
    totalAcres: "2.5",
    plantationAcres: "2.5",
    model: "Agroforestry Boundary",
    species: "Melia Dubia (మలబార్ వేప), Bamboo (వెదురు)",
    waterSource: "Borewell",
    soilType: "Black Loam",
    notes: "Boundary agroforestry with Tungabhadra basin soil"
  }
];

// Initialize Storage
function getFarmerRecords() {
  const raw = localStorage.getItem('sgs_farmer_applications');
  if (!raw) {
    localStorage.setItem('sgs_farmer_applications', JSON.stringify(SEED_FARMERS));
    return SEED_FARMERS;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return SEED_FARMERS;
  }
}

function saveFarmerRecords(records) {
  localStorage.setItem('sgs_farmer_applications', JSON.stringify(records));
}

// Render Compact Table Rows
function renderFarmerTable(filterQuery = '', filterModel = '') {
  const tbody = document.getElementById('farmerTableBody');
  if (!tbody) return;

  const records = getFarmerRecords();
  const q = filterQuery.toLowerCase().trim();
  const m = filterModel.toLowerCase().trim();

  let matched = 0;
  tbody.innerHTML = '';

  records.forEach((f, idx) => {
    const textCorpus = `${f.farmerName || ''} ${f.mobile || ''} ${f.village || ''} ${f.district || ''} ${f.species || ''}`.toLowerCase();
    const modelMatch = !m || (f.model || '').toLowerCase().includes(m);
    const textMatch = !q || textCorpus.includes(q);

    if (modelMatch && textMatch) {
      matched++;
      const tr = document.createElement('tr');
      tr.className = 'compact-table-row';
      tr.dataset.index = idx;
      tr.innerHTML = `
        <td>
          <span style="font-weight:700; color:#15803d; font-size:0.85rem;">#${f.id || 'SGS-' + (idx + 101)}</span><br>
          <small style="color:#64748b; font-size:0.75rem;">${f.date || 'Recent'}</small>
        </td>
        <td>
          <input type="text" class="t-inp t-name" value="${escapeHtml(f.farmerName || '')}" placeholder="Farmer Name" style="font-weight:600; width:100%; padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; font-size:0.88rem;">
        </td>
        <td>
          <input type="text" class="t-inp t-phone" value="${escapeHtml(f.mobile || '')}" placeholder="Mobile" style="width:100%; padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; font-size:0.85rem;">
        </td>
        <td>
          <input type="text" class="t-inp t-location" value="${escapeHtml((f.village || '') + (f.district ? ', ' + f.district : ''))}" placeholder="Village, District" style="width:100%; padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; font-size:0.85rem;">
        </td>
        <td>
          <input type="text" class="t-inp t-acres" value="${escapeHtml(f.totalAcres || '2')}" placeholder="Acres" style="width:65px; text-align:center; padding:6px 4px; border:1px solid #d1d5db; border-radius:6px; font-size:0.85rem;">
        </td>
        <td>
          <select class="t-inp t-model" style="width:100%; padding:6px 8px; border:1px solid #d1d5db; border-radius:6px; font-size:0.85rem; background:#fff;">
            <option value="Agroforestry Boundary" ${f.model === 'Agroforestry Boundary' ? 'selected' : ''}>Agroforestry Boundary</option>
            <option value="Block Plantation" ${f.model === 'Block Plantation' ? 'selected' : ''}>Block Plantation</option>
            <option value="AWD Paddy Water" ${f.model === 'AWD Paddy Water' ? 'selected' : ''}>AWD Paddy Water</option>
            <option value="Horticulture Mix" ${f.model === 'Horticulture Mix' ? 'selected' : ''}>Horticulture Mix</option>
          </select>
        </td>
        <td>
          <input type="text" class="t-inp t-species" value="${escapeHtml(f.species || '')}" placeholder="Species" style="width:100%; padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; font-size:0.85rem;">
        </td>
        <td style="text-align:center;">
          <div style="display:flex; justify-content:center; gap:6px;">
            <button class="admin-btn-sm" onclick="saveSingleFarmer(${idx})" title="Save Record" style="background:#f0fdf4; color:#166534; border-color:#bbf7d0;">💾 Save</button>
            <button class="admin-btn-sm admin-btn-delete" onclick="deleteFarmer(${idx})" title="Delete Record">🗑️</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    }
  });

  const noMsg = document.getElementById('noResultsMsg');
  if (noMsg) {
    noMsg.style.display = matched === 0 ? 'block' : 'none';
  }
}

function filterFarmerTable() {
  const q = document.getElementById('adminFarmerSearch') ? document.getElementById('adminFarmerSearch').value : '';
  const m = document.getElementById('adminModelFilter') ? document.getElementById('adminModelFilter').value : '';
  renderFarmerTable(q, m);
}

function saveSingleFarmer(idx) {
  const records = getFarmerRecords();
  const row = document.querySelector(`tr[data-index="${idx}"]`);
  if (!row || !records[idx]) return;

  const loc = row.querySelector('.t-location').value.split(',');
  const village = loc[0] ? loc[0].trim() : '';
  const district = loc[1] ? loc[1].trim() : (records[idx].district || 'Kurnool');

  records[idx].farmerName = row.querySelector('.t-name').value.trim();
  records[idx].mobile = row.querySelector('.t-phone').value.trim();
  records[idx].village = village;
  records[idx].district = district;
  records[idx].totalAcres = row.querySelector('.t-acres').value.trim();
  records[idx].model = row.querySelector('.t-model').value;
  records[idx].species = row.querySelector('.t-species').value.trim();

  saveFarmerRecords(records);
  showToast(`✓ Farmer record #${records[idx].id || idx+101} updated & saved!`);
}

function saveAllFarmers() {
  const records = getFarmerRecords();
  const rows = document.querySelectorAll('.compact-table-row');

  rows.forEach(row => {
    const idx = parseInt(row.dataset.index, 10);
    if (!isNaN(idx) && records[idx]) {
      const loc = row.querySelector('.t-location').value.split(',');
      records[idx].farmerName = row.querySelector('.t-name').value.trim();
      records[idx].mobile = row.querySelector('.t-phone').value.trim();
      records[idx].village = loc[0] ? loc[0].trim() : '';
      records[idx].district = loc[1] ? loc[1].trim() : (records[idx].district || 'Kurnool');
      records[idx].totalAcres = row.querySelector('.t-acres').value.trim();
      records[idx].model = row.querySelector('.t-model').value;
      records[idx].species = row.querySelector('.t-species').value.trim();
    }
  });

  saveFarmerRecords(records);
  showToast('✓ All farmer records successfully saved!');
}

function addNewBlankFarmer() {
  const records = getFarmerRecords();
  const newId = `SGS-${records.length + 101}`;
  const today = new Date().toISOString().slice(0, 10);

  records.unshift({
    id: newId,
    date: today,
    farmerName: '',
    guardianName: '',
    mobile: '+91 ',
    aadhaar: '',
    village: '',
    mandal: '',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    totalAcres: '2.0',
    plantationAcres: '2.0',
    model: 'Agroforestry Boundary',
    species: 'Teak (టేకు), Melia Dubia (మలబార్ వేప)',
    waterSource: 'Borewell',
    soilType: 'Red Soil',
    notes: 'New farmer registration entry'
  });

  saveFarmerRecords(records);
  renderFarmerTable();
  showToast('+ New farmer row created. Fill in details and click Save!');
}

function deleteFarmer(idx) {
  const records = getFarmerRecords();
  const f = records[idx];
  const name = f ? f.farmerName || 'this record' : 'this record';

  if (confirm(`Are you sure you want to delete farmer record for ${name}?`)) {
    records.splice(idx, 1);
    saveFarmerRecords(records);
    renderFarmerTable();
    showToast('🗑️ Farmer record removed.');
  }
}

function exportFarmersToCSV() {
  const records = getFarmerRecords();
  let csv = 'ID,Date,Farmer Name,Guardian,Mobile,Aadhaar,Village,District,State,Acres,Model,Species,Water Source,Soil\n';

  records.forEach(f => {
    csv += `"${f.id || ''}","${f.date || ''}","${f.farmerName || ''}","${f.guardianName || ''}","${f.mobile || ''}","${f.aadhaar || ''}","${f.village || ''}","${f.district || ''}","${f.state || ''}","${f.totalAcres || ''}","${f.model || ''}","${f.species || ''}","${f.waterSource || ''}","${f.soilType || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sgs_farmers_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('📥 Downloaded farmer spreadsheet CSV.');
}

// Image CMS Manager
const DEFAULT_IMAGES = {
  hero_bg: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80",
  story: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80",
  solutions_1: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
  solutions_2: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=800&q=80",
  bento_1: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1000&q=80",
  bento_2: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80",
  bento_3: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
  bento_4: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1000&q=80"
};

function getCmsImages() {
  const raw = localStorage.getItem('sgs_site_images');
  if (!raw) return DEFAULT_IMAGES;
  try {
    return { ...DEFAULT_IMAGES, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_IMAGES;
  }
}

function loadCmsValues() {
  const imgs = getCmsImages();
  for (const key in imgs) {
    const inp = document.getElementById(`img_${key}`);
    const prev = document.getElementById(`preview_${key}`);
    if (inp) inp.value = imgs[key];
    if (prev) prev.src = imgs[key];
  }
}

function previewImg(inp, prevId) {
  const prev = document.getElementById(prevId);
  if (prev && inp) {
    prev.src = inp.value;
  }
}

function switchCmsTab(tabName) {
  document.querySelectorAll('.cms-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.cms-tab-panel').forEach(p => p.style.display = 'none');

  const btn = Array.from(document.querySelectorAll('.cms-tab-btn')).find(b => b.innerText.toLowerCase().includes(tabName.toLowerCase()));
  if (btn) btn.classList.add('active');

  const panelMap = {
    home: 'cmsTabHome',
    images: 'cmsTabImages',
    about: 'cmsTabAbout',
    carbon: 'cmsTabCarbon',
    awd: 'cmsTabAwd',
    contact: 'cmsTabContact'
  };

  const panel = document.getElementById(panelMap[tabName]);
  if (panel) panel.style.display = 'block';
}

function saveSiteContentAndImages() {
  const imgs = getCmsImages();
  for (const key in DEFAULT_IMAGES) {
    const inp = document.getElementById(`img_${key}`);
    if (inp) imgs[key] = inp.value.trim();
  }
  localStorage.setItem('sgs_site_images', JSON.stringify(imgs));
  showToast('✓ Media & Content changes saved and published!');
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(msg) {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.style.cssText = 'position:fixed; bottom:24px; right:24px; background:#0f2b1d; color:#ffffff; padding:14px 24px; border-radius:12px; font-family:"Rubik",sans-serif; font-size:0.95rem; font-weight:600; box-shadow:0 8px 30px rgba(0,0,0,0.25); z-index:99999; border:1px solid #22c55e; transition:opacity 0.3s ease;';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
  }, 3500);
}

function logoutAdmin() {
  localStorage.removeItem('sgs_admin_auth');
  window.location.href = '../index.html';
}

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('farmerTableBody')) {
    renderFarmerTable();
  }
  if (document.getElementById('img_hero_bg')) {
    loadCmsValues();
  }
});

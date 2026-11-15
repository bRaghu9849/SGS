/**
 * Sadana Green Society (SGS) - Core Frontend Script
 * Handles Video Lightbox, Mobile Navigation Drawer, Global Search, and Interactive Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar shadow on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeSearchModal();
      closeMobileDrawer();
      closeGalleryLightbox();
    }
  });
});

// --- VIDEO MODAL ---
function openVideoModal(videoSrc) {
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('modalVideoPlayer');
  if (modal) {
    if (videoPlayer && videoSrc) {
      const source = videoPlayer.querySelector('source');
      if (source) source.src = videoSrc;
      videoPlayer.load();
      videoPlayer.play().catch(() => {});
    }
    modal.classList.add('active');
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('modalVideoPlayer');
  if (modal) {
    modal.classList.remove('active');
    if (videoPlayer) videoPlayer.pause();
  }
}

// --- SEARCH MODAL ---
const searchablePages = [
  { title: "Home Page", url: "/", desc: "Sustainable agroforestry, AWD paddy & carbon credits overview." },
  { title: "About Us", url: "/about/", desc: "Leadership, mission, team of experts, and grassroots history." },
  { title: "Our Journey & Milestones", url: "/our-journey/", desc: "Founder B. Raghu Bhaskar and 8 pillars of comprehensive work." },
  { title: "Programmes & Services", url: "/services/", desc: "Agroforestry models, soil testing, and precision farming." },
  { title: "Agroforestry Models", url: "/agroforestry/", desc: "Boundary plantations, mixed cropping, and timber economics." },
  { title: "Species Catalog (16 Trees)", url: "/species/", desc: "All 16 native timber & fruit species with soil guides." },
  { title: "Forest & Timber Species", url: "/forest-species/", desc: "Teak, Melia dubia, Casuarina, Pongamia, Neem, Bamboo, Subabul, Red Sanders." },
  { title: "Fruit & Horticulture Species", url: "/fruit-species/", desc: "Mango, Guava, Sapota, Custard Apple, Amla, Lemon, Coconut, Cashew." },
  { title: "Carbon Credits Lifecycle", url: "/carbon-credits/", desc: "7-stage MRV satellite monitoring & farmer revenue disbursements." },
  { title: "AWD Paddy Water Management", url: "/awd/", desc: "Save 30% water and reduce methane emissions in rice cultivation." },
  { title: "Environment & Climate Action", url: "/environment/", desc: "6 core environmental areas protecting soil, water, and air." },
  { title: "Photo Gallery", url: "/gallery/", desc: "44 authentic field photos from plantations and community work." },
  { title: "News & Media Hub", url: "/news/", desc: "Telugu newspaper clippings and agricultural press coverage." },
  { title: "Contact Us", url: "/contact/", desc: "Kurnool HQ head office, phone +91 99634 90444, and map." },
  { title: "Frequently Asked Questions (FAQ)", url: "/faq/", desc: "Bilingual English & Telugu answers about all SGS programmes." },
  { title: "Apply for Saplings", url: "/new-plantation/", desc: "Farmer sapling application with real-time GPS location capture." }
];

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('globalSearchInput');
  if (modal) {
    modal.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
      handleGlobalSearch('');
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleGlobalSearch(query) {
  const container = document.getElementById('searchResults');
  if (!container) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    container.innerHTML = '<p class="search-hint">Type to search across all SGS pages, species, and farmer programmes.</p>';
    return;
  }

  const results = searchablePages.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.desc.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    container.innerHTML = '<p class="search-hint">No results found for "' + query + '". Try "Teak", "AWD", or "Carbon".</p>';
    return;
  }

  container.innerHTML = results.map(r => `
    <a href="${r.url}" class="search-result-item" style="display:block; padding:12px 16px; border-radius:12px; border-bottom:1px solid #edf2ef; text-decoration:none; margin-bottom:8px; background:#fbfdfb;">
      <h4 style="font-size:1rem; font-weight:700; color:#172723; margin:0 0 4px 0;">${r.title}</h4>
      <p style="font-size:0.85rem; color:#556862; margin:0;">${r.desc}</p>
    </a>
  `).join('');
}

// --- MOBILE NAVIGATION DRAWER ---
function openMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// --- GALLERY LIGHTBOX MODAL ---
function openGalleryLightbox(src, caption) {
  const modal = document.getElementById('galleryLightboxModal') || document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (modal && img) {
    img.src = src;
    if (cap) cap.innerText = caption || 'Field Activity Photo';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeGalleryLightbox() {
  const modal = document.getElementById('galleryLightboxModal') || document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

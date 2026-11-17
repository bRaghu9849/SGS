/**
 * Sadana Green Society (SGS) - Master Interactive Engine
 * Handles Navigation, Reference Cascading Dropdowns, Mobile Accordions,
 * Universal File/Server Link Resolution, Modals, and Lightboxes.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar styling on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  });

  // 2. Interactive Dropdown click & tap toggle for mobile/tablets/desktop
  document.querySelectorAll('.selio-dropdown-parent, .ct-has-dropdown').forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        // Toggle on click if touch or screen width < 1100px or clicking caret
        if (window.innerWidth < 1100 || ('ontouchstart' in window) || e.target.closest('.caret')) {
          e.preventDefault();
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.selio-dropdown-parent, .ct-has-dropdown').forEach(el => el.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        }
      });
    }
  });

  // Subgroup click toggle (Forest species / Fruit species)
  document.querySelectorAll('.selio-flyout-subgroup').forEach(sub => {
    const subLink = sub.querySelector('.selio-flyout-item.has-sub');
    if (subLink) {
      subLink.addEventListener('click', (e) => {
        if (window.innerWidth < 1100 || ('ontouchstart' in window)) {
          e.preventDefault();
          e.stopPropagation();
          sub.classList.toggle('open');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.selio-dropdown-parent, .ct-has-dropdown, .selio-flyout-subgroup').forEach(el => el.classList.remove('open'));
    }
  });

  // 3. Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeSearchModal();
      closeMobileDrawer();
      closeGalleryLightbox();
    }
  });

  // 4. Universal Link Resolver: Supports double-clicking files locally via file:// protocol
  if (window.location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach(a => {
      let href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      
      // Match relative directory links ending with /
      if (href.endsWith('/')) {
        let clean = href.slice(0, -1);
        if (clean === '.' || clean === '') {
          a.setAttribute('href', (href.startsWith('../') ? '../' : '') + 'index.html');
        } else {
          a.setAttribute('href', clean + '.html');
        }
      }
    });
  }

  // 5. Dynamic About Page Team Members Hydration
  initAboutTeamSection();
});

// --- DYNAMIC ABOUT TEAM RENDERING ---
function initAboutTeamSection() {
  const grid = document.getElementById('aboutTeamGrid') || document.querySelector('.about-team-grid');
  if (!grid) return;

  const defaultMembers = [
    {
      name: "B. Raghu Bhaskar",
      role: "Founder & President",
      image: "assets/images/founder/b-raghu-bhaskar-professional.png"
    },
    {
      name: "K. Venkata Rami Reddy",
      role: "Field Operations Director",
      image: "assets/images/template/team-2.jpg"
    },
    {
      name: "G. Lakshmi Devi",
      role: "Women Farmer Empowerment Lead",
      image: "assets/images/template/team-3.jpg"
    },
    {
      name: "Dr. P. Suresh Kumar",
      role: "Agroforestry Technical Advisor",
      image: "assets/images/template/team-4.jpg"
    },
    {
      name: "M. Chennakesavulu",
      role: "Regional Coordinator (Nandyal)",
      image: "assets/images/template/team-5.jpg"
    },
    {
      name: "S. Mallikarjuna Rao",
      role: "AWD Paddy Water Engineer",
      image: "assets/images/template/team-6.jpg"
    },
    {
      name: "T. Ramanjaneyulu",
      role: "Certified Nursery Quality Lead",
      image: "assets/images/template/team-7.jpg"
    },
    {
      name: "B. Srinivasulu",
      role: "Carbon Biomass Survey Officer",
      image: "assets/images/template/team-8.jpg"
    }
  ];

  let members = defaultMembers;
  try {
    const saved = localStorage.getItem('sgs_team_members');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        members = parsed;
      }
    }
  } catch(e) {}

  const isSubpage = window.location.pathname.endsWith('/about/') || window.location.pathname.includes('/about/index');
  const prefix = isSubpage ? '../' : './';

  grid.innerHTML = members.map(m => {
    let imgPath = m.image || 'assets/images/founder/b-raghu-bhaskar-professional.png';
    if (!imgPath.startsWith('http')) {
      imgPath = imgPath.replace(/^\.?\//, '');
      imgPath = prefix + imgPath;
    }
    return `
      <div class="about-team-card">
        <div class="about-team-photo" style="background-image: url('${imgPath}'); background-color:#e8f0eb;"></div>
        <h4>${m.name}</h4>
        <p>${m.role}</p>
      </div>
    `;
  }).join('');
}

// --- MOBILE DRAWER ACCORDION ---
function toggleDrawerAccordion(btn) {
  const acc = btn.closest('.drawer-accordion');
  if (acc) {
    acc.classList.toggle('open');
  }
}

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
  { title: "Home Page", url: "./", desc: "Sustainable agroforestry, AWD paddy & carbon credits overview." },
  { title: "About Us", url: "about/", desc: "Leadership, mission, team of experts, and grassroots history." },
  { title: "Our Impact & Journey", url: "our-journey/", desc: "Founder B. Raghu Bhaskar and comprehensive milestones." },
  { title: "Services & Programmes", url: "services/", desc: "Agroforestry models, soil testing, and precision farming." },
  { title: "Agroforestry Models", url: "agroforestry/", desc: "Boundary plantations, mixed cropping, and timber economics." },
  { title: "Species Catalog (16 Trees)", url: "species/", desc: "All 16 native timber & fruit species with soil guides." },
  { title: "Forest & Timber Species", url: "forest-species/", desc: "Teak, Melia dubia, Casuarina, Pongamia, Neem, Bamboo, Subabul, Red Sanders." },
  { title: "Fruit & Horticulture Species", url: "fruit-species/", desc: "Mango, Guava, Sapota, Custard Apple, Amla, Lemon, Coconut, Cashew." },
  { title: "Carbon Credits Lifecycle", url: "carbon-credits/", desc: "7-stage MRV satellite monitoring & farmer revenue disbursements." },
  { title: "AWD Paddy Water Management", url: "awd/", desc: "Save 30% water and reduce methane emissions in rice cultivation." },
  { title: "Environment & Climate Action", url: "environment/", desc: "6 core environmental areas protecting soil, water, and air." },
  { title: "Photo Gallery", url: "gallery/", desc: "44 authentic field photos from plantations and community work." },
  { title: "News & Media Hub", url: "news/", desc: "Telugu newspaper clippings and agricultural press coverage." },
  { title: "Contact Us", url: "contact/", desc: "Kurnool HQ head office, phone +91 99634 90444, and map." },
  { title: "Frequently Asked Questions (FAQ)", url: "faq/", desc: "Bilingual English & Telugu answers about all SGS programmes." },
  { title: "Apply for Saplings", url: "new-plantation/", desc: "Farmer sapling application with real-time GPS location capture." }
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

  // Adjust URL prefix depending on depth
  const isSubpage = window.location.pathname.includes('/') && !window.location.pathname.endsWith('/new_website/') && window.location.pathname.split('/').filter(Boolean).length > 1;
  const prefix = isSubpage ? '../' : './';

  container.innerHTML = results.map(r => `
    <a href="${prefix}${r.url.replace(/^\.\//, '')}" class="search-result-item" style="display:block; padding:12px 16px; border-radius:12px; border-bottom:1px solid #edf2ef; text-decoration:none; margin-bottom:8px; background:#fbfdfb;">
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

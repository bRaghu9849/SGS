/* ==========================================================================
   Sadana Green Society (SGS) - Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // 1. Header Sticky & Scroll Effect
  const header = document.querySelector('.site-header');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Open / Close
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
    }
  });

  // 3. Search Modal Trigger
  const searchTriggers = document.querySelectorAll('.btn-search-trigger');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.querySelector('.search-modal-close');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      const input = searchModal.querySelector('input');
      if (input) setTimeout(() => input.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // 4. Metric Counter Animation
  const counters = document.querySelectorAll('[data-target]');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runCounter(el) {
    const target = +el.getAttribute('data-target');
    if (isReducedMotion || isNaN(target)) {
      el.textContent = target.toLocaleString('en-IN');
      return;
    }
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      el.textContent = current.toLocaleString('en-IN');
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => runCounter(c));
  }

  // 5. Species Tab Filter
  const tabBtns = document.querySelectorAll('.species-tabs .tab-btn');
  const speciesCards = document.querySelectorAll('.species-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');

      speciesCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Dynamic Year in Footer
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 7. Lightbox for Gallery
  const galleryLinks = document.querySelectorAll('.gallery-lightbox-trigger');
  if (galleryLinks.length > 0) {
    galleryLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const imgSrc = this.getAttribute('href');
        const caption = this.getAttribute('data-caption') || '';
        showLightbox(imgSrc, caption);
      });
    });
  }

  function showLightbox(src, text) {
    let lb = document.getElementById('sgs-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'sgs-lightbox';
      lb.innerHTML = `
        <div class="lb-backdrop"></div>
        <div class="lb-box">
          <button class="lb-close" aria-label="Close image">✕</button>
          <img src="" alt="Enlarged view">
          <p class="lb-caption"></p>
        </div>
      `;
      document.body.appendChild(lb);

      const style = document.createElement('style');
      style.textContent = `
        #sgs-lightbox { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .lb-backdrop { position: absolute; inset: 0; background: rgba(10, 20, 16, 0.88); backdrop-filter: blur(8px); }
        .lb-box { position: relative; z-index: 1; max-width: 90vw; max-height: 88vh; display: flex; flex-direction: column; align-items: center; }
        .lb-box img { max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .lb-caption { color: #fff; margin-top: 14px; font-size: 0.95rem; text-align: center; }
        .lb-close { position: absolute; top: -45px; right: 0; width: 36px; height: 36px; border-radius: 50%; background: #ffffff; border: none; font-size: 1.2rem; cursor: pointer; display: grid; place-items: center; }
      `;
      document.head.appendChild(style);

      lb.querySelector('.lb-close').addEventListener('click', () => lb.remove());
      lb.querySelector('.lb-backdrop').addEventListener('click', () => lb.remove());
    }
    lb.querySelector('img').src = src;
    lb.querySelector('.lb-caption').textContent = text;
  }

  // 8. Video Lightbox Modal Controls
  window.openVideoModal = function (url) {
    const modal = document.getElementById('video-lightbox');
    const iframe = document.getElementById('video-modal-iframe');
    if (modal && iframe) {
      // Default to agricultural documentary / nature embed if custom URL not specified
      iframe.src = url || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeVideoModal = function (e) {
    if (e && e.target && e.target.classList.contains('video-lightbox-content')) return;
    const modal = document.getElementById('video-lightbox');
    const iframe = document.getElementById('video-modal-iframe');
    if (modal && iframe) {
      iframe.src = '';
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  // 9. Dynamic Navigation & Header Sync (Editable via Admin Panel)
  function applyNavigationConfig(config) {
    if (!config) return;

    // A. Top Announcement Strip
    const annStrip = document.getElementById('top-announcement');
    if (annStrip && config.announcement) {
      if (config.announcement.enabled === false) {
        annStrip.style.display = 'none';
      } else {
        annStrip.style.display = 'flex';
        const span = annStrip.querySelector('span');
        if (span && config.announcement.text) {
          span.innerHTML = config.announcement.text;
        }
        const a = annStrip.querySelector('a');
        if (a && config.announcement.link_text) {
          a.textContent = config.announcement.link_text;
          if (config.announcement.link_url) a.href = config.announcement.link_url;
        }
      }
    }

    // B. Header Pill CTA Button
    const ctaBtn = document.querySelector('.btn-pill-cta');
    if (ctaBtn && config.header_cta) {
      if (config.header_cta.enabled === false) {
        ctaBtn.style.display = 'none';
      } else {
        ctaBtn.style.display = 'inline-flex';
        const span = ctaBtn.querySelector('span:first-child');
        if (span && config.header_cta.text) span.textContent = config.header_cta.text;
        if (config.header_cta.url) ctaBtn.href = config.header_cta.url;
      }
    }

    // C. Floating WhatsApp Widget
    const waBtn = document.querySelector('.floating-whatsapp');
    if (waBtn && config.whatsapp) {
      if (config.whatsapp.enabled === false) {
        waBtn.style.display = 'none';
      } else {
        waBtn.style.display = 'flex';
        const phone = config.whatsapp.phone || '919963490444';
        const msg = encodeURIComponent(config.whatsapp.message || '');
        waBtn.href = `https://wa.me/${phone}?text=${msg}`;
      }
    }

    // D. Navigation Links Visibility
    if (Array.isArray(config.menu_items)) {
      const navItems = document.querySelectorAll('.desktop-nav .nav-item');
      const drawerItems = document.querySelectorAll('.drawer-menu li');

      config.menu_items.forEach(item => {
        // Find matching links
        document.querySelectorAll(`.desktop-nav a[href="${item.url}"], .drawer-menu a[href="${item.url}"]`).forEach(link => {
          const parent = link.closest('.nav-item') || link.closest('li');
          if (parent) {
            parent.style.display = item.active === false ? 'none' : '';
          }
          if (item.label && !link.querySelector('.caret')) {
            link.textContent = item.label;
          }
        });
      });
    }
  }

  // Check cached settings first (instant load)
  try {
    const cached = localStorage.getItem('sgs_navigation_settings');
    if (cached) applyNavigationConfig(JSON.parse(cached));
  } catch (err) {}

  // Fetch updated settings from backend API
  fetch('api/navigation.php')
    .then(r => r.json())
    .then(res => {
      if (res && res.success && res.data) {
        localStorage.setItem('sgs_navigation_settings', JSON.stringify(res.data));
        applyNavigationConfig(res.data);
      }
    })
    .catch(() => {});

})();

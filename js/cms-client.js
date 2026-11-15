/**
 * Sadana Green Society - Public Page CMS Hydration
 * Reads live edits from SGS Admin Console and dynamically updates the DOM
 */
(function() {
  try {
    const rawData = localStorage.getItem('sgs_cms_pages');
    if (!rawData) return;
    const cmsStore = JSON.parse(rawData);

    // Identify current page
    let path = window.location.pathname.toLowerCase();
    let pageKey = 'home';
    if (path.includes('about')) pageKey = 'about';
    else if (path.includes('services')) pageKey = 'services';
    else if (path.includes('agroforestry')) pageKey = 'agroforestry';
    else if (path.includes('carbon-credits')) pageKey = 'carbon';
    else if (path.includes('awd')) pageKey = 'awd';
    else if (path.includes('species') || path.includes('forest') || path.includes('fruit')) pageKey = 'species';
    else if (path.includes('news') || path.includes('article')) pageKey = 'news';
    else if (path.includes('gallery')) pageKey = 'gallery';
    else if (path.includes('contact')) pageKey = 'contact';
    else if (path.includes('faq')) pageKey = 'faq';

    const pageData = cmsStore[pageKey];
    if (!pageData) return;

    document.addEventListener('DOMContentLoaded', () => {
      // Update Meta
      if (pageData.metaTitle) document.title = pageData.metaTitle;
      
      // Update Hero Title & Subtitle if present
      const heroTitleEl = document.querySelector('.hero-title');
      if (heroTitleEl && pageData.heroTitle) {
        heroTitleEl.innerHTML = pageData.heroTitle;
      }

      const heroLeadEl = document.querySelector('.hero-lead');
      if (heroLeadEl && pageData.heroSubtitle) {
        heroLeadEl.innerHTML = pageData.heroSubtitle;
      }
    });
  } catch (err) {
    console.warn('CMS client hydration skipped:', err);
  }
})();

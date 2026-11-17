# Sadana Green Society (SGS) Website Rebuild & CMS Master Plan

> **Document Type:** Comprehensive Architectural, Content & UI/UX Rebuild Specification  
> **Target Audience:** Execution Agent / Senior Full-Stack Engineer (Claude)  
> **Project Root:** `c:\Users\rafi\Desktop\FREELANCE\sadhana ngo\`  
> **Live Target:** GitHub Pages SPA with Clean Trailing-Slash Routes (`https://braghu9849.github.io/SGS/`)  
> **Source Evidence:** 14 Official Old Website Screenshots (PDFs), Template Reference Screenshots (Blocksy style), and Existing Single-File Architecture (`index.html` + `scratch/parts_*.py`).

---

## 1. Executive Summary & Core Mandates

The goal of this rebuild is to achieve **100% content parity with the original Sadana Green Society (SGS) website**, wrapped in the modern, high-end visual aesthetic of the new template design (Rubik font, clean white pill navbar, frosted green accents), with an **enterprise-grade Admin CMS Studio** that allows non-technical administrators to edit every heading, paragraph, image, video, and list item across every page.

### The 7 Non-Negotiable Directives
1. **100% Content Parity with Old Website:** Every section, heading, Telugu translation, payment cycle, FAQ, species detail, and contact detail from the 14 old website PDFs must be present. Nothing is dropped or truncated.
2. **Original, Non-Cropped Images:** All images must come from the project's authentic image library (`images/` / `assets/images/`). No AI-hallucinated or placeholder greenhouse imagery. Images must display in their natural proportions without forced destructive cropping.
3. **Dedicated Hero Media per Page (Image OR Video):** Every single page (`/`, `/about/`, `/agroforestry/`, `/awd/`, `/carbon-credits/`, `/environment/`, `/species/`, `/new-plantation/`, `/contact/`, `/our-journey/`, `/gallery/`, `/news/`, `/faq/`, `/privacy/`, `/terms/`) must have its own independent Hero Background configuration in CMS:
   - Mode toggle: `Image` vs `Video`
   - Image options: File Upload (base64/local blob) OR External URL
   - Video options: File Upload (.mp4/.webm) OR External URL
4. **Admin UI/UX with Individual Save Buttons:** The admin panel must NOT rely on confusing auto-saves or a single monolithic save button. Every card, section, and form group must feature an **individual "Save Changes" button** with full interactive feedback (Idle → Saving... spinner → ✓ Saved! green state for 2.5s).
5. **Universal Granular CMS Modifiability:** Every piece of public content—including legal pages (Privacy & Terms), FAQ items, bilingual Telugu text, species attributes, team info, and contact details—must have a dedicated input field in the Admin Studio.
6. **Design Style & Typography:** Strictly adhere to the Blocksy modern ecological aesthetic:
   - Primary English Font: **Rubik** (weights 300, 400, 500, 600, 700, 800)
   - Telugu Font: **Noto Sans Telugu** (weights 400, 600, 700)
   - Zero references to Inter or system serif fallbacks.
7. **Clean Trailing-Slash Routing on GitHub Pages:** All navigation must resolve to clean URLs (e.g. `/about/`, `/carbon-credits/`, `/admin/`) with trailing slashes, using the existing folder structure and `404.html` SPA fallback.

---

## 2. Source Comparison & Content Gap Analysis

### 2.1 Audit of the 14 Source PDFs vs. Current Build

| Page / PDF Source | Old Site Features (Verified from Screenshots) | Current Build Status | Action Required in Rebuild |
| :--- | :--- | :--- | :--- |
| **Home Page** (`home page.pdf`) | • "Our impact at a glance" stats (1,20,000 / 5,000 / 3 states)<br>• Two-bar progress graphic: Agroforestry (1,20,000) vs AWD (5,000)<br>• "Where we work" list with green bullet points<br>• "What we do" 3 cards with direct links<br>• "Plants we promote" quick pills for forest & fruit<br>• "Good for the environment" 4 summary items<br>• "How we work with farmers" 4 steps<br>• 3 Telugu news clipping cards with paper titles<br>• Yellow CTA bar + 3-column footer | Partial: Bento grid exists, but the **two progress bars**, **"Where we work" badge block**, **"Plants we promote" pill row**, and **exact Telugu news previews** are missing or incomplete. | Restore the complete "Our impact at a glance" block with dual progress meters; add the quick species pills; wire Telugu news previews to live CMS; ensure yellow CTA bar exists. |
| **About Us** (`about us.pdf`) | • Green gradient hero with badge<br>• "Who we are" Founder card (B. Raghu Bhaskar portrait, badge "Sadana Green Society People \| Plants \| Prosperity")<br>• Our mission & Our vision quote boxes<br>• "Our projects" 8 distinct cards with descriptive subtext<br>• "How we work with farmers" 4 numbered steps<br>• "Partner with us" 5 entity badges (CSR teams, Institutions, etc.) | Partial: Founder photo exists, but the **"Who we are" layout with the exact official badge**, **all 8 project cards**, and **Partner entity badges** must match the exact PDF structure. | Implement the exact 8-card grid with custom icons/images; restore the 5 partner entity pills; ensure all text is CMS-driven. |
| **AWD Page** (`AWD page.pdf`) | • Hero with 5,000 farmer stat and field photo card<br>• "What is AWD?" scientific explanation<br>• "How AWD works in the field" (4 sequential steps)<br>• "Why farmers and the climate gain" (2 comparison columns)<br>• "Is AWD right for my field?" (Control over irrigation callout)<br>• "What SGS does" dark strip<br>• **AWD Project Payment Cycle** (6 detailed steps with full Telugu + English text)<br>• **"Before joining, ask these 4 questions"** (Bilingual English + Telugu) | Major Gaps: The **Payment Cycle (6 steps)** and **4 Questions (Bilingual)** are completely absent in the current build! | Add the 6-step Payment Cycle with full Telugu translation; add the 4 critical questions box with Telugu script; make every step editable in CMS. |
| **Carbon Credits** (`carbon credits.pdf`) | • Hero with 1,20,000 stat<br>• "What is a carbon credit?" 1 tonne CO₂ definition<br>• "Who benefits" 3 columns (Farmers, Companies, Environment)<br>• "How a carbon programme works" 4 steps<br>• "What to know before joining" disclaimer box<br>• "Good for the climate, too" bridge block<br>• **Carbon Credit Journey & Price Cycle** (7 bilingual steps: Enrolment to Farmer Payment)<br>• **"How can the value change over time?"** timeline flowchart | Major Gaps: The **7-step Price Cycle** and the **value change flowchart** are missing in current renderers. | Implement the full 7-step Journey & Price Cycle (bilingual Telugu/English); add the visual flowchart; expose all 7 steps to Admin CMS. |
| **Why Agroforestry** (`why agriforect.pdf`) | • Hero with 1,20,000 stat<br>• "What is agroforestry?" definition<br>• "Benefits of agroforestry" (For farmers, For soil/water, For climate)<br>• **Common agroforestry models** (6 distinct models: Bunds, Orchard intercrops, Block, Alley, Windbreaks, Livestock)<br>• **"Which trees for which land"** (Comprehensive 5-row suitability matrix: Dry/rainfed, Coastal, Irrigated, Poor/rocky, Bunds)<br>• Quick link cards to Forest & Fruit species | Major Gaps: The **6 agroforestry models** and the **5-row land suitability matrix** are missing! | Build the 6-model card grid; build the styled 5-row suitability table; make both sets 100% editable in CMS. |
| **Forest Species** (`forest species.pdf`) | • 8 Forest Trees: Teak, Melia dubia, Casuarina, Pongamia, Neem, Bamboo, Subabul, Red sanders.<br>• For each: English name, Telugu name, Botanical name, "Best for", 4 "Benefits" bullets, "Main uses" pills, and special "Note" callout box. | Incomplete: Pongamia and Neem were missing; botanical names and "Note" callout boxes were absent. | Implement the full 8 Forest Species cards with botanical names, Telugu script, bulleted benefits, and warning notes. Fully editable in Admin. |
| **Fruit Species** (`fruit species.pdf`) | • 8 Fruit Trees: Mango, Guava, Sapota, Custard apple, Amla, Lemon, Coconut, Cashew.<br>• For each: English name, Telugu name, Botanical name, "Best for", Benefits, Main uses, Note box. | Incomplete: Coconut and Cashew were replaced with Pomegranate and Jamun. | Support all species from both old site (Coconut, Cashew) and expanded set (Pomegranate, Jamun) or provide toggle so user has 100% of old site + new additions. Full card attributes editable. |
| **Environment** (`Environtment.pdf`) | • Hero with 6-pillar summary<br>• "How our work helps the environment" (6 detailed areas)<br>• **"What any farmer can do"** (6 actionable farm-level practices with checkmarks)<br>• "Climate action you can measure" dark banner | Incomplete: The "What any farmer can do" checklist is missing. | Add the 6-point farmer action checklist with green icons and link to AWD/Carbon. |
| **Our Impact** (`Our impact.pdf`) | • High-impact metrics overview<br>• Program-by-program breakdown<br>• Field verification stats | Incomplete: Merged into Environment instead of standing as rich content. | Provide comprehensive stats breakdown, field polygons, and audit transparency section. |
| **New Plantation** (`new plantation application.pdf`) | • Full application form: Farmer name, Father/Guardian name, Mobile, Alternate mobile, State, District, Mandal/Taluk, Village, Full land address<br>• Land extent (acres), Plantation type, Preferred species<br>• GPS Location capture button<br>• Photo capture (Camera / Gallery)<br>• **Important Terms & Conditions** (Full bilingual English + Telugu declaration)<br>• Water facility dropdown (English/Telugu)<br>• 2 Required checkboxes | Incomplete: Missing Alternate mobile, Mandal/Taluk, Village, and the **full bilingual terms declaration with Telugu text**. | Restore every single input field from the PDF; include the full English + Telugu declaration box; persist submissions in Admin Inbox. |
| **News & Media** (`new and media.pdf`) | • Header with intro<br>• 5 authentic newspaper clipping cards with Telugu headlines and paper names (Ghantaravam Daily, Praja Shakti, Eenadu, Sakshi, Andhra Jyothi)<br>• Modal image viewer on click | Exists, but needs to ensure full Telugu article text and high-res newspaper images are linked. | Ensure 5 newspaper cards have full Telugu headlines, publication metadata, and zoomable modal preview. |
| **Contact Us** (`contact us.pdf`) | • "Get in touch" structured table: Organisation, Working states, Office, Phone, WhatsApp, Email, Website<br>• "Send an enquiry" form: Name, Email, Interested In (dropdown), Message, "Open in my email app" button | Current form lacks the structured contact table from the PDF and the specific dropdown categories. | Implement the exact structured contact table alongside the contact form with email client mailto fallback. |
| **FAQ** (`faq.pdf`) | • 7 Core bilingual FAQs (Every item has English question + answer AND Telugu question + answer)<br>• Accordion collapse/expand<br>• "Need more information?" help box | Current build has partial FAQs; Telugu answers need to match the PDF 100%. | Embed all 7 bilingual FAQ pairs with toggleable accordion; add CMS editor for bilingual FAQs. |
| **Gallery** (`Gallery.pdf`) | • 24 Authentic field photos categorized by activity (Field, AWD, Training, Carbon, Plantation, Community)<br>• Category filter pills<br>• Modal zoom | Exists, but image paths must point to genuine non-cropped assets in `images/gallery/`. | Verify all 24 photo cards use authentic high-res field photos with bilingual captions. |

---

## 3. UI/UX & Design Architecture Specifications

### 3.1 Design System Tokens
- **Typography:**
  - Headings & Body: `font-family: 'Rubik', sans-serif;`
  - Telugu Content: `font-family: 'Noto Sans Telugu', 'Rubik', sans-serif;`
  - Monospace (Code/IDs): `font-family: 'JetBrains Mono', monospace;`
- **Color Palette:**
  - Primary Nature Green: `#54a630` (Hover: `#468e26`, Active: `#38721e`)
  - Accent Lime Green: `#7fd858` (Used for badges, highlights on dark backgrounds)
  - Deep Dark Green (Hero/Footer): `#0c1810` / `#111e15` / `#0b160e`
  - Dark Neutral Text: `#162219`
  - Muted Text: `#64748b` (Tailwind gray-500)
  - Card Background: `#ffffff`
  - Soft Card Tint: `#f8faf8` / `#f3f5f3`
  - Border Color: `#e2e8f0` / `rgba(255, 255, 255, 0.12)`
  - CTA Warm Amber: `#e5a93b` (For the yellow partnership callout banner)

### 3.2 Floating White Pill Navbar (Blocksy Style)
- **Container:** Full width, padding `pt-5 px-4 sm:px-8`, max-width `1220px`.
- **Pill Bar:** `bg-white rounded-full px-5 sm:px-7 py-3 shadow-lg flex items-center justify-between gap-4`.
- **Left Brand:** Official SGS logo emblem (`h-9 sm:h-10 w-auto`) + text lockup:
  - Line 1: `Sadana Green Society` (Rubik font-extrabold, 15–17px, `#162219`)
  - Line 2: `Regd. No. 129/2021 • Kurnool` (uppercase, 9.5–10px, bold `#54a630`)
- **Center Nav Links (Desktop):**
  - `HOME` (`/`)
  - `AGROFORESTRY ▾` (Mega Menu on Hover: Agroforestry Overview, 8 Forest Species, 8 Fruit Species, Why Agroforestry)
  - `PROGRAMMES ▾` (Mega Menu on Hover: Carbon Credits, AWD in Paddy, Environment & Impact, Photo Gallery)
  - `ABOUT` (`/about/` / `/our-journey/`)
  - `NEWS` (`/news/`)
  - `CONTACT` (`/contact/`)
- **Right Actions:**
  - Search Icon button (opens search modal)
  - `Get Started →` pill button (`bg-[#54a630] hover:bg-[#468e26] text-white font-extrabold text-xs px-5 py-2.5 rounded-full`) linking to `/new-plantation/`
- **Mobile Drawer:** Hamburger button toggle, sliding panel with accordion dropdowns for Agroforestry and Programmes, social links, and quick phone contact.

---

## 4. Per-Page Hero Media Architecture (Image OR Video)

### 4.1 Specification
Every single route in the site must render its hero section through a unified, parameter-driven function:
```javascript
renderHeroMediaLayer(pageKey, defaultFallbackImgKey)
```

### 4.2 Data Schema (Stored in `CMS.heroes[pageKey]`)
For every page key (`home`, `about`, `agroforestry`, `awd`, `carbon-credits`, `environment`, `species`, `plantation`, `journey`, `gallery`, `news`, `contact`, `faq`, `privacy`, `terms`):
```javascript
CMS.heroes[pageKey] = {
  mode: "image", // "image" | "video"
  imageUrl: "",  // custom URL or base64 data URI; if empty, uses defaultFallbackImgKey
  videoUrl: "",  // custom URL or base64 data URI (mp4/webm)
  overlayOpacity: "0.75" // configurable 0.20 to 0.90
};
```

### 4.3 Rendering Logic
- If `mode === 'video'` and `videoUrl` is present:
  - Renders `<video autoplay loop muted playsinline poster="${posterUrl}" class="absolute inset-0 w-full h-full object-cover">`
  - Renders overlay `<div class="absolute inset-0 bg-gradient-to-b from-[#0b170f]/80 via-[#0e1c12]/70 to-[#0b170f]/90"></div>`
- If `mode === 'image'` (or video is absent):
  - Renders `<img src="${resolvedImgUrl}" alt="Hero" class="w-full h-full object-cover" />`
  - Renders overlay `<div class="absolute inset-0 bg-gradient-to-b from-[#0b170f]/80 via-[#0e1c12]/70 to-[#0b170f]/90"></div>`

---

## 5. Admin CMS Studio: Individual Save Buttons & UX Architecture

### 5.1 The Individual Save Button Pattern
To eliminate data loss and give clear user confidence, **every editable section card in the Admin Studio must have its own dedicated Save Button**.

#### Visual & Interactive State Machine:
1. **Idle State:**
   - Button text: `💾 Save Section Changes`
   - Class: `bg-[#54a630] hover:bg-[#468e26] text-white px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-sm flex items-center gap-1.5`
2. **Saving State (on click):**
   - Button text: `<span class="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full mr-1.5"></span> Saving...`
   - Class: `bg-yellow-600 text-white cursor-wait`
3. **Success State (after write to `localStorage`):**
   - Button text: `✓ Saved Successfully!`
   - Class: `bg-green-600 text-white shadow-md animate-pulse`
   - Duration: 2500ms before returning to Idle State.
   - Triggers a global toast popup: `showToast("✓ Section [Name] updated successfully!")`
4. **Error State (if storage full or invalid):**
   - Button text: `⚠️ Save Failed`
   - Class: `bg-red-600 text-white`

### 5.2 Helper Implementation:
```javascript
function saveCmsSection(sectionKey, buttonElement) {
  if (buttonElement) {
    buttonElement.disabled = true;
    buttonElement.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Saving...
    `;
    buttonElement.className = "bg-yellow-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5";
  }

  // Persist to localStorage
  saveCmsData();

  setTimeout(() => {
    if (buttonElement) {
      buttonElement.innerHTML = `✓ Saved!`;
      buttonElement.className = "bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5";
      showToast(`✓ Changes to ${sectionKey} saved successfully!`);
      setTimeout(() => {
        buttonElement.disabled = false;
        buttonElement.innerHTML = `💾 Save Changes`;
        buttonElement.className = "bg-[#54a630] hover:bg-[#468e26] text-white px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-sm flex items-center gap-1.5";
      }, 2500);
    }
  }, 400);
}
```

### 5.3 Universal Section Card Wrapper
Every section inside each CMS tab must be rendered inside a standardized container:
```html
<div class="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm space-y-4">
  <div class="flex items-center justify-between pb-3 border-b border-gray-100">
    <div>
      <h4 class="font-extrabold text-sm text-[#162219]">[Section Title]</h4>
      <p class="text-[11px] text-gray-500">[Section Description]</p>
    </div>
    <button type="button" onclick="saveCmsSection('[Section Name]', this)" class="bg-[#54a630] hover:bg-[#468e26] text-white px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-sm flex items-center gap-1.5">
      💾 Save Changes
    </button>
  </div>
  <!-- Form inputs here -->
</div>
```

---

## 6. Detailed Specifications by Page & Section

### 6.1 Home Page (`/`)
1. **Hero Section:**
   - Background: Dedicated `CMS.heroes.home` (image/video toggle).
   - Left Title: `CMS.home.heroTitle` (Default: "Growing Green. Empowering Farmers.")
   - Subtitle: `CMS.home.heroSubtitle`
   - Primary CTA: `CMS.home.ctaPrimary` ("Explore Solutions" → `/agroforestry/`)
   - Rating badge: "4.9 ★ 1,20,000+ enrolled farmers"
   - Right Feature Card 1: Authentic field video/photo with play overlay (`images/plantation-field-team-hd.jpg`).
   - Right Feature Card 2: Frosted dark card with `CMS.home.heroCardTitle` and `CMS.home.heroCardDesc`.
   - Bottom programme ticker: Agroforestry, Carbon Credits, AWD in Paddy, 8 Forest Species, 8 Fruit Species, AP • TG • KA.
2. **Impact at a Glance (From `home page.pdf`):**
   - 3 Stat counters: 1,20,000 (Agroforestry), 5,000 (AWD), 3 (States).
   - Dual Progress Bars:
     - Agroforestry Carbon Credits: 1,20,000 (Visual progress bar 95% green).
     - Alternate Wetting and Drying: 5,000 (Visual progress bar 25% green).
   - Where We Work Block: Andhra Pradesh, Telangana, Karnataka, Head office in Kurnool.
3. **Bento Showcase Grid:**
   - 4 Interactive cards with images: Agroforestry Plantations, Carbon Credit Programmes, AWD Water Conservation, Community Field Support.
4. **Discover the Journey (Story Section):**
   - Left: Photo `images/gallery/field-photos/field-activity-01.jpg` (authentic field activity).
   - Right: Headings, paragraphs, 3 checkmarked points, button to `/our-journey/`.
5. **Comprehensive Solutions (3 Cards):**
   - Card 1: Agroforestry & Tree Planting
   - Card 2: Alternate Wetting & Drying (AWD)
   - Card 3: Carbon Offsets & Ecology
6. **Plants We Promote (From `home page.pdf`):**
   - Forest Species tag pills: Teak, Melia dubia, Casuarina, Pongamia, Neem, Bamboo, Subabul, Red sanders.
   - Fruit Species tag pills: Mango, Guava, Sapota, Custard apple, Amla, Lemon, Coconut, Cashew.
7. **How We Work with Farmers (4 Steps):**
   - Step 1: Listen & Enrol
   - Step 2: Supply & Plant
   - Step 3: Implement & Monitor
   - Step 4: Verify & Reward
8. **News & Media Preview:**
   - 3 Newspaper clippings with authentic Telugu headlines and dates.
9. **Yellow Partnership CTA Banner (From `home page.pdf`):**
   - "Want to know how this could work for your land or organisation?"
   - Button: "Contact our team" (`/contact/`)

---

### 6.2 About Us (`/about/`)
1. **Hero Section:**
   - Background: `CMS.heroes.about` (image/video toggle).
   - Title: "About Sadana Green Society"
   - Subtitle: Full official mandate.
2. **Who We Are & Founder Feature (From `about us.pdf`):**
   - Left Column: Vertical Card with official SGS emblem, photo of **B. Raghu Bhaskar**, title "Founder and President", tagline "People • Plants • Prosperity".
   - Right Column: 3 detailed paragraphs on society registration, field teams, and community outreach.
   - Quote boxes: "Our mission" and "Our vision".
3. **Our Projects (8 Core Areas from `about us.pdf`):**
   - 8 Cards: 1) Agroforestry & New Plantations, 2) Existing Plantation Projects, 3) Carbon Credit Programmes, 4) Sustainable Agriculture, 5) Alternate Wetting and Drying (AWD), 6) Farmer Livelihood Enhancement, 7) Climate Change Mitigation, 8) Environmental Awareness.
   - Each card has custom image, title, and descriptive role.
4. **Partner With Us (From `about us.pdf`):**
   - Entity badges: CSR teams, Institutions, Technical partners, Development organisations, Community groups.
5. **Yellow Partnership CTA Banner.**

---

### 6.3 Agroforestry / Why Agroforestry (`/agroforestry/`)
1. **Hero Section:**
   - Background: `CMS.heroes.agroforestry`.
   - Title: "Why Agroforestry?"
   - Subtitle: "Growing trees with crops and livestock on the same land gives farmers more income, healthier soil, and a cooler, more resilient farm."
   - Stat: `1,20,000` farmers enrolled.
2. **What is Agroforestry? (From `why agriforect.pdf`):**
   - Comprehensive two-column breakdown of boundary, intercrop, and block planting.
3. **Benefits of Agroforestry (3 Columns from `why agriforect.pdf`):**
   - Column 1: For farmers (more than one source of income, lower risk, long-term assets).
   - Column 2: For soil and water (leaf litter, roots hold soil, shade & mulch, better infiltration).
   - Column 3: For climate and nature (carbon stored in trunks/roots, cooler microclimate, habitat for pollinators).
4. **Common Agroforestry Models (6 Cards from `why agriforect.pdf`):**
   - 1) Trees on bunds and boundaries
   - 2) Orchard with intercrops
   - 3) Block plantation
   - 4) Alley cropping
   - 5) Windbreaks and shelterbelts
   - 6) Trees with livestock
5. **Which Trees for Which Land Matrix (Table from `why agriforect.pdf`):**
   - Row 1: Dry and rainfed land → Custard apple, Amla, Neem, Pongamia
   - Row 2: Coastal and sandy land → Casuarina, Coconut, Cashew, Sapota
   - Row 3: Irrigated land with deep soil → Teak, Mango, Melia dubia, Bamboo, Lemon, Guava
   - Row 4: Poor, rocky or sloping land → Cashew, Pongamia, Custard apple, Red sanders
   - Row 5: Farm boundaries and bunds → Melia dubia, Bamboo, Neem, Subabul
6. **Direct Link Cards to 16 Species Catalog.**

---

### 6.4 AWD in Paddy (`/awd/`)
1. **Hero Section:**
   - Background: `CMS.heroes.awd`.
   - Title: "Alternate Wetting and Drying (AWD)"
   - Subtitle: "A simple way to grow paddy with less water and lower methane emissions."
   - Stat: `5,000` farmers enrolled.
2. **What is AWD? (From `AWD page.pdf`):**
   - Scientific explanation of perforated field pipe, aerating the root zone, reducing anaerobic methane bacteria.
3. **How AWD Works in the Field (4 Steps from `AWD page.pdf`):**
   - 1) Set up a water tube (perforated plastic pipe in soil)
   - 2) Flood, then let it dry
   - 3) Irrigate at the mark (15 cm below soil surface)
   - 4) Keep water at flowering
4. **Why Farmers and the Climate Gain (2 Columns from `AWD page.pdf`):**
   - For farmers: Less water per season, lower pumping electricity/diesel cost, yields maintained.
   - For environment: Lower methane emissions, groundwater conservation, canal water savings.
5. **Is AWD Right for My Field? (Callout from `AWD page.pdf`):**
   - Explanation of irrigation control requirement.
6. **AWD Project Payment Cycle (6 Steps Bilingual from `AWD page.pdf`):**
   - Header: Telugu explanation: "తెలుగు: AWD ప్రాజెక్ట్‌లో రైతు నమోదు నుంచి అర్హత నిర్ధారణ, కార్బన్ క్రెడిట్ ఆదాయం, రైతుకు చెల్లింపు వరకు దశలు."
   - Step 01: Farmer enrolment & consent (రైతుల వివరాలు, అర్హమైన పొలం, ప్రాజెక్ట్ నిబంధనలు, అంగీకారం నమోదు చేయబడుతుంది)
   - Step 02: Baseline survey & field records (బేస్‌లైన్ సర్వే, GPS/భూమి వివరాలు, అవసరమైన ఆధారాలు సేకరిస్తారు)
   - Step 03: AWD practice & monitoring (అంగీకరించిన నీటి నిర్వహణ పద్ధతులను పాటించి పంటకాలంలో రికార్డులు నిర్వహిస్తారు)
   - Step 04: Data review & verification (ప్రాజెక్టు నిబంధనల ప్రకారం డేటాను పరిశీలించి ధృవీకరిస్తారు)
   - Step 05: Credits issued and sold (అర్హతలు నెరవేరితే క్రెడిట్లు జారీ చేసి విక్రయించబడతాయి. మార్కెట్ ధర, సమయం మారవచ్చు)
   - Step 06: Payment to farmer (వచ్చిన మినహాయింపుల తర్వాత రైతు వాటాను లిఖితపూర్వక ఒప్పందం ప్రకారం చెల్లిస్తారు)
7. **Before Joining, Ask These 4 Questions (From `AWD page.pdf`):**
   - English & Telugu questions covering farmer's share calculation, deductions, payment schedule, and transparent credit statement.

---

### 6.5 Carbon Credits & Benefits (`/carbon-credits/`)
1. **Hero Section:**
   - Background: `CMS.heroes.carbon`.
   - Title: "Carbon Credits and Their Benefits"
   - Subtitle: "How planting trees and farming differently can earn carbon credits, and who gains when they do."
   - Stat: `1,20,000` farmers enrolled.
2. **What is a Carbon Credit? (From `carbon credits.pdf`):**
   - 1 credit = 1 tonne of carbon dioxide equivalent removed/reduced.
3. **Who Benefits (3 Columns from `carbon credits.pdf`):**
   - Farmers / Companies and partners / Environment and communities.
4. **Carbon Credit Journey & Price Cycle (7 Steps Bilingual from `carbon credits.pdf`):**
   - 01: Enrolment & consent (రైతు వివరాలు, భూమి రికార్డులు, అంగీకారం నమోదు చేస్తారు)
   - 02: Planting & practices (మొక్కలు పెంచడం లేదా అర్హమైన వ్యవసాయ పద్ధతులను పాటించడం)
   - 03: Monitoring & measurement (పొలం నమూనాలు, GPS సరిహద్దులు, ఆధారాలు సేకరిస్తారు)
   - 04: Independent verification (ప్రాజెక్టు ప్రమాణాల ప్రకారం ఫలితాలను ధృవీకరిస్తారు)
   - 05: Credits issued (అనుమతించిన ప్రమాణాల ప్రకారం క్రెడిట్లు జారీ అవుతాయి)
   - 06: Sale & price (ప్రాజెక్టు నాణ్యత, కొనుగోలుదారు, మార్కెట్ పరిస్థితులపై విక్రయ ధర ఆధారపడుతుంది)
   - 07: Farmer payment (సంతకం చేసిన ఒప్పందం ప్రకారం రైతు వాటాను లెక్కిస్తారు)
5. **How Can the Value Change Over Time? (Flowchart from `carbon credits.pdf`):**
   - Visual stages: Project start → Monitoring → Verification → Sale → Payment.

---

### 6.6 16 Species Directory (`/species/`)
1. **Forest Species (8 Trees from `forest species.pdf`):**
   - 1) Teak (టేకు - *Tectona grandis*)
   - 2) Melia dubia / Malabar Neem (మలబార్ వేప - *Melia dubia*)
   - 3) Casuarina (సరుగుడు - *Casuarina equisetifolia*)
   - 4) Pongamia (కానుగ - *Pongamia pinnata*)
   - 5) Neem (వేప - *Azadirachta indica*)
   - 6) Bamboo (వెదురు - *Bambusa / Dendrocalamus*)
   - 7) Subabul (సుబాబుల్ - *Leucaena leucocephala*)
   - 8) Red Sanders (ఎర్రచందనం - *Pterocarpus santalinus*)
2. **Fruit Species (8 Trees from `fruit species.pdf`):**
   - 9) Mango (మామిడి - *Mangifera indica*)
   - 10) Guava (జామ - *Psidium guajava*)
   - 11) Sapota (సపోటా - *Manilkara zapota*)
   - 12) Custard Apple (సీతాఫలం - *Annona squamosa*)
   - 13) Amla (ఉసిరి - *Phyllanthus emblica*)
   - 14) Lemon (నిమ్మ - *Citrus limon*)
   - 15) Coconut (కొబ్బరి - *Cocos nucifera*)
   - 16) Cashew (జీడిమామిడి - *Anacardium occidentale*)
   - *(Optional bonus cards: Pomegranate, Jamun, Sandalwood, Mahogany as selectable extras)*
3. **Card Structure:** Each card contains:
   - High-res plant image from `images/gallery/`
   - English Name, Telugu Name, Botanical Name
   - Category badge (Forest / Timber vs Fruit / Commercial)
   - "Best Fit Land"
   - "Maturity / Yield"
   - "Economic Uses" pills
   - "Farmer & Climate Benefits" bullet points
   - "Special Note / Advisory" warning box (e.g. Red Sanders Forest Dept guidelines)
   - "Request Saplings" button linking to `/new-plantation/`

---

### 6.7 Environment & Ecological Impact (`/environment/`)
1. **Hero Section:** `CMS.heroes.environment` (image/video toggle).
2. **6 Pillars of Environmental Recovery (From `Environtment.pdf`):**
   - 1) Climate Change Mitigation
   - 2) Trees and Biodiversity
   - 3) Soil Health
   - 4) Water Conservation
   - 5) Cooler Microclimate and Cleaner Air
   - 6) Community Awareness
3. **What Any Farmer Can Do (Checklist from `Environtment.pdf`):**
   - ✓ Plant trees on bunds, boundaries and unused corners
   - ✓ Choose a mix of fruit, timber and soil-building trees
   - ✓ Mulch the soil instead of leaving it bare
   - ✓ Avoid burning crop residue and use it as compost or mulch
   - ✓ Use AWD in paddy where irrigation can be controlled
   - ✓ Protect existing trees and water sources
4. **Climate Action You Can Measure Banner.**

---

### 6.8 New Plantation Application (`/new-plantation/`)
1. **Hero Section:** `CMS.heroes.plantation`.
2. **Eligibility Guidelines Card (From `new plantation application.pdf`):**
   - Ground rules, land eligibility, GPS verification requirement.
3. **Application Form Fields:**
   - Farmer Full Name *
   - Father / Husband / Guardian Name *
   - Mobile Number * (with 10-digit validation)
   - Alternate Mobile Number
   - State * (Dropdown: Andhra Pradesh, Telangana, Karnataka)
   - District *
   - Mandal / Taluk *
   - Village *
   - Full Land Address / Location *
   - Land Area in Acres *
   - Plantation Type * (Bund / Boundary, Block, Agroforestry Alley, Orchard)
   - Preferred Tree Species & Approximate Number
   - GPS Location capture button (`navigator.geolocation` integration)
   - Land Photo Upload (Camera / File Picker)
   - Water Facility Available for New Plantation? (Dropdown: Yes / No / Seasonal)
4. **Important Terms & Conditions / ముఖ్యమైన నిబంధనలు (From `new plantation application.pdf`):**
   - Full bilingual text in English and Telugu explaining the land verification cutoff (1 Jan 2014 to 2026), non-conversion of natural forests, water source requirements, and evidence sharing.
   - Checkbox 1: Terms acceptance declaration (English/Telugu).
   - Checkbox 2: Information accuracy & authorization to verify.
5. **Form Submission Behavior:**
   - Stores submission in `CMS.submissions.plantations` in `localStorage`.
   - Sends notification / creates downloadable JSON receipt.
   - Shows rich success modal with reference ID.

---

### 6.9 Contact Us (`/contact/`)
1. **Hero Section:** `CMS.heroes.contact`.
2. **"Get in Touch" Table (From `contact us.pdf`):**
   - Organisation: Sadana Green Society (Founder & President: B. Raghu Bhaskar)
   - Working States: Andhra Pradesh, Telangana, and Karnataka
   - Office: Near Nandyal Checkpost, Kurnool, Andhra Pradesh 518003
   - Phone: +91 99666 11855
   - WhatsApp: +91 99634 90444
   - Email: info@sadanagreensociety.com / raghubhaskar4@gmail.com
   - Website: sadanagreensociety.com
3. **Send an Enquiry Form:**
   - Name, Email, Interested in (Project partnership, Farmer enrolment, CSR collaboration, Sapling supply, Other), Message.
   - Primary action: "Open in my email app" (`mailto:` format with pre-filled subject and body) + store in Admin Inbox.

---

### 6.10 Bilingual FAQs (`/faq/`)
1. **7 Complete Bilingual FAQs from `faq.pdf`:**
   - 1. What is Sadana Green Society (SGS)? (సాధన గ్రీన్ సొసైటీ అంటే ఏమిటి?)
   - 2. What is agroforestry? (ఆగ్రోఫారెస్ట్రీ అంటే ఏమిటి?)
   - 3. What are carbon credit programmes? (కార్బన్ క్రెడిట్ కార్యక్రమాలు అంటే ఏమిటి?)
   - 4. When will farmers receive carbon credit payments? (రైతులకు కార్బన్ క్రెడిట్ చెల్లింపులు ఎప్పుడు వస్తాయి?)
   - 5. What is Alternate Wetting and Drying (AWD)? (AWD అంటే ఏమిటి?)
   - 6. Which states does SGS work in? (SGS ఏ రాష్ట్రాల్లో పనిచేస్తుంది?)
   - 7. How can I contact Sadana Green Society? (సాధన గ్రీన్ సొసైటీని ఎలా సంప్రదించాలి?)
2. **Interactive accordion with smooth toggle and search filter.**

---

### 6.11 News & Media (`/news/`)
1. **5 Verified Newspaper Clippings (From `new and media.pdf`):**
   - Clipping 1: మామిడి తోటల సాగుపై రైతులకు ప్రోత్సాహం (*Ghantaravam Daily*)
   - Clipping 2: వరిలో AWD విధానంతో భూగర్భ జలాల పరిరక్షణ (*Praja Shakti*)
   - Clipping 3: రైతులకు శాశ్వత ఆదాయ వనరుగా వ్యవసాయ అటవీకరణ (*Eenadu*)
   - Clipping 4: గ్రామాలలో పర్యావరణ చైతన్య సదస్సులు (*Sakshi*)
   - Clipping 5: 16 రకాల అటవీ, పండ్ల జాతుల విస్తరణ కార్యక్రమం (*Andhra Jyothi*)
2. **Modal high-resolution image zoom.**

---

### 6.12 Photo Gallery (`/gallery/`)
- 24 authentic high-res photos mapped from `assets/images/gallery/sgs-activity-01.jpg` through `24.jpeg` and `field-activity-01.jpg` through `24.jpg`.
- Category tabs: All, Field Operations, AWD in Paddy, Farmer Training, Carbon Verification, Community Outreach.

---

### 6.13 Legal Pages: Privacy Policy (`/privacy/`) & Terms of Service (`/terms/`)
- Both pages must have full legal copy regarding farmer data protection, land survey privacy, GPS coordinate storage, and carbon compliance.
- Every paragraph and clause must be editable directly in the Admin CMS under the "Legal" tab with its own Save button.

---

## 7. Complete Admin Studio Tabs Specification

The Admin Studio (`/admin/`) will feature 16 comprehensive management tabs in a left sidebar:

1. **Dashboard Overview:** Operational statistics, recent farmer plantation submissions, quick navigation links.
2. **Per-Page Hero Media:** Select any page from a dropdown or card list; configure Image vs. Video mode, paste URL or upload file, preview live thumbnail; **Individual Save Button**.
3. **Global Brand & Contact:** Society name, registration number (129/2021), founder details, official addresses, phone, WhatsApp, emails, logo replacer; **Individual Save Button**.
4. **Home Page Editor:** Hero texts, Bento cards, Impact numbers, Solutions cards, Steps items, Yellow CTA banner; **Individual Save Buttons per card**.
5. **About SGS Editor:** Hero texts, Founder quote & portrait, 8 Project cards (titles, descriptions, images), Partner badges; **Individual Save Buttons**.
6. **Agroforestry & Why Agroforestry:** Hero text, What is agroforestry, 3 Benefits columns, 6 Agroforestry Models cards, 5-row Land Suitability matrix; **Individual Save Buttons**.
7. **AWD & Water Conservation:** Hero text, 4 Field steps, Why gain columns, 6-step Payment Cycle (bilingual text), 4 Questions box; **Individual Save Buttons**.
8. **Carbon Credits Editor:** Hero text, What is carbon credit, 3 Benefit columns, 7-step Journey & Price cycle (bilingual text), Value change flowchart; **Individual Save Buttons**.
9. **Environment & Impact:** Hero text, 6 Ecological pillars, 6-point "What any farmer can do" checklist; **Individual Save Buttons**.
10. **16 Species Catalog Editor:** Full CRUD or in-place edit for all 16 species: English name, Telugu name, Botanical name, Soil fit, Maturity, Uses, Benefits, Notes, Photo upload/URL; **Individual Save Buttons per species**.
11. **Our Journey & Milestones:** Registration details, 5-year timeline (2021–2026) with Telugu translations and badges, 4 growth pillars; **Individual Save Buttons**.
12. **Plantation Application Editor:** Intro guidelines, terms & conditions text (English + Telugu), form settings; **Individual Save Button**.
13. **Farmer Submissions Inbox:** View, filter, and export all farmer plantation applications submitted through `/new-plantation/` (with farmer name, phone, land acres, GPS, and timestamp).
14. **News & Press Clippings:** Edit 5 newspaper clipping cards (Telugu title, English title, paper name, date, full body, clipping image); **Individual Save Buttons**.
15. **Bilingual FAQs Editor:** Edit English and Telugu question & answer pairs for all 7 FAQs, add new FAQ; **Individual Save Buttons**.
16. **Legal Pages & Backup/Reset:** Edit Privacy Policy and Terms of Service paragraphs; Export entire CMS to `.json` file; Import/Restore CMS from `.json` file; Reset to Factory Defaults.

---

## 8. File Structure & Build Strategy

To maintain maximum reliability, fast loading, and zero build tool friction, the site uses the established single-engine architecture where:
- `scratch/parts_cms_data.py`: Houses default CMS dictionary (all content, bilingual strings, species, news, FAQs, hero configs), state management, routing, and image resolution.
- `scratch/parts_renderers.py`: Houses all semantic HTML render functions (`renderHomePage`, `renderAboutPage`, `renderAgroforestryPage`, `renderAwdPage`, `renderCarbonCreditsPage`, `renderSpeciesCatalogPage`, `renderPlantationPage`, `renderEnvironmentPage`, `renderOurJourneyPage`, `renderContactPage`, `renderFaqPage`, `renderNewsPage`, `renderGalleryPage`, `renderPrivacyPage`, `renderTermsPage`).
- `scratch/parts_admin.py`: Houses the Admin Studio layout, login authentication, 16 tab workspaces, and the **Individual Save Button** handlers.
- `scratch/generate_upgraded_engine.py`: Combines the python parts into a production-ready `index.html` (~350KB), and propagates the HTML to each trailing-slash route folder (`about/index.html`, `agroforestry/index.html`, etc.) with `window.INITIAL_ROUTE` injected.

---

## 9. Priority Execution Checklist for Claude (Next Model)

1. [ ] **Step 1: Update CMS Data Store (`parts_cms_data.py`)**
   - Add all missing bilingual text from the 14 PDFs (AWD payment cycle, Carbon price cycle, 6 agroforestry models, 5-row land suitability matrix, 6-point farmer checklist).
   - Ensure all 16 species (Teak, Melia dubia, Casuarina, Pongamia, Neem, Bamboo, Subabul, Red sanders, Mango, Guava, Sapota, Custard apple, Amla, Lemon, Coconut, Cashew) have complete botanical names, Telugu script, and advice notes.
   - Add `CMS.heroes` object supporting independent hero image/video configuration for all 15 routes.
2. [ ] **Step 2: Update Page Renderers (`parts_renderers.py`)**
   - Update `renderHeroMediaLayer(pageKey, fallbackKey)` to read from `CMS.heroes[pageKey]`.
   - Restore the dual progress bar and "Where we work" stats on Home Page.
   - Build the 6-model grid and 5-row suitability matrix on Agroforestry Page.
   - Build the 6-step Payment Cycle and 4 Bilingual Questions on AWD Page.
   - Build the 7-step Journey & Price Cycle on Carbon Credits Page.
   - Build the 6-point Farmer Action Checklist on Environment Page.
   - Restore the full bilingual terms declaration on Plantation Page.
   - Restore the structured contact table on Contact Page.
   - Ensure the Yellow Partnership CTA banner is present across all content pages.
3. [ ] **Step 3: Update Admin Studio (`parts_admin.py`)**
   - Implement `saveCmsSection(sectionName, btnElement)` with interactive spinner and 2.5s green success state.
   - Add individual save buttons to every card across all 16 CMS tabs.
   - Implement the Per-Page Hero Media editor allowing image/video toggle, upload, and URL paste for each route.
   - Expose all new content blocks (Payment cycles, suitability matrix, legal pages, species notes) to the admin workspace.
4. [ ] **Step 4: Typography & Styling Polish**
   - Verify Google Font `<link>` imports `Rubik:ital,wght@0,300..800;1,300..800` and `Noto+Sans+Telugu:wght@400;600;700`.
   - Ensure Tailwind CSS classes or CSS rules apply `font-['Rubik',sans-serif]` universally, with `.telugu-text` mapped to `Noto Sans Telugu`.
5. [ ] **Step 5: Run Engine Generator & Deploy**
   - Execute `python scratch/generate_upgraded_engine.py` to regenerate `index.html` and all route copies.
   - Verify locally with `python -m http.server 8089`.
   - Push to GitHub repository `bRaghu9849/SGS` branch `main`.
   - Confirm GitHub Pages deployment at `https://braghu9849.github.io/SGS/`.

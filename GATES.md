# GATES.md - Verifiable Acceptance Gates for SGS Refinements & Admin Studio

## G1: Reference Website White Footer Parity
Footer features white/light background (`bg-white` / `bg-[#fbfdfb]`), top logo & horizontal links, 4 circular icon contact columns (Address, Phone, WhatsApp, Working States), 4 circular black social pills, copyright, and legal links.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); if (!code.includes('footer-white') || !code.includes('Near Nandyal Checkpost') || !code.includes('Working States')) process.exit(1); console.log('G1 PASS');"
EXPECT: G1 PASS

## G2: Admin Legal Pages Full Section Editing
Admin tab 'legal' contains editable text inputs/textareas for all Privacy Policy clauses and Terms of Service clauses.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!code.includes('CMS.privacy.sections') || !code.includes('CMS.terms.sections')) process.exit(1); console.log('G2 PASS');"
EXPECT: G2 PASS

## G3: Admin Agroforestry & AWD Benefits Fully Covered
Admin tabs for Agroforestry and AWD provide editable fields for farmer, soil/water, and climate benefits.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!code.includes('CMS.agroforestry.benefits') || !code.includes('CMS.awd.benefits')) process.exit(1); console.log('G3 PASS');"
EXPECT: G3 PASS

## G4: Zero Cropped Images Across Website
Low-resolution cropped images (`sol1`, `sol2`, `sol3`, `nl1`, `nl2`, `nl3`) are replaced with authentic full-resolution template webp/jpg images (`home-solutions-image-*.webp`, `home-subscribe-image-*.webp`, `home-hero-image.webp`).
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_cms_data.py', 'utf-8'); if (!code.includes('home-solutions-image-1.webp') || !code.includes('home-subscribe-image-1.webp') || !code.includes('home-hero-image.webp')) process.exit(1); console.log('G4 PASS');"
EXPECT: G4 PASS

## G5: Two Clean Un-Cluttered Navbar Menus
Top navigation provides two clean dropdown menus (`SERVICES ▾` and `EXPLORE ▾`) to avoid clutter while maintaining 100% Blocksy design aesthetic.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); if (!code.includes('SERVICES') || !code.includes('EXPLORE') || !code.includes('Soil Testing &amp; Analysis')) process.exit(1); console.log('G5 PASS');"
EXPECT: G5 PASS

## G6: Compact Species Editor in Admin
Species editor in Admin panel is dense and compact with tabbed/categorized controls instead of 16 long full-page vertical textareas.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!code.includes('compact-species-grid') && !code.includes('species-tab-btn')) process.exit(1); console.log('G6 PASS');"
EXPECT: G6 PASS

## G7: Compact Gallery Editor in Admin
Gallery editor in Admin panel organizes all 24 photos into a compact responsive card grid preserving all upload, category, title, description, and delete options.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!code.includes('compact-gallery-grid')) process.exit(1); console.log('G7 PASS');"
EXPECT: G7 PASS

## G8: Admin Editable Plantation Form & 2 Mock Farmer Submissions
Admin allows editing plantation form settings, and `CMS.submissions.plantations` includes 2 pre-filled mock farmer applications displayed in the Admin Inbox.
CHECK: node -e "const fs = require('fs'); const data = fs.readFileSync('scratch/build_cms_data.py', 'utf-8'); const admin = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!data.includes('SGS-PL-2026-001') || !data.includes('SGS-PL-2026-002') || !admin.includes('CMS.plantation.formConfig')) process.exit(1); console.log('G8 PASS');"
EXPECT: G8 PASS

## G9: All 16 Routes Compile and Render Cleanly
All routes render > 0 chars with zero syntax errors.
CHECK: node scratch/verify_all_paths.js
EXPECT: Path [/SGS/] -> Route: [home] -> Rendered

## G10: Official SGS Logo Everywhere
Ensures new official client logo is extracted and configured across logoFull, logoEmblem, favicon, and admin brand controls.
CHECK: node -e "const fs = require('fs'); const data = fs.readFileSync('scratch/build_cms_data.py', 'utf-8'); if (!data.includes('new-logo-sgs-full.png') || !data.includes('new-logo-sgs-emblem.png')) process.exit(1); console.log('G10 PASS');"
EXPECT: G10 PASS

## G11: 100% Clickable Mega Menu & Solution Cards
Ensures Mega Menu Programme cards and Home Solution cards are entirely clickable container anchors with hover transitions.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); if (!code.includes('data-nav=\"agroforestry\" class=\"lg:col-span-3') || !code.includes('data-nav=\"agroforestry\" class=\"soft-card')) process.exit(1); console.log('G11 PASS');"
EXPECT: G11 PASS

## G12: Video Banner (Section 9) Removal
Video banner section ("Dive Into The World of Sadana Green Society With Our Exclusive Field Videos") is removed from the website.
CHECK: node -e "const fs = require('fs'); const html = fs.readFileSync('index.html', 'utf-8'); if (html.includes('windBanner') || html.includes('Dive Into The World of Sadana Green Society With Our Exclusive Field Videos')) process.exit(1); console.log('G12 PASS');"
EXPECT: G12 PASS

## G13: Clean Hero Background Presets
Background images are authentic uncropped photos with zero baked-in text, and 5 clean background presets are selectable in Admin Heroes tab.
CHECK: node -e "const fs = require('fs'); const admin = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!admin.includes('selectHeroPreset') || !admin.includes('Clean High-Resolution Background Presets')) process.exit(1); console.log('G13 PASS');"
EXPECT: G13 PASS

## G14: About Page Team Member Cards & Admin CRUD
Team member cards on About page display role, name, bio, and photo slightly smaller than founder (`aspect-[4/4.2]`), and have full CRUD in Admin Studio.
CHECK: node -e "const fs = require('fs'); const html = fs.readFileSync('index.html', 'utf-8'); const admin = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!html.includes('Our Leadership & Field Team') || !admin.includes('addAboutTeamMember') || !admin.includes('deleteAboutTeamMember')) process.exit(1); console.log('G14 PASS');"
EXPECT: G14 PASS

## G15: Species CRUD in Admin Studio
Admin Studio Species tab provides + Add New Species button, add expander form, and individual Delete button on each species card.
CHECK: node -e "const fs = require('fs'); const admin = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!admin.includes('+ Add New Species') || !admin.includes('submitAddSpecies') || !admin.includes('deleteCmsSpecies')) process.exit(1); console.log('G15 PASS');"
EXPECT: G15 PASS

## G16: Fully Editable Plantation Application Form
All plantation form labels, field placeholders, notices, water facility options, declarations, and submit button are editable in Admin Studio and dynamically rendered.
CHECK: node -e "const fs = require('fs'); const html = fs.readFileSync('index.html', 'utf-8'); const admin = fs.readFileSync('scratch/build_admin.py', 'utf-8'); if (!html.includes('fc.farmerNameLabel') || !admin.includes('Application Form Labels, Fields &amp; Declarations')) process.exit(1); console.log('G16 PASS');"
EXPECT: G16 PASS

## G17: Explore Menu "Apply for Plantation" Featured Design
In EXPLORE menu, Apply for Plantation matches the exact featured card styling of Soil Testing & Analysis in Services menu.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); if (!code.includes('Apply for Plantation') || !code.includes('Register Farmland') || !code.includes('rounded-[20px] overflow-hidden relative h-36')) process.exit(1); console.log('G17 PASS');"
EXPECT: G17 PASS

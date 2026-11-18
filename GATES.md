# GATES.md - Quality & Acceptance Gates for SGS Refinements

## G1: Authentic Client Images in Gallery
Gallery default images gal1 through gal24 use real client-provided sgs-activity-*.jpg/jpeg images without screenshot crops.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_cms_data.py', 'utf-8'); if (!code.includes('sgs-activity-01.jpg') || !code.includes('sgs-activity-24.jpeg')) process.exit(1);"
EXPECT: PASS

## G2: Navbar Desktop Design Parity with Reference
Navbar features floating white rounded pill, logo emblem, links with mega menu, search button, and Get Started CTA with circular white arrow icon.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); if (!code.includes('Latest News &amp; Key Programmes') || !code.includes('Soil Testing &amp; Analysis')) process.exit(1); console.log('G2 PASS');"
EXPECT: G2 PASS

## G3: Mobile Navigation Drawer Parity with Reference
Mobile drawer matches reference screenshot with dark background, close button, bold nav links, Get Started pill CTA, and social icon pills.
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); if (!code.includes('mobile-drawer') || !code.includes('bg-[#0e1a12]')) process.exit(1);"
EXPECT: PASS

## G4: Species Cards Have No Images
Species directory cards have no image tags or placeholders per user explicit instruction ("no need of images in species").
CHECK: node -e "const fs = require('fs'); const code = fs.readFileSync('scratch/build_renderers.py', 'utf-8'); const start = code.indexOf('function renderSpeciesCatalogPage'); const end = code.indexOf('function renderAboutUsPage'); const slice = code.slice(start, end); if (slice.includes('<img data-cms-img=') || slice.includes('h-52 rounded-2xl overflow-hidden mb-5')) process.exit(1);"
EXPECT: PASS

## G5: All Routes Render Cleanly
All 16 clean-URL pages and admin routes compile and render with > 0 chars and no runtime errors.
CHECK: node scratch/verify_all_paths.js
EXPECT: Path [/SGS/] -> Route: [home] -> Rendered

# Acceptance Gates: Full Site & Admin Redesign

## G1: Zero Unicode Emojis Across Site & Admin
- CHECK: `node -e "const fs=require('fs'); for (const f of ['index.html','admin/index.html','dev/index.html']) { const t=fs.readFileSync(f,'utf8'); if(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(t.replace(/[★✓✕•]/g,''))) { console.error('Emoji in',f); process.exit(1); } } console.log('ZERO_EMOJIS_PASS');"`
- EXPECT: `ZERO_EMOJIS_PASS`

## G2: Font Size Reverted to Original
- CHECK: `node -e "const t=require('fs').readFileSync('index.html','utf8'); if(t.includes('Universal 18px Non-Heading Text Rule')) process.exit(1); console.log('FONT_REVERT_PASS');"`
- EXPECT: `FONT_REVERT_PASS`

## G3: Bento Hover Animation, No Play Buttons, No 2nd Hero Card, Compact Hero Gap, Button Consistency
- CHECK: `node -e "const t=require('fs').readFileSync('index.html','utf8'); if(t.includes('play-btn-overlay')) process.exit(1); if(!t.includes('group-hover:opacity-100')) process.exit(1); if(t.includes('SGS Carbon Farmer Review')||t.includes('AWD Field Verification')) process.exit(1); console.log('HERO_BENTO_PLAY_PASS');"`
- EXPECT: `HERO_BENTO_PLAY_PASS`

## G4: Species & Gallery Accordions + Our Journey in Explore + Selio Nav Transition
- CHECK: `node -e "const t=require('fs').readFileSync('index.html','utf8'); if(!t.includes('<details')) process.exit(1); if(!t.includes('Our Journey')||!t.includes('selio-mega-menu')) process.exit(1); console.log('ACCORDION_NAV_PASS');"`
- EXPECT: `ACCORDION_NAV_PASS`

## G5: Admin Redesign (No Dashboard/Heroes tabs, Collapsible Sidebar, Compact Species/Gallery Edit, Dynamic Form Fields)
- CHECK: `node -e "const t=require('fs').readFileSync('admin/index.html','utf8'); if(t.includes('data-tab=\"dashboard\"')||t.includes('data-tab=\"heroes\"')) process.exit(1); if(!t.includes('toggleAdminSidebar')||!t.includes('renderDynamicPlantationForm')||!t.includes('editingSpeciesId')||!t.includes('editingGalleryIdx')) process.exit(1); console.log('ADMIN_REDESIGN_PASS');"`
- EXPECT: `ADMIN_REDESIGN_PASS`

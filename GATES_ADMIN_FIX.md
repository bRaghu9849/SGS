# Redesign & Admin Bug-Free Gates (`GATES.md`)

- [ ] G1: `api/cms` GET & POST work cleanly and `saveCmsData()` persists every Admin edit to both `localStorage` and D1 without silent failures.
  CHECK: `node scratch/test_admin_edit_persistence.js`
  EXPECT: `ALL_ADMIN_EDITS_PERSISTED`

- [ ] G2: Every single Admin input across all 17 tabs safely escapes HTML (`escAttr`/`escHtml`), handles empty strings without reverting to defaults, and updates `CMS` + re-renders accurately.
  CHECK: `node scratch/test_admin_runtime.js`
  EXPECT: `After setCmsTab("about") while collapsed ws len:`

- [ ] G3: Discover the Journey section uses a clean `<details>` accordion for its lengthy text content, and Empowering section edits reflect both in Admin and on the public Home page.
  CHECK: `node scratch/test_discovery_and_empower.js`
  EXPECT: `DISCOVERY_ACCORDION_AND_EMPOWER_OK`

- [ ] G4: Zero emojis, valid JS syntax in all HTML files, and all security lock checks pass.
  CHECK: `node scratch/check_all_gates.js && node scratch/test_lock_and_admin_security.js`
  EXPECT: `ALL 8 LOCK & SECURITY AUDIT CHECKS PASSED`

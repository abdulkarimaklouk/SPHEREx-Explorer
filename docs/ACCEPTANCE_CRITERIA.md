# Acceptance Criteria — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Status**: Verification Quality Standards  
**Last Updated**: 2026-11-14  

---

## 1. Quality Gates & Definition of Done

A task is considered **Done** and acceptable only when all of the following conditions are met:
1. **Scope Adherence**: Only requested features are implemented. No unrequested capabilities or unauthorized dependencies are introduced.
2. **Scientific & Data Integrity**: All data and images are marked as MOCK. No simulated data is presented as real observation findings.
3. **Build Cleanliness**: `npm run build` succeeds with zero errors and zero warnings.
4. **Architectural Separation**: UI components do not query data files directly; business and timeline logic are isolated in services and hooks.
5. **Responsiveness & Usability**: Layout functions cleanly on mobile and desktop viewports without horizontal overflow or clipping.

---

## 2. Phase-by-Phase Acceptance Criteria

### Phase 1: Project Initialization
- [x] Vite React project initialized with clean JavaScript template.
- [x] Directory structure matches approved tree specification exactly.
- [x] `AGENTS.md` exists at repository root with all 14 mandatory operating rules.
- [x] All 10 documentation templates created under `docs/` with descriptive headings and unresolved items flagged.
- [x] Application builds cleanly (`npm run build`) without errors.
- [x] Zero unnecessary dependencies added (only React, Vite, ESLint dev tools).

### Phase 2: Mock Data & Providers
- [ ] Mock datasets strictly validate against `docs/DATA_SCHEMA.md`.
- [ ] Every target and observation record includes `"isMock": true`.
- [ ] Images referenced in datasets exist in `public/images/demo/`.
- [ ] Provider queries handle coordinate matches and boundary queries correctly.

### Phase 3 & 4: UI Components & Timeline Navigation
- [ ] **Coordinate Search**: Rejects RA $< 0^\circ$ or $\ge 360^\circ$ and Dec $< -90^\circ$ or $> +90^\circ$ with clear user guidance.
- [ ] **Sky Viewer**: Displays active epoch image; shows loading and error states appropriately; clearly displays current epoch index.
- [ ] **Timeline Navigation**:
  - Clicking "Next" advances to subsequent epoch; disabled on final epoch.
  - Clicking "Previous" returns to preceding epoch; disabled on initial epoch.
  - "Play/Pause" toggles automated forward stepping at the designated interval.
  - Scrubber slider directly navigates to the selected epoch index.
- [ ] **Observation Info**: Readout matches the active epoch's timestamp, spectral band, and coordinates accurately.
- [ ] **Disclaimer**: Persistent "MOCK DATA ONLY" banner remains visible across all views.

### Phase 5 & 6: Integration, Performance & Accessibility
- [ ] Keyboard navigation: All controls accessible via `Tab`, `Enter`, `Space`, and Arrow keys.
- [ ] Color contrast: Text meets WCAG AA standards (minimum contrast ratio of 4.5:1 against backgrounds).
- [ ] No console errors or memory leaks during prolonged timeline auto-playback.

---

## 3. Items Requiring Confirmation

> [!NOTE]
> 1. Confirmation of automated test runner requirements (e.g., Vitest) if automated unit testing is mandated in later phases [Requires Confirmation].

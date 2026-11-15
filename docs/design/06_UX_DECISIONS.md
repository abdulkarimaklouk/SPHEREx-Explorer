# 06 — UX Decisions & Design Review Records

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Phase**: Phase 3 — Dedicated UI/UX Design (TASK-301)
**Status**: Review Document (Proposals Awaiting Human Approval)
**Last Updated**: 2026-11-14

---

## 1. Overview & Decision Boundaries

This document separates the **pre-approved functional decisions** established in Phase 2 from the **new UX design proposals** developed in Phase 3.

In accordance with [ui-ux-standards.md](file:///C:/Users/Star/Desktop/nasa/.agents/rules/ui-ux-standards.md), no design proposal is treated as locked until formally reviewed and approved.

---

## 2. Part A: Approved Product Decisions (Immutable from Phase 2)

These technical decisions were formally accepted in [DECISIONS.md](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md) and govern the scope of the design:

| Decision ID | Summary of Approved Decision | Status | Reference |
| :--- | :--- | :---: | :--- |
| **ADR-001** | Decimal degrees used exclusively for RA and Dec inputs ($0 \le \text{RA} < 360$, $-90 \le \text{Dec} \le 90$). | **Accepted** | [ADR-001](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-001-coordinate-input-representation) |
| **ADR-002** | Live validation on blur/change; non-blocking alerts; search disabled on error. | **Accepted** | [ADR-002](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-002-coordinate-validation-rules) |
| **ADR-003** | Great-circle matching against per-target mock coverage; no universal 2.0° radius. | **Accepted** | [ADR-003](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-003-coordinate-matching-policy--field-resolution) |
| **ADR-005** | Strict separation: `observationService.js` (domain) vs `MockDataProvider.js` (adapter). | **Accepted** | [ADR-005](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-005-separation-of-domain-service-and-data-provider) |
| **ADR-006** | Application state owned by custom hook `useObservationExplorer.js` (no Context). | **Accepted** | [ADR-006](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-006-application-state-ownership-via-custom-hook) |
| **ADR-007** | Strictly ascending chronological UTC timestamps across all observations. | **Accepted** | [ADR-007](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-007-observation-chronological-ordering) |
| **ADR-008** | Automated playback steps at 1200ms default; **stops automatically** on observation 4 (no loop). | **Accepted** | [ADR-008](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-008-timeline-playback-end-of-sequence-behavior) |
| **ADR-009** | Layered data integrity: verified target facts vs synthetic observation records (`isMock: true`). | **Accepted** | [ADR-009](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-009-scientific-data-integrity-and-mock-provenance) |
| **ADR-011** | Dedicated UI/UX design phase must be approved before frontend coding starts. | **Accepted** | [ADR-011](file:///C:/Users/Star/Desktop/nasa/docs/DECISIONS.md#adr-011-dedicated-uiux-phase-separation) |

---

## 3. Part B: UX Design Proposals Requiring Human Approval

---

### UX-DEC-01: Adoption of "Observatory Field Desk" Visual Direction & Warm Technical Palette

- **Status**: **Proposed (Awaiting Approval)**
- **User Problem Solved**: Generic dark-mode SaaS dashboards look cheap, unscientific, and visually cluttered, reducing credibility for a NASA astrophysics challenge.
- **Proposed Solution**: Adopt the "Observatory Field Desk" aesthetic using Deep Graphite (`#11141a`), Warm Ivory typography (`#f5f4ef`), Signal Amber accents (`#e59324`), and Muted Sage catalog highlights (`#739481`), with crisp 1px borders and 2–4px micro-radii.
- **Impact on Usability**: Lowers eye fatigue during night-time exploration, provides clear visual anchors, and establishes high technical authority.
- **Impact on Image Visibility**: The solid matte graphite framing provides high optical contrast that makes astronomical images pop without color bleeding or distraction.
- **Accessibility Implications**: High contrast will be targeted between text, reticles, and dark backgrounds, to be formally verified during Design System specification (TASK-303).
- **Assumptions Requiring Approval**: The user approves moving away from electric blues/cyans to a warmer graphite/amber instrument palette.

---

### UX-DEC-02: Selection of "The Asymmetric Workbench" Desktop Layout

- **Status**: **Proposed (Awaiting Approval)**
- **User Problem Solved**: Horizontal multi-level layouts require continuous vertical scrolling and disconnect observation images from the timeline transport controls.
- **Proposed Solution**: Implement an asymmetric 3-zone console (Left: Targets & Coordinate Search, Center: Dominant Sky Viewport, Right: Target & Observation Metadata, Bottom: Timeline Scrubber).
- **Impact on Usability**: All critical interactive elements (target selection, search, observation image, metadata, and timeline) fit within a single non-scrolling desktop viewport ($100\text{vh}$).
- **Impact on Image Visibility**: Dedicates over **55% of the total viewport area** directly to the celestial image canvas.
- **Accessibility Implications**: Keyboard navigation follows a logical, predictable reading order: Header -> Target Rail -> Viewport -> Metadata Inspector -> Timeline Console.
- **Assumptions Requiring Approval**: The user approves a fixed-height desktop dashboard over a vertically scrollable multi-card layout.

---

### UX-DEC-03: Dual-Mode Target Navigation (Challenge Pills + Coordinate Inputs)

- **Status**: **Proposed (Awaiting Approval)**
- **User Problem Solved**: Users and evaluators need instant 1-click access to the five challenge objects without memorizing numerical coordinates, while still needing to test manual coordinate search.
- **Proposed Solution**: Place the five challenge targets as prominent vertical selector buttons in the Left Rail, positioned immediately above the decimal RA/Dec input fields.
- **Impact on Usability**: Allows instant switching between challenge targets while keeping custom search readily accessible in the same visual column.
- **Impact on Image Visibility**: Keeps controls docked in a compact 280px rail, reserving maximal space for the sky image.
- **Accessibility Implications**: Clearly separated interactive targets with visible focus rings and explicit ARIA labels.
- **Assumptions Requiring Approval**: Preselecting the first challenge target (Barnard's Star) on initial load is approved to prevent an empty, confusing first impression.

---

### UX-DEC-04: Coordinate Transparency Split-View in Metadata Inspector

- **Status**: **Proposed (Awaiting Approval)**
- **User Problem Solved**: Coordinate matching snaps user coordinates to an available field. Without transparent feedback, users believe the image was custom-centered on their input.
- **Proposed Solution**: In the right-rail metadata inspector, display a dedicated **Coordinate Transparency Block**:
  - `Requested Coordinates`: Numerical RA and Dec entered by the user.
  - `Field Center Coordinates`: Exact catalog center of the matched mock field.
  - `Angular Separation`: Angular distance $\Delta\theta$ between the two points.
  - `Coverage Status`: Visual confirmation (e.g., `Within Target Field Coverage`).
- **Impact on Usability**: Establishes complete scientific honesty; user immediately understands spatial coverage concepts.
- **Impact on Image Visibility**: Contained cleanly inside the right inspector rail without occluding the image canvas.
- **Accessibility Implications**: Presented in high-legibility tabular monospace typography.
- **Assumptions Requiring Approval**: The user approves displaying both coordinate pairs simultaneously whenever a matched field is active.

---

### UX-DEC-05: Discrete Stepped Scrubber with Stop-at-End Indicator

- **Status**: **Proposed (Awaiting Approval)**
- **User Problem Solved**: Continuous range sliders imply continuous time simulation, whereas SPHEREx Explorer presents four discrete observation frames across distinct dates.
- **Proposed Solution**: Implement a 4-position stepped timeline scrubber with discrete numerical notches ($1, 2, 3, 4$). When auto-play increments to position 4, display an amber badge: `Sequence Complete (Observation 4 of 4) — Playback Paused`.
- **Impact on Usability**: Matches user mental model of stepping through discrete telescope visits.
- **Impact on Image Visibility**: Bottom placement leaves the observation viewport unobstructed.
- **Accessibility Implications**: Supports `ArrowLeft` / `ArrowRight` stepping with `aria-valuemin="1"`, `aria-valuemax="4"`, and `aria-valuenow`.
- **Assumptions Requiring Approval**: The user approves discrete 4-step notches over a continuous fluid progress bar.

---

### UX-DEC-06: Mobile Reflow Architecture (Vertical Scientific Atlas)

- **Status**: **Proposed (Awaiting Approval)**
- **User Problem Solved**: Desktop 3-column layouts break and become unusable on mobile viewports (< 768px).
- **Proposed Solution**: Reflow into a vertical scientific atlas:
  1. Header with mock disclaimer.
  2. Horizontal scrolling chips for the five challenge targets.
  3. Square celestial image viewport.
  4. Sticky bottom timeline transport bar (large 48px touch targets).
  5. Expandable coordinate search & metadata inspector accordion below.
- **Impact on Usability**: Keeps observation image and timeline controls immediately accessible without horizontal overflow.
- **Impact on Image Visibility**: The image remains full-width on mobile screens.
- **Accessibility Implications**: Touch targets strictly obey $\ge 44\times 44\text{px}$ requirements.
- **Assumptions Requiring Approval**: The user approves horizontal scrolling target chips on mobile rather than a dropdown menu.

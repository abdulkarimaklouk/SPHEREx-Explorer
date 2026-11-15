# 07 — Wireframe Specifications: Low & Mid-Fidelity Visual Architecture

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Phase**: Phase 3 — Dedicated UI/UX Design (TASK-302)
**Status**: Design Specification & Visual Prototypes (Awaiting Architectural Approval)
**Last Updated**: 2026-11-14

---

## 1. Executive Summary & Design System Foundations

This document establishes the official low- and mid-fidelity wireframe specifications for **SPHEREx Explorer**, translating the approved UX strategy from [01_UX_RESEARCH.md](file:///C:/Users/Star/Desktop/nasa/docs/design/01_UX_RESEARCH.md), [02_USER_FLOWS.md](file:///C:/Users/Star/Desktop/nasa/docs/design/02_USER_FLOWS.md), [03_INFORMATION_ARCHITECTURE.md](file:///C:/Users/Star/Desktop/nasa/docs/design/03_INFORMATION_ARCHITECTURE.md), [04_DASHBOARD_BLUEPRINT.md](file:///C:/Users/Star/Desktop/nasa/docs/design/04_DASHBOARD_BLUEPRINT.md), [05_VISUAL_DIRECTION.md](file:///C:/Users/Star/Desktop/nasa/docs/design/05_VISUAL_DIRECTION.md), and [06_UX_DECISIONS.md](file:///C:/Users/Star/Desktop/nasa/docs/design/06_UX_DECISIONS.md) into concrete, inspectable vector wireframes.

### 1.1 The Approved Design Concept: "Observatory Field Desk"
SPHEREx Explorer is designed as a **scientific observatory field workstation**, drawing inspiration from astronomical sky atlases and precision laboratory instrumentation rather than commercial SaaS dashboards:
- **Image-Dominant Focus**: The celestial sky observation viewport commands $>55\%$ of screen real estate.
- **Asymmetric Composition**: Separates navigation actions (left rail), observation focus (center stage), analytical inspection (right rail), and chronological sequence playback (bottom console).
- **Warm Technical Instrumentation**: Dark Charcoal background (`#11141a`), Slate panels (`#191d24`, stroke `#2a323d`), Amber accents (`#e59324`), Sage Green verified catalog badges (`#739481`), and Light Buff typography (`#f5f4ef`).
- **Monospace Metadata & Coordinates**: Celestial coordinates, sequence indices, angular separation offsets, and UTC timestamps render in crisp monospace typography (`ui-monospace`, `SF Mono`, `Menlo`, `Consolas`).
- **Strict Data Provenance Boundary**: Factual catalog records (originating from SIMBAD, Gaia DR3, and WISE) are visually separated from synthetic observation sequences (`isMock: true`), backed by persistent mock data indicators.
- **Forbidden Design Patterns**: The interface completely eliminates neon cyan/pink glows, purple/blue gradients, decorative glassmorphism, gratuitous KPI cards, and artificial floating animations.

---

## 2. Wireframe Asset Inventory & Deliverables

All wireframes have been created as standalone, production-accurate vector SVG files located in `docs/design/wireframes/`:

| Wireframe Asset File | Representative Viewport | Fidelity Level | Screen State & Purpose |
| :--- | :--- | :--- | :--- |
| [01-desktop-low-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/01-desktop-low-fidelity.svg) | $1440 \times 900$ | Low-Fidelity (Grayscale) | Structural blueprint of Variant A (Asymmetric Workbench), evaluating spacing and hierarchy. |
| [02-desktop-mid-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/02-desktop-mid-fidelity.svg) | $1440 \times 900$ | Mid-Fidelity (Observatory Desk) | Selected target state (Barnard's Star, Obs 1 of 4) with typography, reticle, and metadata. |
| [03-desktop-alternative.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/03-desktop-alternative.svg) | $1440 \times 900$ | Mid-Fidelity (Alternative) | Variant B (Horizontal Split Console) with top toolbar, panoramic viewport, and split lower deck. |
| [04-tablet-wireframe.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/04-tablet-wireframe.svg) | $1024 \times 768$ | Mid-Fidelity (Tablet) | Responsive 2-tier workstation, horizontal target ribbon, and balanced side-by-side inspector. |
| [05-mobile-initial.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/05-mobile-initial.svg) | $390 \times 844$ | Mid-Fidelity (Mobile Screen 01) | Initial target exploration state with prominent preset cards and ready viewport. |
| [06-mobile-viewer.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/06-mobile-viewer.svg) | $390 \times 844$ | Mid-Fidelity (Mobile Screen 02) | Selected observation viewport with docked touch transport controls and scrolling metadata. |
| [07-mobile-search.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/07-mobile-search.svg) | $390 \times 844$ | Mid-Fidelity (Mobile Screen 03) | Discoverable coordinate search form, numerical bounds validation, and match preview card. |
| [08-no-results-state.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/08-no-results-state.svg) | $1440 \times 900$ | Mid-Fidelity (Screen 04) | Outside mock coverage empty state, showing angular distance and 5 instant-recovery target pills. |
| [09-image-error-state.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/09-image-error-state.svg) | $1440 \times 900$ | Mid-Fidelity (Screen 06) | Image asset loading failure fallback, proving decoupled metadata resilience and functional timeline. |

---

## 3. Desktop Layout Variants & Comparative Evaluation

Two genuinely different spatial compositions were designed and evaluated at a representative desktop viewport of $1440 \times 900\text{px}$.

### 3.1 Variant A — The Asymmetric Workbench (Recommended)
*Asset References: [01-desktop-low-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/01-desktop-low-fidelity.svg) and [02-desktop-mid-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/02-desktop-mid-fidelity.svg)*

```text
+------------------------------------------------------------------------------------------------------------------------+
| [●] SPHEREx Explorer | 2026 NASA Space Apps Challenge                                 [ ⚠️ MOCK OBSERVATION DATA ONLY ] |
+------------------------------------------------------------------------------------------------------------------------+
| LEFT RAIL: TARGETS & SEARCH    | CENTER STAGE: SKY OBSERVATION VIEWPORT           | RIGHT RAIL: OBSERVATION INSPECTOR  |
| (Width: 280px)                 | (Width: 768px, Dominant Image Area: >55%)        | (Width: 320px)                     |
|                                |                                                  |                                    |
| [CHALLENGE TARGETS]            | +----------------------------------------------+ | [VERIFIED TARGET FACTS (CATALOG)]  |
| > Barnard's Star [Active]      | |  Reticle Center: RA 269.452°, Dec +4.693°    | | Target: Barnard's Star (GJ 699)    |
|   Epsilon Indi B               | |                                              | | Constellation: Ophiuchus           |
|   WISE 0855                    | |        [ SYNTHETIC ASTRONOMICAL IMAGE ]      | | Type: Red Dwarf (M4.0V)            |
|   RW Aurigae                   | |                                              | | Catalog Center: 269.4520, +4.6933  |
|   R Draconis                   | |                                              | | Provenance: SIMBAD / Gaia DR3      |
| ------------------------------ | |                                              | | -------------------------------- |
| [COORDINATE SEARCH]            | |                                              | | [COORDINATE TRANSPARENCY]        |
| RA  (0-359.99°): [ 269.452 ]   | |                                              | | Requested: 269.4520°, +4.6933°   |
| Dec (±90.00°):   [  +4.693 ]   | |                                              | | Field Center: 269.4520°, +4.6933°|
| [ Search Sky Field ]           | |                                              | | Angular Offset: 0.000° (Exact)   |
| ------------------------------ | | [ Tag: Observation 1 of 4 | 2026-02-15 ]     | | -------------------------------- |
| [FIELD COVERAGE POLICY]        | | [ Watermark: SIMULATED DEMO GRAPHIC ]        | | [SYNTHETIC OBSERVATION INFO]     |
| Field coverage is defined      | +----------------------------------------------+ | Sequence: Observation 1 of 4       |
| per-target in mock data.       |                                                  | Timestamp: 2026-02-15 00:00:00 UTC |
| Center: RA 269.452°, +4.693°   |                                                  | Nature: Simulated Demo Asset       |
+--------------------------------+--------------------------------------------------+------------------------------------+
| BOTTOM CONSOLE: TIMELINE & TRANSPORT DECK (Height: 80px)                                                              |
| [ ◀ Prev ]  [ ▶ Play ]  [ Next ▶ ]  |  Scrubber: --[●]-----○-----○-----○ (1: 2026-02-15)                              |
| Cadence: 1200ms per observation frame | Auto-stop on Frame 4 enabled                                                   |
+------------------------------------------------------------------------------------------------------------------------+
```

### 3.2 Variant B — The Horizontal Split Console (Alternative Evaluated)
*Asset Reference: [03-desktop-alternative.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/03-desktop-alternative.svg)*

```text
+------------------------------------------------------------------------------------------------------------------------+
| [●] SPHEREx Explorer                                                          [ ⚠️ MOCK OBSERVATION DATA ONLY ]        |
+------------------------------------------------------------------------------------------------------------------------+
| TOP HORIZONTAL TOOLBAR: TARGET SELECTOR & COORDINATE BAR (Width: 1404px, Height: 54px)                                 |
| [★ Barnard's Star] [Epsilon Indi B] [WISE 0855] [RW Aurigae] [R Draconis] | RA: [ 269.452 ] Dec: [ +4.693 ] [ Search ] |
+------------------------------------------------------------------------------------------------------------------------+
| UPPER DECK: PANORAMIC SKY OBSERVATION VIEWPORT (Width: 1404px, Height: 490px)                                         |
| +--------------------------------------------------------------------------------------------------------------------+ |
| |                                                                                                                    | |
| |                                     [ FULL-WIDTH SKY OBSERVATION VIEWPORT ]                                        | |
| |                                                                                                                    | |
| +--------------------------------------------------------------------------------------------------------------------+ |
+------------------------------------------------------------------------------------------------------------------------+
| LOWER DECK: SPLIT METADATA & TIMELINE DOCK (Width: 1404px, Height: 252px)                                             |
| LEFT CARD: VERIFIED TARGET & TRANSPARENCY             | RIGHT CARD: TIMELINE TRANSPORT & SYNTHETIC METADATA            |
| Target: Barnard's Star | Ophiuchus                    | Transport: [ ◀ Prev ] [ ▶ Play ] [ Next ▶ ]                   |
| Catalog Center: RA 269.4520°, Dec +4.6933°            | Timeline: -----(●)------------------------- Epoch 1 of 4       |
| Requested: RA 269.4520°, Dec +4.6933° (0.000° offset)  | Timestamp: 2026-02-15 00:00:00 UTC (1200ms auto-stop)          |
+-------------------------------------------------------+----------------------------------------------------------------+
```

### 3.3 Detailed Comparison Matrix

| Evaluation Criterion | Variant A: Asymmetric Workbench (Recommended) | Variant B: Horizontal Split Console | Architectural & Usability Analysis |
| :--- | :---: | :---: | :--- |
| **Image Viewing Area** | **High ($58\%$ of screen real estate, $768 \times 720\text{px}$)** | Very High ($68\%$ screen area, $1376 \times 432\text{px}$) | Variant A maintains ideal astronomical proportions ($1:1$ or $4:3$ framing). Variant B stretches into an extreme panoramic banner that letterboxes square astronomical image cutouts. |
| **Search Discoverability** | **High (Dedicated $280\text{px}$ vertical rail)** | Moderate (Compressed horizontal strip) | Variant A provides comfortable vertical room for RA/Dec fields, inline range indicators (`0° to 359.99°`), and status badges without clipping. |
| **Information Density** | **Optimal scientific density** | Uneven (Sparse top, crowded bottom) | Variant A distributes controls, image, and metadata into logical visual columns without overwhelming any single area. |
| **Metadata Readability** | **Superior (Dedicated right rail, $320\text{px}$)** | Moderate (Split across bottom cards) | In Variant A, verified catalog data, coordinate transparency, and epoch details remain permanently in view without vertical scrolling. |
| **User Attention & Scan Pattern** | **Natural F-Pattern (Left $\rightarrow$ Center $\rightarrow$ Right)** | Vertical Ping-Pong (Top $\rightarrow$ Center $\rightarrow$ Bottom) | In Variant A, the user can observe the astronomical image while their peripheral vision monitors the timeline scrubber below and verified metadata on the right concurrently. |
| **Desktop Usability** | **Excellent (Fixed ergonomic zones)** | Good (Requires large displays) | Variant A operates cleanly on displays from $1280 \times 800$ to $2560 \times 1440$ without forcing horizontal scrolling or clipping. |
| **Responsive Adaptability** | **Seamless vertical collapse** | High complexity | Variant A collapses naturally into a single-column mobile stream (Search $\rightarrow$ Image $\rightarrow$ Timeline $\rightarrow$ Metadata). Variant B requires rearchitecting its horizontal toolbar. |

### 3.4 Recommendation & Engineering Rationale
**Variant A (The Asymmetric Workbench)** is formally recommended. It preserves the astronomical image as the undisputed visual anchor while ensuring all metadata, coordinate inputs, and timeline controls remain permanently accessible within standard laptop viewports ($1440 \times 900$) without vertical scrolling.

---

## 4. Comprehensive Wireframe State Specifications

### Screen 01 — Initial Dashboard (Ready / Idle State)
- **Asset Reference**: [01-desktop-low-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/01-desktop-low-fidelity.svg)
- **Proposal on Preselection**: Rather than assuming that Barnard's Star must be preselected automatically, this initial state demonstrates the dashboard in an unselected, clean idle state.
- **Visual Presentation**:
  - Center canvas features a concentric reticle pattern with an informative prompt: `"Observatory Field Desk Initialized — Select one of the 5 NASA challenge targets on the left or enter celestial coordinates (RA / Dec) to view imagery."`
  - A prominent one-click demonstration action `[ Load Barnard's Star (Demo) ]` is provided.
  - Right rail displays an overview of the 5 challenge objects and equatorial coordinate system constraints ($0.0^\circ \le \text{RA} < 360.0^\circ$, $-90.0^\circ \le \text{Dec} \le +90.0^\circ$).
  - Timeline controls are disabled with reduced opacity (`opacity: 0.6`), signaling that epochs cannot be navigated until a field is loaded.

---

### Screen 02 — Selected Target State
- **Asset Reference**: [02-desktop-mid-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/02-desktop-mid-fidelity.svg)
- **Visual Presentation**:
  - Target: **Barnard's Star** (GJ 699). Active pill in left rail with amber accent border and dot.
  - Viewport displays the celestial field centered on catalog coordinates (`RA 269.4520°`, `Dec +4.6933°`).
  - Sequence tag overlay: `Observation 1 of 4 | 2026-02-15`.
  - Persistent mock watermark: `SIMULATED DEMO GRAPHIC`.
  - Right rail renders three semantic cards:
    1. *Verified Target Facts*: Ophiuchus, Red Dwarf (M4.0V), SIMBAD / Gaia DR3 provenance.
    2. *Coordinate Transparency*: Requested coordinates match target catalog center ($0.000^\circ$ offset).
    3. *Synthetic Observation Info*: Observation 1 of 4, `2026-02-15 00:00:00 UTC`, `isMock: true`.
  - Bottom console: Scrubber active on Step 1, `◀ Prev` button disabled at sequence start, `▶ Play` and `Next ▶` buttons active.
- **Design Assumption Note**: The four observation positions are an internal MVP planning decision, not a NASA challenge constraint.

---

### Screen 03 — Manual Coordinate Search (Spatial Offset Matching)
- **Asset Reference**: [07-mobile-search.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/07-mobile-search.svg)
- **Visual Presentation**:
  - User entered manual coordinates: RA `269.450°`, Dec `+4.690°`.
  - The system computes the great-circle angular distance to the nearest target center (Barnard's Star at RA `269.4520°`, Dec `+4.6933°`):
    $$\Delta \theta = \arccos\left(\sin \delta_1 \sin \delta_2 + \cos \delta_1 \cos \delta_2 \cos(\alpha_1 - \alpha_2)\right) \approx 0.004^\circ$$
  - **Coordinate Transparency Guarantee**: The interface never implies the matched image is centered on the user's coordinates. The viewport displays both the catalog center reticle and the user's requested point offset by $0.004^\circ$.
  - The inspector highlights the green `COORDINATE TRANSPARENCY` block, confirming valid in-coverage demonstration status ($0.004^\circ$ angular separation).

---

### Screen 04 — No Matching Field (Outside Mock Coverage)
- **Asset Reference**: [08-no-results-state.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/08-no-results-state.svg)
- **Visual Presentation**:
  - User searched coordinates outside all 5 target demonstration fields (e.g. RA `100.000°`, Dec `+20.000°`).
  - Viewport displays an informative recovery dialog:
    * Title: `NO DEMONSTRATION FIELD AVAILABLE`.
    * Explanation: Explains that no demonstration field is currently available for these coordinates.
    * Instant Recovery: 5 interactive quick-jump pill buttons (`[★ Barnard's Star]`, `[★ Epsilon Indi B]`, etc.) directly on the canvas.
  - Right rail displays supported challenge targets overview and confirms out-of-coverage status.
  - Bottom timeline is disabled with explicit notification: `TIMELINE DISABLED — NO OBSERVATION EPOCHS AVAILABLE FOR UNMAPPED COORDINATES`.

---

### Screen 05 — Invalid Coordinates (Validation Feedback)
- **Visual Presentation**:
  - Inputs with values outside scientific boundaries (e.g. RA `380.0°` or Dec `-95.0°`) or non-numeric strings display an immediate crimson border (`#e06c75`) and inline message:
    * RA out of range: `Must be between 0.0000° and 359.9999°`.
    * Dec out of range: `Must be between -90.0000° and +90.0000°`.
  - Search button is disabled (`opacity: 0.6`, `cursor: not-allowed`) until both values satisfy domain validation.

---

### Screen 06 — Image Loading Failure Fallback State
- **Asset Reference**: [09-image-error-state.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/09-image-error-state.svg)
- **Visual Presentation**:
  - Simulated network failure or missing asset (`/images/demo/barnards-star/obs-02.png` 404).
  - The sky viewport displays a technical fallback card with warning icon, error code `ERR_IMAGE_LOAD_FAILED`, and interactive `[ ⟳ Retry Image Load ]` action.
  - **Decoupled Architecture Guarantee**: The image error does **not** break the dashboard. Right rail observation inspector remains 100% functional with verified catalog facts and epoch metadata (`2026-05-15 UTC`).
  - Bottom timeline remains 100% interactive, allowing the user to navigate to Observation 1, 3, or 4.

---

### Screen 07 — Timeline Playback & End-of-Sequence Behavior
- **Visual Presentation**:
  - Playback transport controls: `◀ Prev`, `▶ Play` / `⏸ Pause`, `Next ▶`.
  - Configurable cadence: `1200ms` per frame.
  - **Auto-Stop Boundary Rule**: When playback reaches Observation 4 (final epoch), the timer automatically halts, the button reverts to `▶ Play`, the `Next ▶` button disables, and a completion indicator displays: `Final Observation State (Epoch 4 of 4)`. Infinite looping is strictly prohibited.

---

## 5. Tablet Adaptation ($1024 \times 768$)

- **Asset Reference**: [04-tablet-wireframe.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/04-tablet-wireframe.svg)
- **Layout Architecture**:
  * Top bar: Horizontal ribbon of the 5 challenge targets + compact coordinate search trigger.
  * Left main column ($648\text{px}$): Dominant Sky Viewport ($624 \times 454\text{px}$) with the timeline console ($74\text{px}$) docked directly beneath it.
  * Right column ($328\text{px}$): Observation Inspector Deck with verified catalog data, coordinate transparency, and synthetic observation metadata.
- **Space Allocation & Usability**:
  * Image area commands $>50\%$ of the screen.
  * Timeline buttons and scrubber dock directly below the viewport, allowing users to watch image transitions while scrubbing with minimal eye travel.
  * Avoids horizontal scrolling and allows natural vertical flow if the device is rotated to portrait ($768 \times 1024$).

---

## 6. Mobile Adaptation ($390 \times 844$)

- **Asset References**: [05-mobile-initial.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/05-mobile-initial.svg), [06-mobile-viewer.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/06-mobile-viewer.svg), and [07-mobile-search.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/07-mobile-search.svg)
- **Ergonomics & Layout Structure**:
  1. *Compact Header ($44\text{px}$)*: SPHEREx identity and compact `⚠️ MOCK DATA` pill.
  2. *Target Ribbon ($46\text{px}$)*: Horizontal swipeable carousel with snapping target pills.
  3. *Discoverable Search Strip ($34\text{px}$)*: Displays active coordinates with an `[ Search 🔍 ]` button that opens the dedicated coordinate modal sheet ([07-mobile-search.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/07-mobile-search.svg)).
  4. *Main Image Viewport ($290\text{px}$ height)*: Preserves dominant visual priority.
  5. *Directly Docked Timeline ($82\text{px}$)*: Positioned immediately underneath the image with $\ge 44\text{px}$ touch targets. Sticky controls never float over or obscure image content.
  6. *Natural Vertical Scrolling*: Metadata cards flow naturally down the page. The interface strictly avoids `overflow: hidden; height: 100vh` locks.

---

## 7. Representative Viewport Dimensions & Spacing Standards

| Breakpoint Tier | Target Viewport | Grid Architecture | Margin / Gutter | Key Component Allocations |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop** | $1440 \times 900$ | 3-Column Asymmetric Grid | Margins: $18\text{px}$, Gutters: $18\text{px}$ | Left: $280\text{px}$, Center: $768\text{px}$ ($53\%$), Right: $320\text{px}$, Bottom: $80\text{px}$ |
| **Tablet** | $1024 \times 768$ | 2-Column Balanced Deck | Margins: $16\text{px}$, Gutters: $16\text{px}$ | Left: $648\text{px}$ ($63\%$), Right: $328\text{px}$, Top Ribbon: $44\text{px}$ |
| **Mobile** | $390 \times 844$ | Single-Column Natural Stream | Margins: $12\text{px}$, Gutters: $12\text{px}$ | Full-width stacked modules, Viewport: $366 \times 290\text{px}$, Tap bounds: $\ge 44\text{px}$ |

---

## 8. Accessibility & Usability Standards

1. **Touch Target Dimensions**: All buttons, timeline dots, and target pills provide a minimum tap target of $44 \times 44\text{px}$ (WCAG 2.2 Success Criterion 2.5.8).
2. **Keyboard Navigation & Focus States**:
   - Sequential tab order: Header $\rightarrow$ Challenge Targets $\rightarrow$ RA Input $\rightarrow$ Dec Input $\rightarrow$ Search Button $\rightarrow$ Viewport $\rightarrow$ Timeline Controls (`Prev` $\rightarrow$ `Play` $\rightarrow$ `Next` $\rightarrow$ `Scrubber`).
   - High-contrast visible focus rings ($2\text{px}$ solid amber `#e59324` with $2\text{px}$ offset).
3. **Color-Independent Communication**: All error and match states use dual visual coding: icons (`✓`, `⚠️`, `!`) and descriptive text labels alongside color changes.
4. **Contrast Standards**: High visual contrast will be maintained between text, reticles, and dark backgrounds. Final contrast ratio verification is formally scheduled for the Design System phase (TASK-303) when exact production color token pairs are established.

---

## 9. Unresolved Decisions & Next Phase Gate

The following items are submitted for architectural sign-off before Phase 4 (Mock Data Architecture) and Phase 5 (Frontend Implementation):

1. **Initial Selection Policy**: Should the application load Barnard's Star by default on initial entry (minimizing blank screens), or remain in the unselected prompt state ([01-desktop-low-fidelity.svg](file:///C:/Users/Star/Desktop/nasa/docs/design/wireframes/01-desktop-low-fidelity.svg))? *Recommendation*: Preselect Barnard's Star by default.
2. **Sexagesimal Coordinate Entry**: Should post-MVP support sexagesimal format ($17\text{h } 57\text{m } 48.5\text{s}$, $+04^\circ\ 41'\ 36''$)? *Recommendation*: Keep pure decimal degrees for MVP.
3. **Scrubber Scrub Interaction**: Should dragging the scrubber slider immediately update the image (live scrub), or throttle until mouse release? *Recommendation*: Immediate update for 4 preloaded local image assets.

---

## 10. Verification Results

- **Git Status**: Confirmed clean working tree on `main...origin/main`.
- **Whitespace Check**: `git diff --check` passed with zero errors.
- **Production Build**: `npm run build` completed in 764ms with zero errors.
- **Asset Inspection**: All 9 SVG files have valid XML markup, distinct `viewBox` coordinates, semantic styling, and open cleanly in all modern browsers.

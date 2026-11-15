# 04 — Dashboard Layout Blueprint & Responsive Architecture

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Phase**: Phase 3 — Dedicated UI/UX Design (TASK-301)
**Status**: Architecture Blueprint (Awaiting Review & Approval)
**Last Updated**: 2026-11-14

---

## 1. Executive Layout Strategy

The interface of SPHEREx Explorer is designed to evoke a **professional scientific workstation ("Observatory Field Desk")**, avoiding the generic look of SaaS admin dashboards.

### Core Layout Mandates:
1. **The Sky Image is King**: The celestial observation viewport must command the primary visual weight and central position of the viewport.
2. **Asymmetric Balance**: Asymmetry provides clear visual hierarchy, separating navigation actions (left), observation focus (center), analytical inspection (right), and temporal sequence control (bottom).
3. **No Fluff or Decorative Cards**: Eliminate floating cards with excessive dropshadows, gratuitous padding, or fake statistical metric tiles.

---

## 2. Layout Exploration: Two Genuinely Different Approaches

To make an evidence-based architectural decision, we explore two genuinely distinct layout compositions before presenting our formal recommendation.

### 2.1 Approach 1: "The Asymmetric Workbench" (Recommended)

In this approach, the interface functions as a dedicated three-zone workstation flanked by an action rail on the left, a central dominant observation canvas, an inspection panel on the right, and a grounded timeline deck along the base.

```text
+------------------------------------------------------------------------------------------------------------------------+
| [LOGO] SPHEREx Explorer | 2026 NASA Space Apps Challenge                              [ ⚠️ MOCK OBSERVATION DATA ONLY ] |
+------------------------------------------------------------------------------------------------------------------------+
| LEFT RAIL: TARGET & SEARCH     | CENTER STAGE: OBSERVATION VIEWPORT               | RIGHT RAIL: METADATA INSPECTOR     |
| (Width: ~280px)                | (Width: Flexible Flex-1)                         | (Width: ~320px)                    |
|                                |                                                  |                                    |
| [CHALLENGE TARGETS]            | +----------------------------------------------+ | [VERIFIED TARGET IDENTITY]         |
| > Barnard's Star [Active]      | |                                              | | Target: Barnard's Star             |
|   Epsilon Indi B               | |                                              | | Constellation: Ophiuchus           |
|   WISE 0855                    | |        [ SYNTHETIC SKY IMAGE VIEWPORT ]      | | Type: M4.0V Red Dwarf              |
|   RW Aurigae                   | |        (Preserves 1:1 or 4:3 Aspect Ratio)   | | Catalog: Gaia DR3 / SIMBAD         |
|   R Draconis                   | |                                              | | Center: RA 269.452°, Dec +4.693°   |
|                                | |                                              | | -------------------------------- |
| [COORDINATE SEARCH]            | |                                              | | [COORDINATE TRANSPARENCY]        |
| RA  (0 - 360°): [ 269.45   ]   | |                                              | | Requested: RA 269.450, Dec +4.690|
| Dec (±90°):     [  +4.69   ]   | |                                              | | Field Center: RA 269.452, +4.693 |
| [ Search Sky Field ]           | |                                              | | Offset: 0.004° (Within Coverage) |
|                                | |                                              | | -------------------------------- |
| [STATUS / GUIDE]               | | [ Overlay Tag: Observation 1 of 4 | MOCK ]   | | [SYNTHETIC OBSERVATION INFO]     |
| Showing field coverage for     | +----------------------------------------------+ | Epoch: Observation 1 of 4          |
| target: Barnard's Star         |                                                  | Time: 2026-02-15 00:00:00 UTC      |
|                                |                                                  | Nature: Simulated Demonstration    |
+--------------------------------+--------------------------------------------------+------------------------------------+
| BOTTOM CONSOLE: TIMELINE & TRANSPORT CONTROLS (Height: ~84px)                                                         |
| [ ◀ Previous ]  [ ▶ Play ]  [ Next ▶ ]   |   Scrubber: ---[●]--------------------------------- (Obs 1 of 4)            |
| Playback Pace: 1200ms per observation frame | Auto-stop on Frame 4 enabled                                             |
+------------------------------------------------------------------------------------------------------------------------+
```

---

### 2.2 Approach 2: "The Horizontal Split Console" (Alternative)

In this alternative approach, the screen is split horizontally into a massive top observation deck and a lower split analytical console.

```text
+------------------------------------------------------------------------------------------------------------------------+
| [LOGO] SPHEREx Explorer                                                       [ ⚠️ MOCK OBSERVATION DATA ONLY ]        |
+------------------------------------------------------------------------------------------------------------------------+
| TOP TOOLBAR: TARGETS & SEARCH BAR                                                                                      |
| [ Barnard's Star ] [ Epsilon Indi B ] [ WISE 0855 ] [ RW Aurigae ] [ R Draconis ] | RA: [ 269.45 ] Dec: [ +4.69 ] [Search] |
+------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                        |
| UPPER DECK: PANORAMIC OBSERVATION VIEWPORT (Large Centered Sky Frame)                                                  |
| +--------------------------------------------------------------------------------------------------------------------+ |
| |                                                                                                                    | |
| |                                     [ FULL-WIDTH SKY OBSERVATION VIEWPORT ]                                        | |
| |                                                                                                                    | |
| +--------------------------------------------------------------------------------------------------------------------+ |
|                                                                                                                        |
+------------------------------------------------------------------------------------------------------------------------+
| LOWER DECK: SPLIT METADATA & TIMELINE DOCK                                                                             |
| LEFT CARD: VERIFIED TARGET & TRANSPARENCY             | RIGHT CARD: TIMELINE TRANSPORT & SYNTHETIC METADATA            |
| Target: Barnard's Star | Ophiuchus                    | Transport: [ ◀ Prev ] [ ▶ Play ] [ Next ▶ ]                   |
| Catalog Center: RA 269.452°, Dec +4.693°              | Timeline: -----(●)------------------------- Epoch 1 of 4       |
| Requested: RA 269.450°, Dec +4.690° (0.004° offset)   | Timestamp: 2026-02-15 00:00:00 UTC (1200ms auto-stop)          |
+-------------------------------------------------------+----------------------------------------------------------------+
```

---

## 3. Trade-Off Evaluation & Layout Comparison Matrix

| Evaluation Criterion | Approach 1: Asymmetric Workbench | Approach 2: Horizontal Split Console | Justification & Architectural Impact |
| :--- | :---: | :---: | :--- |
| **Astronomical Image Focus** | **High (55–60% screen area)** | Very High (65% screen area) | Approach 1 gives ideal balanced proportions; Approach 2 risks compressing the metadata card on smaller laptop displays. |
| **Simultaneous Eye Tracking** | **Superior** | Moderate | In Approach 1, the user can observe the sky image while their peripheral vision tracks the timeline scrubber below and metadata on the right simultaneously without vertical scrolling. |
| **Coordinate Input Ergonomics** | **High** | Moderate | Left rail provides comfortable vertical breathing room for RA, Dec, inline validation alerts, and challenge target pills. Approach 2 packs them into an uncomfortably cramped horizontal bar. |
| **Coordinate Transparency Clarity**| **High** | Moderate | Dedicated right-rail panel allows clear side-by-side comparison of Requested Coordinates vs Target Center Coordinates. |
| **Mobile & Tablet Adaptability** | **Seamless vertical stack** | Requires major restructuring | Approach 1 collapses into a natural top-to-bottom reading order (Search -> Image -> Controls -> Metadata). |

### Formal Recommendation:
We formally recommend **Approach 1: The Asymmetric Workbench**. It delivers superior operational ergonomics, keeps the astronomical image centered without vertical scroll strain, and reflects the authentic workflow of a telescope control console.

---

## 4. Responsive Breakpoint Specifications & Collapse Rules

### 4.1 Desktop Breakpoint ($> 1024\text{px}$)
- **Grid Layout**: 3-column asymmetric grid with full-width header and grounded bottom timeline bar.
- `grid-template-columns: 280px 1fr 320px;`
- `grid-template-rows: auto 1fr auto;`
- Fixed viewport height ($100\text{vh}$), zero vertical page scrolling required.

### 4.2 Tablet Breakpoint ($768\text{px} - 1024\text{px}$)
- **Reflow Architecture**: 2-column layout.
- The Left Rail (Search & Target pills) moves into a compact top drawer or collapsible control deck.
- The Central Viewport and Right Metadata rail sit side-by-side ($1\text{fr}$ and $300\text{px}$).
- Timeline controls remain grounded along the viewport bottom.

### 4.3 Mobile Breakpoint ($< 768\text{px}$)
- **Reflow Architecture**: Single-column vertical scroll flow.
- Touch targets strictly enforced $\ge 44\times 44\text{px}$.

```text
+-----------------------------------------+
| [LOGO] SPHEREx Explorer       [MOCK ⚠️] |
+-----------------------------------------+
| CHALLENGE TARGETS (Horizontal Scroller) |
| [ Barnard's ] [ Eps Indi ] [ WISE 0855 ]|
+-----------------------------------------+
| COORDINATE SEARCH (Accordion / Collapsed)|
| [ RA: 269.45 ] [ Dec: +4.69 ] [Search]  |
+-----------------------------------------+
| SKY IMAGE VIEWPORT                      |
| +-------------------------------------+ |
| |                                     | |
| |   [ SQUARE VIEWPORT CONTAINER ]     | |
| |                                     | |
| | [ Observation 1 of 4 | MOCK ]       | |
| +-------------------------------------+ |
+-----------------------------------------+
| STICKY TIMELINE TRANSPORT BAR           |
| [ ◀ ]  [ ▶ Play ]  [ ▶ ]  ---(●)--- 1/4 |
+-----------------------------------------+
| METADATA & TRANSPARENCY CARD            |
| Target: Barnard's Star (M4.0V)          |
| Catalog Center: RA 269.452°, Dec +4.693°|
| Requested: RA 269.450°, Dec +4.690°     |
| Timestamp: 2026-02-15 00:00:00 UTC      |
| Reference: SIMBAD / Gaia DR3            |
+-----------------------------------------+
```

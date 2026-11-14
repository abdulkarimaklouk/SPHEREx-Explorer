# UI Specification & Layout Principles — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Architecture Baseline (Phase 2 Finalized)
**Last Updated**: 2026-11-14

---

## 1. High-Level Wireframe & Coordinate Transparency

The SPHEREx Explorer interface is an astronomical dashboard organized to provide clean coordinate input, instant selection of the five challenge targets, a high-contrast image viewport, and an interactive temporal timeline.

```text
+----------------------------------------------------------------------------------------------------+
|  [LOGO] SPHEREx Explorer                         [ ⚠️ MOCK OBSERVATION DATA — DEMO MODE ]          |
|  2026 NASA Space Apps Challenge                                                                    |
+----------------------------------------------------------------------------------------------------+
|  COORDINATE SEARCH PANEL                                                                           |
|  RA (0 - 360°): [ 269.45   ]   Dec (-90 - +90°): [ +4.69   ]   [ Search Field ]                    |
|  Challenge Targets:                                                                                |
|  [ Barnard's Star ] [ Epsilon Indi B ] [ WISE 0855 ] [ RW Aurigae ] [ R Draconis ]                 |
+----------------------------------------------------------------------------------------------------+
|                                                  |                                                 |
|  SKY OBSERVATION VIEWPORT                        |  ASTRONOMICAL & OBSERVATION METADATA            |
|  +--------------------------------------------+  |  TARGET IDENTITY (VERIFIED CATALOG)             |
|  |                                            |  |  Target Name: Barnard's Star                    |
|  |       [ SYNTHETIC DEMONSTRATION IMAGE ]    |  |  Constellation: Ophiuchus                       |
|  |                                            |  |  Catalog Center: RA 269.452°, Dec +4.693°       |
|  |                                            |  |  Requested Position: RA 269.450°, Dec +4.690°   |
|  |                                            |  |  Matching Status: Within Target Field Coverage  |
|  |  [ Observation 1 of 4: 2026-02-15 UTC ]    |  |  ---------------------------------------------  |
|  |                                            |  |  OBSERVATION DETAILS (SYNTHETIC MOCK)           |
|  +--------------------------------------------+  |  Sequence: Observation 1 of 4                   |
|                                                  |  Timestamp: 2026-02-15 00:00:00 UTC             |
|                                                  |  Data Status: ⚠️ Simulated Demo Frame            |
+--------------------------------------------------+-------------------------------------------------+
|  TIMELINE CONTROLS                                                                                 |
|  [ ◀ Previous ]  [ ▶ Play ]  [ Next ▶ ]                                                            |
|  Scrubber:  ---(●)-------------------------------------------------  Observation 1 of 4            |
|  Status: Playback stops automatically on Observation 4. Frame step: 1200ms.                        |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Component Behavioral Specifications

### 2.1 Header (`Header/`)
- Displays application identity: "SPHEREx Explorer — 2026 NASA Space Apps Challenge".
- Features a prominent, persistent badge: `MOCK OBSERVATION DATA — DEMO MODE`.

### 2.2 Coordinate Search Panel (`SearchPanel/`)
- **Inputs**:
  - `RA`: Decimal degrees ($0.0 \le \text{RA} < 360.0$).
  - `Dec`: Decimal degrees ($-90.0 \le \text{Dec} \le +90.0$).
- **Validation**:
  - Live validation on change/blur. Non-numeric or out-of-range values display inline guidance and disable "Search Field".
- **Five Challenge Object Pills**:
  - `[ Barnard's Star ]`
  - `[ Epsilon Indi B ]`
  - `[ WISE 0855 ]`
  - `[ RW Aurigae ]`
  - `[ R Draconis ]`
  - Clicking any pill immediately loads the target's verified coordinates and demonstration observation sequence.

### 2.3 Coordinate Transparency Requirement
> [!IMPORTANT]
> The interface **must never** imply that the sky image is centered on the user's requested coordinates unless they match exactly. When a target field is matched:
> - Display **Requested Coordinates**: Exactly what the user entered.
> - Display **Target Field Center**: The catalog position upon which the image frame is centered.
> - Display **Field Match Indicator**: Clearly informs the user that the field covers their requested coordinates.

### 2.4 Sky Viewer (`SkyViewer/`)
- Renders the synthetic demonstration image corresponding to the active observation sequence index.
- Responsive container with `object-fit: contain` to preserve framing.
- Displays an accessible fallback state if the local asset is missing.
- Overlay badge showing sequence index: `Observation X of 4`.

### 2.5 Timeline Controls (`TimelineControls/`)
- **Step Previous (`◀`)**: Decrements sequence index; disabled on Observation 1.
- **Step Next (`▶`)**: Increments sequence index; disabled on Observation 4.
- **Play / Pause**:
  - Cycles observations sequentially at **1200ms** interval.
  - Automatically halts when reaching Observation 4 (final epoch); returns toggle state to "Play".
- **Scrubber**:
  - Stepped slider allowing direct jumping to any of the 4 observations.

### 2.6 Observation Info Panel (`ObservationInfo/`)
- Divided clearly into:
  1. **Verified Astronomical Identity**: Name, Constellation, Catalog Center Coordinates, Object Classification.
  2. **Synthetic Observation Metadata**: Sequence number (1 of 4), Observation UTC Timestamp, and explicit `MOCK DATA` label.
- **Excluded**: No fabricated wavelength, exposure duration, or instrument telemetry.

---

## 3. Dedicated UI/UX Phase Notice

> [!NOTE]
> Detailed wireframes, typography tokens, color palettes, accessibility contrast calculations, and responsive mobile breakpoints will be produced during **Phase 3 (Dedicated UI/UX Design)**. No UI component implementation is permitted prior to Phase 3 approval.

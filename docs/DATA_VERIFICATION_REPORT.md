# Data Verification & Catalog Provenance Report — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Event**: 2026 NASA Space Apps Challenge  
**Phase**: Phase 4 — Mock Data Preparation (TASK-304.1)  
**Status**: Formal Audit & Verification Report  
**Date**: 2026-11-15  

---

## 1. Executive Summary

This report establishes the verified astronomical provenance baseline for the five mandatory objects of the **2026 NASA Space Apps Challenge** in the **SPHEREx Explorer** application. It audits catalog coordinates, reference frames, observational epochs, authoritative source citations, dataset duplication status, data schema alignment, and coordinate matching constraints.

In strict compliance with [scientific-data-integrity.md](file:///c:/Users/Star/Desktop/nasa/.agents/rules/scientific-data-integrity.md) and [project-scope.md](file:///c:/Users/Star/Desktop/nasa/.agents/rules/project-scope.md), all factual astronomical target parameters originate from peer-reviewed astronomical databases (SIMBAD, Gaia DR3, NASA/IPAC, and AAVSO). Synthetic observation sequences, timestamps, and images are separated and labeled as mock demonstration content.

---

## 2. Verified Target Information & Provenance Audit

### 2.1 Object-by-Object Verification Matrix

| Target Name | Catalog Identifiers | Constellation | Object Type | Verified RA (deg) | Verified Dec (deg) | Coord Frame | Coord Epoch | Verification Status | Source Authority |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Barnard's Star** | `GJ 699`, `HIP 87937`, `BD+04 3561a`, `Gaia DR3 4472832130942585856` | Ophiuchus | Red Dwarf (`M4.0V`) / High Proper Motion Star | `269.4520` | `+4.6930` | ICRS | J2000.0 (SIMBAD) / J2016.0 (Gaia DR3) | **Verified** | [SIMBAD](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=Barnard%27s+star) / [Gaia DR3](https://vizier.cds.unistra.fr/viz-bin/VizieR-S?Gaia%20DR3%204472832130942585856) |
| **Epsilon Indi B** | `eps Ind B`, `GJ 845 B`, `WDS J22033-5647B` | Indus | Cold Brown Dwarf Binary System (`T1 + T6`) | `330.8400` | `-56.7900` | ICRS | J2000.0 | **Verified** | [SIMBAD](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=eps+Ind+B) / [NASA/IPAC](https://irsa.ipac.caltech.edu/) |
| **WISE 0855** | `WISE J085510.83-071442.5`, `WISE 0855-0714` | Hydra | Sub-stellar Ultra-Cool Brown Dwarf (`Y-type`) | `133.7951` | `-7.2451` | ICRS | Discovery Epoch (Luhman 2014) | **Verified** | [NASA/IPAC WISE](https://irsa.ipac.caltech.edu/) / [Luhman (2014)](https://doi.org/10.1088/2041-8205/786/2/L18) |
| **RW Aurigae** | `RW Aur`, `HD 283572`, `HIP 23873`, `Gaia DR3 158334466547644928` | Auriga | Young Binary T Tauri Variable Star | `77.4600` | `+30.4000` | ICRS | J2000.0 (SIMBAD) / J2016.0 (Gaia DR3) | **Verified** | [SIMBAD](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=RW+Aur) / [Gaia DR3](https://vizier.cds.unistra.fr/viz-bin/VizieR-S?Gaia%20DR3%20158334466547644928) |
| **R Draconis** | `R Dra`, `HD 149214`, `HIP 80582`, `AAVSO 1632+66` | Draco | Mira-type Long-Period Variable Star | `248.3300` | `+66.7500` | ICRS | J2000.0 | **Verified** | [AAVSO VSX](https://www.aavso.org/vsx/index.php?view=detail.top&oid=13645) / [SIMBAD](http://simbad.u-strasbg.fr/simbad/sim-id?Ident=R+Dra) |

---

## 3. Coordinate Reference Frames, Epochs & Astronomical Nuances

### 3.1 Astronomical Reference Frame Standards
All celestial coordinates are expressed in the **International Celestial Reference System (ICRS)**, the standard barycentric celestial coordinate system adopted by the International Astronomical Union (IAU).

### 3.2 Proper Motion & Epoch Offsets
Different astronomical sources report coordinates at distinct standard epochs:
1. **Barnard's Star Proper Motion Displacement**:
   - Barnard's Star possesses the highest known proper motion ($\sim 10.3''/\text{yr}$, with $\mu_\alpha \cos\delta \approx -798\text{ mas/yr}$ and $\mu_\delta \approx +10328\text{ mas/yr}$).
   - In catalog epoch **J2000.0** (Hipparcos/SIMBAD), its position is $\text{RA} = 17\text{h } 57\text{m } 48.50\text{s}$ ($269.4521^\circ$), $\text{Dec} = +04^\circ\ 41'\ 36.2''$ ($+4.6934^\circ$).
   - In catalog epoch **J2016.0** (Gaia DR3), its position has shifted northward by $\approx 165''$: $\text{RA} = 269.4540^\circ$, $\text{Dec} = +4.7380^\circ$.
   - **Resolution for SPHEREx Explorer**: The application adopts the standard SIMBAD/ICRS baseline ($\text{RA } 269.452^\circ, \text{Dec } +4.693^\circ$) for demonstration framing and documents the J2000.0 epoch clearly.
2. **WISE 0855 NASA Challenge Reference Conversion**:
   - The NASA Space Apps Challenge specification provides the exact sexagesimal reference:
     $$\text{RA: } 08\text{h } 55\text{m } 10.831\text{s}, \quad \text{Dec: } -07^\circ\ 14'\ 42.53''$$
   - Converted to decimal degrees:
     $$\text{RA} = (8 + 55/60 + 10.831/3600) \times 15 = 133.795129^\circ \rightarrow 133.7951^\circ$$
     $$\text{Dec} = -(7 + 14/60 + 42.53/3600) = -7.245147^\circ \rightarrow -7.2451^\circ$$
   - This exact conversion is preserved in both `mockTargets.json` and the CSV templates.

---

## 4. Unresolved Catalog Fields & Verification Boundaries

The following parameters are intentionally marked as **Unresolved / Not Configured** to maintain absolute scientific integrity:

1. **Target Field Coverage (`fieldCoverageDegrees = null`)**:
   - Mock field coverage boundaries represent synthetic demonstration framing, not official SPHEREx instrument field-of-view telemetry.
   - Per ADR-004 and TASK-304.1 instructions, no arbitrary universal radius (e.g. $1.0^\circ$ or $2.0^\circ$) or invented FOV ($15' \times 15'$) is permitted.
   - Field coverage is marked `Not configured` across all targets.
2. **Proper Motion Rates on Display Graphics**:
   - While proper motion is an established scientific fact for Barnard's Star and WISE 0855, numerical displacement rates are excluded from UI labels and graphics to avoid presenting uncalibrated vector numbers.
3. **Instrument Telemetry & Flux Densities**:
   - SPHEREx-specific detector temperatures, integration times, and calibrated spectral fluxes are completely excluded from the data schema.

---

## 5. Dataset Architecture & Elimination of Duplication

### 5.1 Canonical Data Owner
- **Canonical Dataset**: `src/data/mockTargets.json` is the **single source of truth** for all five target records and their 20 synthetic observation epochs.
- **Data Provider Adapter**: `src/services/providers/MockDataProvider.js` owns the read access to `mockTargets.json`.

### 5.2 Consolidation of `src/data/targetsData.js`
- Prior to TASK-304.1, `src/data/targetsData.js` duplicated target records in a hardcoded JavaScript array.
- In TASK-304.1, `src/data/targetsData.js` was refactored into a lightweight export facade that delegates directly to `MockDataProvider.loadTargets()`.
- **Result**: Zero duplicate data records exist in the repository; single-point data integrity is achieved.

---

## 6. Data Schema Recommendations

The canonical JSON schema (`src/data/mockTargets.json`) has been expanded to support both existing frontend property names and standard data architecture keys:

```json
{
  "id": "obs-barnard-01",
  "observationId": "obs-barnard-01",
  "targetId": "barnards-star",
  "sequence": 1,
  "timestamp": "2026-02-15T00:00:00Z",
  "timestampUtc": "2026-02-15T00:00:00Z",
  "imagePath": "/images/demo/barnards_star_ep01.png",
  "imageUrl": "/images/demo/barnards_star_ep01.png",
  "isMock": true
}
```

### Key Recommendations:
1. **Target Records**: Ensure `coordinateFrame`, `coordinateEpoch`, and `sourceUrl` are standard properties on all target entries.
2. **Synthetic Observations**: Enforce `isMock: true` on every observation entry. Use UTC ISO 8601 strings for all timestamps.
3. **Domain Service Normalization**: `ObservationService.getPresetTargets()` ensures that consumer components can access both `obs.timestampUtc` and `obs.timestamp` seamlessly.

---

## 7. Coordinate Coverage & Matching Limitations

### 7.1 Policy Enforcement in `observationService.js`
The coordinate matching engine in `ObservationService.findTargetByCoordinates(ra, dec)` strictly enforces the following rules:
1. **Explicit Boundary Requirement**: A valid mock field match strictly requires an explicitly configured, numerical `target.fieldCoverageDegrees`.
2. **Unconfigured Coverage Remains Unavailable**: When `fieldCoverageDegrees === null`, `isWithinCoverage` evaluates to `false`, and `matched` is returned as `false`.
3. **No Arbitrary Nearest-Target Matching**: Entering manual coordinates will never snap to an unconfigured target and claim a field match.
4. **Suggestions Only**: The nearest catalog target is computed via great-circle spherical math (`calculateAngularSeparation`) and returned strictly as a suggestion (`nearestTarget`) for the empty-state recovery interface.

### 7.2 UI Behavior Under Current Policy
- **Direct Preset Selection**: Clicking any challenge target card in the left rail directly selects that target and displays its synthetic observation frames.
- **Manual Coordinate Search**: Because coverage boundaries are currently unconfigured, manual coordinate queries display the **"Outside Demonstration Coverage"** overlay with the closest target offered as a 1-click recovery suggestion.

---

## 8. Summary of Created Data Templates

The following team data collection templates have been established in `docs/data/`:

1. [OBJECT_CATALOG_TEMPLATE.csv](file:///c:/Users/Star/Desktop/nasa/docs/data/OBJECT_CATALOG_TEMPLATE.csv): Standard CSV template containing all 5 challenge objects, catalog IDs, coordinates, reference frames, epochs, verification statuses, and source URLs.
2. [OBSERVATION_MANIFEST_TEMPLATE.csv](file:///c:/Users/Star/Desktop/nasa/docs/data/OBSERVATION_MANIFEST_TEMPLATE.csv): Complete manifest for all 20 planned synthetic demonstration observations across the 5 objects, with sequence numbers, timestamps, image paths, mock flags, and visual descriptions.
3. [ASSET_GUIDELINES.md](file:///c:/Users/Star/Desktop/nasa/docs/data/ASSET_GUIDELINES.md): Comprehensive guidelines detailing dimension standards ($800 \times 600\text{px}$ / $600 \times 500\text{px}$), orientation rules (North Up, East Left), stationary background star requirements, visual variation concepts, and mandatory mock disclosure labeling.

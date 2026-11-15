# Synthetic Observation Asset Preparation Guidelines — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Event**: 2026 NASA Space Apps Challenge  
**Phase**: Phase 4 — Mock Data Preparation  
**Status**: Specification Guideline Baseline  
**Last Updated**: 2026-11-15  

---

## 1. Overview & Core Principles

This document establishes the official technical, visual, and scientific guidelines for preparing the **20 synthetic demonstration sky images** (4 chronological observation epochs for each of the 5 NASA Space Apps Challenge objects).

### Mandatory Operating Principles:
1. **Illustrative Demonstration Only**: All image assets are purely illustrative graphics engineered to demonstrate temporal exploration capabilities. They must **never** be presented, claimed, or labeled as authentic NASA SPHEREx observatory telemetry or real astronomical data.
2. **No Fabricated Telemetry**: Image assets must not contain or imply simulated physical measurements such as calibrated spectral flux densities ($F_\nu$), wavelength channels, detector temperatures, or exact physical velocities.
3. **Embedded Mock Data Provenance**: Every generated image must display an indelible, high-visibility watermark or header overlay declaring:  
   `"MOCK DEMO ASSET — NOT REAL NASA DATA"` or `"ILLUSTRATIVE DEMO — NOT SCIENTIFIC TELEMETRY"`.
4. **Decoupled Architecture**: Images are static visual assets located under `public/images/demo/` and referenced by `mockTargets.json`. The user interface remains fully functional even if an image fails to load.

---

## 2. Asset Matrix & Technical Specifications

| Parameter | Specification | Notes |
| :--- | :--- | :--- |
| **Total Asset Count** | 20 images (5 targets × 4 observation epochs) | Mapped 1:1 to `OBSERVATION_MANIFEST_TEMPLATE.csv`. |
| **Image Format** | PNG (Portable Network Graphics) or SVG | 24-bit RGB with alpha transparency if applicable. |
| **Dimensions** | $800 \times 600\text{px}$ (4:3) or $600 \times 500\text{px}$ | Uniform aspect ratio within each target sequence. |
| **Resolution / DPI** | $72\text{ DPI}$ to $150\text{ DPI}$ web standard | Crisp on standard and retina displays. |
| **Color Space** | sRGB | Deep obsidian background (`#080a0f` to `#11141a`). |
| **Orientation Standard** | **North Up ($\uparrow$), East Left ($\leftarrow$)** | Standard celestial cartography convention. |
| **Storage Directory** | `public/images/demo/` | Served statically by Vite at `/images/demo/<filename>`. |

---

## 3. Filename Convention

All asset filenames must strictly follow the lowercase, hyphenated/underscored schema:

```text
public/images/demo/<target_slug>_ep0<epoch_number>.png
```

### Complete Filename Inventory:
1. `barnards_star_ep01.png`, `barnards_star_ep02.png`, `barnards_star_ep03.png`, `barnards_star_ep04.png`
2. `epsilon_indi_b_ep01.png`, `epsilon_indi_b_ep02.png`, `epsilon_indi_b_ep03.png`, `epsilon_indi_b_ep04.png`
3. `wise_0855_ep01.png`, `wise_0855_ep02.png`, `wise_0855_ep03.png`, `wise_0855_ep04.png`
4. `rw_aurigae_ep01.png`, `rw_aurigae_ep02.png`, `rw_aurigae_ep03.png`, `rw_aurigae_ep04.png`
5. `r_draconis_ep01.png`, `r_draconis_ep02.png`, `r_draconis_ep03.png`, `r_draconis_ep04.png`

---

## 4. Sequence Framing & Visual Uniformity Rules

To allow human evaluators to detect visual changes across time without disorientation:

1. **Stationary Background Reference Grid**:
   - Within any target's 4-image sequence, all background field stars must remain in identical, fixed $(X, Y)$ positions across all four epochs.
   - Zero camera panning, zero zooming, and zero rotational shifts between consecutive epochs.
2. **Consistent Astrometric Scale**:
   - The field of view framing must be locked across all 4 epochs of a target.
3. **Chronological Timestamp Progression**:
   - Timestamps must advance in strictly ascending UTC chronological order.
4. **Embedded Watermark Placement**:
   - Bottom center or bottom right of every image:
     `MOCK DEMONSTRATION GRAPHIC — NOT REAL OBSERVATIONS` (Font: Monospace, 11px, high-contrast buff text with dark backing box).

---

## 5. Target-Specific Illustrative Treatments

Each target's sequence illustrates a distinctive astronomical exploration concept without inventing numerical physics or fabricated telemetry:

### 5.1 Barnard's Star (`barnards-star`)
- **Astronomical Concept**: Apparent proper motion across the celestial sphere.
- **Illustrative Treatment**:
  - The background reference stars remain completely stationary across all four epochs.
  - The central red dwarf target demonstrates a visible, incremental linear shift in position from epoch 1 to epoch 4.
  - *No Claim*: Do not display or calculate numerical velocities, proper motion vectors, or physical parallax angles on the image.

### 5.2 Epsilon Indi B (`epsilon-indi-b`)
- **Astronomical Concept**: Sub-stellar binary brown dwarf system resolution.
- **Illustrative Treatment**:
  - Visually identifies the cold brown dwarf pair as two close, distinct sub-stellar point sources (`Ba` and `Bb`) against a dark celestial field.
  - Maintains stable relative positions across epochs to highlight their binary nature.
  - *No Claim*: Do not invent orbital periods, Keplerian semi-major axes, or gravitational mass measurements.

### 5.3 WISE 0855 (`wise-0855`)
- **Astronomical Concept**: Apparent displacement of an ultra-cool sub-stellar brown dwarf.
- **Illustrative Treatment**:
  - Framed at the challenge reference coordinates (RA $133.7951^\circ$, Dec $-7.2451^\circ$).
  - Shows a faint sub-stellar point source exhibiting subtle, illustrative displacement relative to fixed background reference stars across the four epochs.
  - *No Claim*: Do not invent astrometric parallax measurements, physical temperatures, or spectral classification fluxes.

### 5.4 RW Aurigae (`rw-aurigae`)
- **Astronomical Concept**: Pre-main-sequence circumstellar dust disk occultation.
- **Illustrative Treatment**:
  - Illustrates dramatic brightness variations:
    - *Epoch 1*: Bright baseline state of primary component RW Aur A alongside secondary B.
    - *Epoch 2*: Ingress phase showing illustrative dimming as circumstellar dust occults the primary star.
    - *Epoch 3*: Deep minimum showing faint primary core.
    - *Epoch 4*: Egress phase showing illustrative rebrightening and recovery.
  - *No Claim*: Do not display light curves, photometric magnitudes, or physical dust mass densities.

### 5.5 R Draconis (`r-draconis`)
- **Astronomical Concept**: Mira-type long-period variable stellar pulsation.
- **Illustrative Treatment**:
  - Illustrates cyclic brightness and radiant envelope variations:
    - *Epoch 1*: Maximum visual brightness with an extended radiant halo.
    - *Epoch 2*: Declining phase with diminishing visual diameter.
    - *Epoch 3*: Minimum visual phase with compact core and muted glow.
    - *Epoch 4*: Ascending phase showing radiant expansion.
  - *No Claim*: Do not fabricate physical stellar radii, photometric band magnitudes ($V, R, I$), or pulsation periods.

---

## 6. Verification & Quality Acceptance Checklist

Before any demonstration image is accepted into `public/images/demo/`:

- [ ] Image dimensions and aspect ratio match across all 4 epochs of the target.
- [ ] Stationary background stars have identical pixel coordinates across all 4 epochs.
- [ ] No scientific telemetry or fabricated instruments are drawn on the image.
- [ ] Prominent mock disclosure watermark is legible and indelibly rendered.
- [ ] File is placed in `public/images/demo/` and referenced accurately in `mockTargets.json`.
- [ ] Image loads cleanly in the dashboard `SkyViewer` without clipping or horizontal overflow.

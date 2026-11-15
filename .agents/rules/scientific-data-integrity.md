---
description: Enforces scientific integrity, factual astronomical provenance, and explicit mock data labeling.
trigger: model_decision
---

# Scientific Data Integrity Governance

## Data Provenance & Mock Labeling

1. **Preserve Verified Astronomical Facts**:
   - Target names, designations, constellations, and catalog coordinates for the five challenge targets originate from documented astronomical sources (SIMBAD, Gaia DR3, NASA/IPAC WISE).
   - Document factual provenance (catalog authority, reference frame, epoch) explicitly.
   - Do **not** apply a blanket `isMock: true` to verified catalog records. Provenance belongs to the target identity layer.
2. **Strict Mock Observation Labeling**:
   - Observation timestamps, sequence indices, synthetic images, and demo field coverages are synthetic demonstration content.
   - All synthetic observation records must include `"isMock": true`.
   - All visual demonstration graphics must be labeled as simulated/mock. Never present simulated imagery as genuine SPHEREx observatory data.
3. **No Fabricated Telemetry or Scientific Values**:
   - Do not invent scientific measurements, wavelength channels, exposure times, detector temperatures, or spectral fluxes.
   - Omit physical measurements from the MVP rather than inventing unverifiable numbers.
4. **Coordinate Transparency**:
   - When a mock target field is displayed, the UI must never imply that the image is centered on the user's requested coordinates unless they match exactly.
   - Always distinguish *Requested Coordinates* from the *Target Catalog Center*.
5. **Decouple Spectral Channels from Observation Epochs**:
   - The 102 nominal SPHEREx spectral channels represent wavelength bandpasses (0.75–5.00 µm) across 6 detector bands, NOT observation time epochs.
   - Never merge, confuse, or represent spectral channel indices as chronological timeline steps (ADR-014).

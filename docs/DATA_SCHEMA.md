# Data Schema Specification — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Schema Specification (Phase 2 Finalized)
**Last Updated**: 2026-11-14

---

## 1. Overview & Data Integrity Principles

This document specifies the exact JSON schema for `src/data/mockTargets.json`, the canonical dataset powering SPHEREx Explorer.

### Key Data Integrity Principles:
1. **Separation of Verified Facts from Synthetic Data**:
   - Astronomical object identity (designation, constellation, verified catalog coordinates, physical type) is sourced from factual reference catalogs (SIMBAD, NASA/IPAC, Gaia) and is **not** synthetic.
   - Observation sequences (timestamps, observation sequence indices, and demonstration image assets) are synthetic and must carry an explicit `"isMock": true` flag.
2. **No Invented Scientific Values**:
   - The initial MVP observation schema intentionally omits physical measurements such as wavelength channels, exposure times, detector temperatures, or spectral fluxes. These are reserved for future real-data pipelines.

---

## 2. Schema Definitions

### 2.1 Celestial Target Record (`AstronomicalTarget`)

Represents a verified celestial object from the challenge specification:

| Field | Type | Required | Description | Provenance |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique internal slug (e.g., `"barnards-star"`). | Internal |
| `name` | `string` | Yes | Primary astronomical designation (e.g., `"Barnard's Star"`). | Catalog Verified |
| `alternateDesignations` | `Array<string>` | No | Common catalog identifiers (e.g., `["GJ 699", "HIP 87937"]`). | Catalog Verified |
| `ra` | `number` | Yes | Catalog Right Ascension in decimal degrees ($0.0 \le \text{ra} < 360.0$). | Catalog Verified |
| `dec` | `number` | Yes | Catalog Declination in decimal degrees ($-90.0 \le \text{dec} \le +90.0$). | Catalog Verified |
| `constellation` | `string` | Yes | Host constellation name. | Catalog Verified |
| `objectType` | `string` | Yes | Astrophysical classification (e.g., `"Red Dwarf / High Proper Motion Star"`). | Catalog Verified |
| `description` | `string` | Yes | Educational summary of the object's scientific interest. | Educational |
| `fieldCoverageDegrees` | `number` | Yes | Angular radius (in degrees) representing mock demonstration coverage. | Pending Phase 4 |
| `coordinateSource` | `string` | Yes | Reference catalog authority (e.g., `"SIMBAD / Gaia DR3"`). | Factual Provenance |
| `observations` | `Array<SyntheticObservation>` | Yes | Chronological sequence of demonstration observations (4 per target). | Synthetic MOCK |

### 2.2 Observation Record (`SyntheticObservation`)

Represents a single demonstration observation epoch within a target's timeline:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique observation identifier (e.g., `"obs-barnard-01"`). |
| `targetId` | `string` | Yes | Foreign key reference to parent `AstronomicalTarget.id`. |
| `sequence` | `number` | Yes | Chronological sequence position (1, 2, 3, 4). |
| `timestamp` | `string` | Yes | Synthetic UTC timestamp in ISO 8601 format (e.g., `"2026-03-01T12:00:00Z"`). Must be chronologically ascending. |
| `imageUrl` | `string` | Yes | Relative path to local demo image asset (e.g., `"/images/demo/barnards_star_ep01.png"`). |
| `isMock` | `boolean` | Yes | Must always be `true`. Explicitly identifies the image and epoch as synthetic. |

---

## 3. The Five NASA Challenge Objects in Schema

The dataset includes all five mandatory challenge objects:

```json
{
  "version": "1.0.0",
  "challenge": "2026 NASA Space Apps Challenge — SPHEREx Explorer",
  "disclaimer": "Object positions and identities are verified astronomical catalog entries. Observation epochs, timestamps, and images are synthetic MOCK demonstrations.",
  "targets": [
    {
      "id": "barnards-star",
      "name": "Barnard's Star",
      "alternateDesignations": ["GJ 699", "HIP 87937", "BD+04 3561a"],
      "ra": 269.452,
      "dec": 4.693,
      "constellation": "Ophiuchus",
      "objectType": "Red Dwarf (M4.0V) / High Proper Motion Star",
      "description": "Second-closest known star system to the Sun, famous for having the highest known proper motion of any star.",
      "fieldCoverageDegrees": 1.0,
      "coordinateSource": "SIMBAD / Gaia DR3 (ICRS, Epoch J2016.0)",
      "observations": [
        {
          "id": "obs-barnard-01",
          "targetId": "barnards-star",
          "sequence": 1,
          "timestamp": "2026-02-15T00:00:00Z",
          "imageUrl": "/images/demo/barnards_star_ep01.png",
          "isMock": true
        },
        {
          "id": "obs-barnard-02",
          "targetId": "barnards-star",
          "sequence": 2,
          "timestamp": "2026-05-15T00:00:00Z",
          "imageUrl": "/images/demo/barnards_star_ep02.png",
          "isMock": true
        },
        {
          "id": "obs-barnard-03",
          "targetId": "barnards-star",
          "sequence": 3,
          "timestamp": "2026-08-15T00:00:00Z",
          "imageUrl": "/images/demo/barnards_star_ep03.png",
          "isMock": true
        },
        {
          "id": "obs-barnard-04",
          "targetId": "barnards-star",
          "sequence": 4,
          "timestamp": "2026-11-15T00:00:00Z",
          "imageUrl": "/images/demo/barnards_star_ep04.png",
          "isMock": true
        }
      ]
    },
    {
      "id": "epsilon-indi-b",
      "name": "Epsilon Indi B",
      "alternateDesignations": ["eps Ind B", "GJ 845 B"],
      "ra": 330.84,
      "dec": -56.79,
      "constellation": "Indus",
      "objectType": "Cold Brown Dwarf Binary System (T1 + T6)",
      "description": "One of the nearest brown dwarf systems to Earth, exhibiting deep methane and water absorption.",
      "fieldCoverageDegrees": 1.0,
      "coordinateSource": "SIMBAD / IPAC (ICRS)",
      "observations": []
    },
    {
      "id": "wise-0855",
      "name": "WISE 0855",
      "alternateDesignations": ["WISE J085510.83-071442.5"],
      "ra": 133.795,
      "dec": -7.245,
      "constellation": "Hydra",
      "objectType": "Sub-stellar Ultra-Cool Brown Dwarf (Y-type)",
      "description": "The fourth closest system to the Sun and the coldest known sub-stellar object outside the Solar System.",
      "fieldCoverageDegrees": 1.0,
      "coordinateSource": "NASA/IPAC WISE / Luhman (2014)",
      "observations": []
    },
    {
      "id": "rw-aurigae",
      "name": "RW Aurigae",
      "alternateDesignations": ["RW Aur", "HD 283572"],
      "ra": 77.46,
      "dec": 30.40,
      "constellation": "Auriga",
      "objectType": "Young Binary T Tauri Variable Star",
      "description": "T Tauri system exhibiting dramatic, multi-year dimming events attributed to circumstellar disk disruption and occulting dust streams.",
      "fieldCoverageDegrees": 1.0,
      "coordinateSource": "SIMBAD / Gaia DR3 (ICRS)",
      "observations": []
    },
    {
      "id": "r-draconis",
      "name": "R Draconis",
      "alternateDesignations": ["R Dra", "HD 149214"],
      "ra": 248.33,
      "dec": 66.75,
      "constellation": "Draco",
      "objectType": "Mira-type Long-Period Pulsating Variable Star",
      "description": "Classic oxygen-rich Mira variable star exhibiting extensive visual amplitude variations over a ~245-day cycle.",
      "fieldCoverageDegrees": 1.0,
      "coordinateSource": "AAVSO / SIMBAD (ICRS)",
      "observations": []
    }
  ]
}
```

---

## 4. Fields Intentionally Omitted from MVP

To prevent fabricating unverifiable engineering and scientific values, the following fields are **strictly excluded** from the MVP schema:
- `wavelengthCenterMicrons`
- `exposureTimeSeconds`
- `spectralBand`
- `filterTransmission`
- `detectorTemperature`
- `fluxCalibrations`

These may be integrated in post-challenge releases when actual SPHEREx pipeline data products become publicly accessible via NASA/IPAC IRSA.

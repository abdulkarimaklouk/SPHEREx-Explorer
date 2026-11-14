# Data Schema Specification — SPHEREx Explorer

**Project**: SPHEREx Explorer  
**Challenge**: 2026 NASA Space Apps Challenge  
**Status**: Specification & Schema Definition  
**Last Updated**: 2026-11-14  

---

## 1. Overview

This document specifies the exact JSON schemas for mock astronomical objects and observation sequences used by the SPHEREx Explorer web application.

> [!IMPORTANT]
> All records must include the explicit boolean flag `"isMock": true`. Under no circumstances should mock data omit this indicator.

---

## 2. Schema Definitions

### 2.1 Celestial Target (`MockTarget`)

Represents a predefined astronomical region, field, or object of interest:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique identifier for the mock target (e.g., `"target-kepler-field-01"`). |
| `name` | `string` | Yes | Human-readable name or field designation (e.g., `"Kepler Deep Field Demo"`). |
| `ra` | `number` | Yes | Right Ascension in decimal degrees ($0 \le \text{ra} < 360$). |
| `dec` | `number` | Yes | Declination in decimal degrees ($-90 \le \text{dec} \le +90$). |
| `constellation` | `string` | No | Associated constellation name. |
| `description` | `string` | Yes | Brief description of the target field for educational context. |
| `isMock` | `boolean` | Yes | Must always be `true`. |
| `observations` | `Array<MockObservation>` | Yes | Chronologically sorted sequence of observations. |

### 2.2 Observation Record (`MockObservation`)

Represents a single observation epoch within a target's timeline:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique observation identifier (e.g., `"obs-kepler-ep-01"`). |
| `epochIndex` | `number` | Yes | Zero-based sequential index ($0, 1, 2, \dots, N-1$). |
| `timestamp` | `string` | Yes | UTC observation timestamp in ISO 8601 format (e.g., `"2026-03-15T08:24:00Z"`). |
| `imageUrl` | `string` | Yes | Relative URL path to the static image asset (e.g., `"/images/demo/kepler_epoch_01.png"`). |
| `spectralBand` | `string` | Yes | Simulated SPHEREx spectral band identifier (e.g., `"Band 3 (1.50 - 2.42 µm)"`). |
| `wavelengthCenterMicrons` | `number` | Yes | Central wavelength of the band in micrometers ($\mu\text{m}$). |
| `exposureTimeSeconds` | `number` | Yes | Simulated exposure duration in seconds. |
| `notes` | `string` | No | Additional descriptive or educational context regarding the observation. |
| `isMock` | `boolean` | Yes | Must always be `true`. |

---

## 3. Representative JSON Example

```json
{
  "version": "1.0.0",
  "generated": "2026-11-14T00:00:00Z",
  "disclaimer": "All astronomical observations and imagery in this dataset are simulated MOCK data for the 2026 NASA Space Apps Challenge.",
  "targets": [
    {
      "id": "target-demo-01",
      "name": "North Ecliptic Pole Deep Field (MOCK)",
      "ra": 270.0,
      "dec": 66.56,
      "constellation": "Draco",
      "description": "Simulated multi-epoch observation sequence covering the North Ecliptic Pole calibration field.",
      "isMock": true,
      "observations": [
        {
          "id": "obs-nep-001",
          "epochIndex": 0,
          "timestamp": "2026-02-01T12:00:00Z",
          "imageUrl": "/images/demo/nep_epoch_01.png",
          "spectralBand": "Band 1 (0.75 - 1.20 µm)",
          "wavelengthCenterMicrons": 0.975,
          "exposureTimeSeconds": 120,
          "notes": "Initial survey calibration epoch.",
          "isMock": true
        },
        {
          "id": "obs-nep-002",
          "epochIndex": 1,
          "timestamp": "2026-04-01T14:30:00Z",
          "imageUrl": "/images/demo/nep_epoch_02.png",
          "spectralBand": "Band 2 (1.20 - 1.80 µm)",
          "wavelengthCenterMicrons": 1.5,
          "exposureTimeSeconds": 120,
          "notes": "Follow-up survey revisit.",
          "isMock": true
        }
      ]
    }
  ]
}
```

---

## 4. Items Requiring Confirmation

> [!NOTE]
> 1. **Number of Preset Targets**: Confirm how many demo celestial targets should be packaged in the initial mock dataset (e.g., 3 to 5 targets) [Requires Confirmation].
> 2. **Observation Sequence Length**: Confirm the typical count of observation epochs per target sequence (e.g., 4 to 8 epochs) [Requires Confirmation].
> 3. **Spectral Resolution**: Confirm if full 102-channel spectrophotometric resolution should be reflected in metadata or simplified into 6 instrument bands [Requires Confirmation].

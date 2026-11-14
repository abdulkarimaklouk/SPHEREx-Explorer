# Glossary — SPHEREx Explorer

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Status**: Reference Terminology (Phase 2 Finalized)
**Last Updated**: 2026-11-14

---

## 1. Astronomical Terminology

### Celestial Sphere
An imaginary sphere of arbitrarily large radius, concentric with Earth. All celestial objects can be thought of as projected onto the inner surface of this sphere.

### Right Ascension (RA)
The celestial equivalent of terrestrial longitude. Measured eastward along the celestial equator from the vernal equinox. In SPHEREx Explorer, RA is accepted and represented in decimal degrees:
$$0.0^\circ \le \text{RA} < 360.0^\circ$$

### Declination (Dec)
The celestial equivalent of terrestrial latitude. Measured north ($+$) or south ($-$) from the celestial equator to the celestial poles:
$$-90.0^\circ \le \text{Dec} \le +90.0^\circ$$

### Great-Circle Angular Separation
The shortest angular distance $\Delta\theta$ between two points on the surface of a sphere, calculated using spherical trigonometry:
$$\Delta\theta = \arccos\left(\sin(\delta_1)\sin(\delta_2) + \cos(\delta_1)\cos(\delta_2)\cos(\alpha_1 - \alpha_2)\right)$$

### Field Coverage Boundary
The angular radius around a target's catalog center coordinates within which user-entered coordinates are considered part of the target's demonstration field. Derived per-target from mock field framing, rather than an arbitrary universal threshold.

### Coordinate Transparency
The principle that the interface explicitly distinguishes the user's requested search coordinates from the target field's catalog center coordinates, ensuring users know where the observation image is actually centered.

### Epoch / Observation Sequence
A specific timestamp and sequence index representing an astronomical observation event.

### The Five NASA Challenge Objects
1. **Barnard's Star**: High proper motion red dwarf in Ophiuchus (~6 light-years distant).
2. **Epsilon Indi B**: Cold sub-stellar brown dwarf binary companion in Indus.
3. **WISE 0855**: Ultra-cool sub-stellar brown dwarf (Y-type) in Hydra.
4. **RW Aurigae**: Young binary T Tauri star in Auriga with episodic circumstellar occultations.
5. **R Draconis**: Mira-type long-period pulsating variable star in Draco.

### SPHEREx
*Spectro-Photometer for the History of the Universe, Epoch of Reionization, and Ices Explorer*. A NASA Medium-Class Explorer (MIDEX) astrophysics satellite mission designed to perform an all-sky near-infrared spectral survey across 102 photometric bands covering wavelengths from 0.75 µm to 5.0 µm.

---

## 2. Technical & Architectural Terminology

### Mock Data
Simulated, synthetic demonstration data (images, timestamps, sequence numbers) having no physical or observational reality, explicitly marked as MOCK.

### Verified Target Data
Astronomical target names, classifications, and catalog coordinates originating from peer-reviewed databases (SIMBAD, Gaia, WISE), distinguished from synthetic observation data.

### Single-Page Application (SPA)
A web application architecture loading a single HTML page and updating content dynamically via client-side JavaScript.

### Component Decoupling
An architectural design pattern wherein presentation components are kept strictly separated from data access mechanisms and mathematical logic.

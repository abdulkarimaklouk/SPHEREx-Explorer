# 05 — Visual Direction: "Observatory Field Desk"

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Phase**: Phase 3 — Dedicated UI/UX Design (TASK-301)
**Status**: Visual Strategy & Design System Baseline (Awaiting Review & Approval)
**Last Updated**: 2026-11-14

---

## 1. Visual Concept: "Observatory Field Desk"

The visual direction for SPHEREx Explorer is anchored in the concept of an **"Observatory Field Desk"**.

It draws inspiration from:
- **Physical Astronomical Instrumentation**: Hardware dials, optical bench framing, matte metal chassis, and precision Vernier scales.
- **Printed Celestial Atlases**: Thoughtful typographic hierarchy, high-legibility tabular numerals, and restrained editorial elegance.
- **Modern Astrophysical Workstations**: High-density, low-glare operational environments (such as Keck, ALMA, or ESO control consoles) engineered for night-vision endurance and cognitive clarity.

The visual experience communicates: **this is a specialized scientific instrument, not a generic consumer web application.**

---

## 2. Forbidden Visual Tropes (Strict Anti-Patterns)

To prevent visual drift toward generic AI or SaaS aesthetics, the following patterns are strictly banned:

| Prohibited Visual Pattern | Why It Is Prohibited | Approved Scientific Alternative |
| :--- | :--- | :--- |
| **Purple/Blue Gradient Backgrounds** | Creates a toy-like, generic "crypto / AI landing page" feel. | Solid, deep matte graphite background with warm charcoal surface layers. |
| **Cyan Neon Glows & Light Streaks** | Reduces contrast, strains night-vision, and causes eye fatigue. | Precise 1px hairline borders with clear technical contrast. |
| **Pink / Purple Accent Highlights** | Lacks scientific or historical astronomy provenance. | Warm Signal Amber and Muted Sage derived from classic optical indicators. |
| **Excessive Glassmorphism / Frosted Blur** | Blurs background pixels and obscures critical celestial image data. | High-opacity, solid surfaces with crisp separation and deliberate whitespace. |
| **Repeated Floating Pill Cards** | Creates visual clutter and wastes precious viewport space. | Structured, unified console layout with technical divider rules. |
| **Gratuitous Spring/Bounce Animations** | Distracts from visual detection of genuine astronomical changes. | Instant or linear 100ms transitions engineered for responsive stepping. |

---

## 3. Proposed Color Direction: "Warm Technical Palette"

The palette utilizes warm, low-fatigue tones that evoke telescope hardware and parchment charts rather than cold electric blues.

### 3.1 Color Palette Tokens

```text
+---------------------------------------------------------------------------------------------+
| Deep Graphite (Base)       | Slate Charcoal (Surface)   | Warm Ivory (Primary Text)         |
| #11141a                   | #191d24                    | #f5f4ef                           |
| Structural Void            | Console Deck / Panels      | High-Legibility Typography        |
+---------------------------------------------------------------------------------------------+
| Signal Amber (Action/Mock) | Muted Sage (Verified Fact) | Technical Slate (Border/Divider)  |
| #e59324                   | #739481                    | #2a323d                           |
| Active Buttons & Mock Tag  | Catalog Data & Citations   | Hairline 1px Structural Dividers  |
+---------------------------------------------------------------------------------------------+
```

### 3.2 Proposed Token Specifications & Accessibility Target Guidance

| Token Name | Hex Code | Primary Purpose | Background Paired | Accessibility Target |
| :--- | :---: | :--- | :---: | :--- |
| `color-bg-base` | `#11141a` | Deepest root viewport background | N/A | Base |
| `color-surface-deck` | `#191d24` | Elevated instrument console panels | `#11141a` | Structural separation |
| `color-text-primary` | `#f5f4ef` | Main headers, target titles, coordinates | `#11141a` | Target WCAG AA ($>4.5:1$) |
| `color-text-secondary`| `#b2b1a8` | Field labels, captions, helper notes | `#11141a` | Target WCAG AA ($>4.5:1$) |
| `color-accent-amber` | `#e59324` | Active state, play toggle, mock alert | `#191d24` | Target WCAG AA ($>4.5:1$) |
| `color-accent-sage` | `#739481` | Verified catalog facts, citation links | `#191d24` | Target WCAG AA ($>4.5:1$) |
| `color-border-subtle` | `#2a323d` | 1px precision separation lines | `#191d24` | Non-text UI boundary |
| `color-focus-ring` | `#f0a238` | High-visibility keyboard focus outline | `#11141a` | Target WCAG AA ($>3:1$ UI) |

> [!NOTE]
> Final contrast ratio verification is formally scheduled for the Design System phase (TASK-303) when production color tokens and pairings are finalized and audited against WCAG 2.2 AA specifications.

---

## 4. Typography Direction: The Dual-Stack System

To marry editorial clarity with mathematical precision, typography is split into two specialized stacks:

### 4.1 Data & Coordinate Stack: Tabular Monospace
- **Font Stack**: `ui-monospace, "SF Mono", "Roboto Mono", "Cascadia Code", "Courier New", monospace`
- **Application**:
  - Right Ascension and Declination numbers (`RA: 269.452°`).
  - UTC ISO Timestamps (`2026-02-15 00:00:00 UTC`).
  - Observation sequence indicators (`Observation 1 of 4`).
  - Angular offsets and coverage parameters (`0.004° offset`).
- **Feature Setting**: Enforces tabular numerals (`font-variant-numeric: tabular-nums`) so numbers do not jump or shift width during timeline stepping.

### 4.2 Interface & Editorial Stack: Clean Scientific Sans
- **Font Stack**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`
- **Application**:
  - Global title and mission masthead.
  - Target names, constellation labels, and physical descriptions.
  - Interactive button text and validation banners.
- **Characteristics**: Neutral, highly legible at small sizes (11–13px), generous x-height, clear optical kerning.

---

## 5. Structural Surface Language & Micro-Details

1. **Bezel Radii**:
   - Strict micro-radii: **$2\text{px}$ to $4\text{px}$ maximum**.
   - No round pill-shaped containers or circular cartoon buttons. The interface feels assembled from machined metal instrument plates.
2. **Hairline Dividers**:
   - Containers are partitioned using crisp 1px borders (`#2a323d`).
   - Inner dividers use subtle horizontal rules to establish editorial structure.
3. **Restrained Motion (Max 100ms)**:
   - Button hovers and active states use immediate or 100ms linear transitions.
   - Zero bounce, spring, or parallax effects. Observation images crossfade instantly or within 80ms to allow the human eye to detect genuine astronomical pixel changes between epochs.
4. **Deliberate Whitespace & Spatial Rhythm**:
   - Built on a strict 4px/8px modular grid ($4\text{px}, 8\text{px}, 16\text{px}, 24\text{px}, 32\text{px}$).
   - High information density without visual crowding.

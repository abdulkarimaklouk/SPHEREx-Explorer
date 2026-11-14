---
description: Enforces UI/UX design precedence, accessibility, responsive standards, and interaction patterns.
trigger: model_decision
---

# UI/UX Standards Governance

## Design Precedence & Interface Standards

1. **Phase 3 Design Precedence**:
   - A dedicated and complete UI/UX design phase (Phase 3) must be finished and formally approved before any frontend React implementation (Phase 5) commences.
   - Do not write presentation component code during design phases.
2. **Visual Hierarchy & Distinctive Identity**:
   - Maintain a strong, logical hierarchy: Header & Mock Banner -> Coordinate Search & Challenge Target Selectors -> Sky Viewport -> Target & Observation Metadata -> Timeline Controls.
   - Craft a distinctive, professional astronomical interface avoiding generic template styling.
   - Do not prescribe a rigid final palette before Phase 3 design work is executed.
3. **Responsive Viewport Support**:
   - Layout must adapt gracefully across mobile (< 768px), tablet (768px - 1024px), and desktop (> 1024px) screens.
   - Prevent clipping, layout shifts, or horizontal scrollbars. Touch targets must be comfortably operable ($\ge 44 \times 44\text{px}$).
4. **Accessibility (WCAG 2.1 AA)**:
   - Ensure text and icon contrast ratios achieve at least 4.5:1 against dark celestial backgrounds.
   - All interactive controls (inputs, buttons, scrubber sliders) must be fully operable via keyboard navigation with visible focus indicators.
5. **Predictable Interaction Patterns**:
   - Buttons must clearly reflect `active`, `hover`, and `disabled` states.
   - Timeline controls must disable `Previous` at observation 1, disable `Next` at observation 4, and stop auto-playback automatically on the final observation.

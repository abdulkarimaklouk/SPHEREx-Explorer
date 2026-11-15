# 02 — User Flows & Interaction Journeys

**Project**: SPHEREx Explorer
**Challenge**: 2026 NASA Space Apps Challenge
**Phase**: Phase 3 — Dedicated UI/UX Design (TASK-301)
**Status**: Design Specification (Awaiting Review & Approval)
**Last Updated**: 2026-11-14

---

## 1. Flow Overview & Architectural Mapping

The user journeys in SPHEREx Explorer map directly to the domain service (`observationService.js`) and the state coordinator hook (`useObservationExplorer.js`).

All journeys respect the core architectural constraints:
- Pure client-side execution.
- Decimal degree inputs ($0.0 \le \text{RA} < 360.0$, $-90.0 \le \text{Dec} \le +90.0$).
- Spatial matching against documented per-target mock field coverage boundaries.
- Strictly ascending chronological UTC timestamps.
- Automated playback halting at the final observation (Observation 4).
- Zero scientific calculation or image analysis.

---

## 2. Primary User Journeys

### 2.1 Journey A: Explore a Preset Challenge Target

This is the primary happy path for first-time visitors and evaluators exploring the five NASA challenge objects.

```mermaid
flowchart TD
    Start([User Opens Application]) --> Init[App initializes default state<br/>Loads preset target list]
    Init --> SelectTarget[User clicks one of the 5 Challenge Target Pills<br/>e.g., 'Barnard's Star']
    SelectTarget --> ServiceCall[observationService.getTargetById 'barnards-star']
    ServiceCall --> LoadData[Load Target Record & 4 Sorted Observations]
    LoadData --> ResetState[Hook resets epoch index to 0<br/>Halts playback if running]
    ResetState --> RenderUI[Update UI Viewport]

    subgraph UI_Updates ["Synchronized Viewport Display"]
        RenderUI --> ShowImage[SkyViewer displays Observation 1 of 4 image]
        RenderUI --> ShowMeta[ObservationInfo displays verified catalog info & UTC timestamp]
        RenderUI --> ShowControls[TimelineControls enables Next, disables Previous, sets Scrubber to 1]
        RenderUI --> ShowCoords[SearchPanel displays target catalog coordinates]
    end

    ShowControls --> UserAction{User Timeline Action}

    UserAction -->|Click Next| StepNext[Increment sequence index to 2<br/>Update image & metadata]
    UserAction -->|Click Play| AutoPlay[Start 1200ms timer<br/>Step through observations]
    UserAction -->|Scrub Slider| JumpEpoch[Directly set sequence index to N<br/>Update image & metadata]

    AutoPlay --> PlayLoop{Reached Observation 4?}
    PlayLoop -->|No| StepNext
    PlayLoop -->|Yes| HaltPlay[Clear Timer<br/>Set isPlaying = false<br/>Disable Next button<br/>Highlight Final State]
    HaltPlay --> InspectEnd([User inspects final observation state])
```

#### Step-by-Step Experience Detail:
1. **Entry**: App loads with the first challenge target (Barnard's Star) preselected by default to prevent a blank, confusing empty canvas.
2. **Target Switch**: User clicks another pill (e.g., `WISE 0855`).
3. **State Mutation**: `currentObservationIndex` resets to `0` (Observation 1). Any active playback timer is cleared immediately.
4. **Visual Synchronization**:
   - `SkyViewer` renders the local synthetic image asset for Observation 1.
   - `ObservationInfo` displays verified factual information (Designation, Constellation, Catalog Coordinates, Reference Citation) along with synthetic observation parameters (Timestamp, Sequence 1 of 4, `MOCK DATA` badge).
   - `TimelineControls` shows Scrubber at tick 1, `Previous` disabled, `Next` enabled.
5. **Playback**: Clicking `Play` steps through observations 2, 3, and 4 at 1200ms intervals. Upon reaching Observation 4, the timer terminates automatically, button reverts to `Play`, and `Next` becomes disabled.

---

### 2.2 Journey B: Search by Coordinates & Field Coverage Matching

This journey handles users entering custom celestial coordinates (RA and Dec) to find corresponding demonstration sky fields.

```mermaid
flowchart TD
    StartSearch([User Navigates to Search Panel]) --> InputRA[User types RA in decimal degrees]
    InputRA --> InputDec[User types Dec in decimal degrees]
    InputDec --> ValidateInput{Valid Numbers & Domains?<br/>0 <= RA < 360<br/>-90 <= Dec <= 90}

    ValidateInput -->|No: Non-numeric / Empty| ShowTypeError[Display inline error: 'Please enter valid numerical degrees'<br/>Disable Search button]
    ValidateInput -->|No: Out of Bounds| ShowBoundError[Display inline error: 'RA must be 0-359.99°, Dec -90 to +90°'<br/>Disable Search button]

    ValidateInput -->|Yes| EnableSearch[Enable 'Search Field' Button]
    EnableSearch --> ClickSearch[User clicks 'Search Field']

    ClickSearch --> ComputeDist[observationService.findTargetByCoordinates ra, dec]
    ComputeDist --> CheckCoverage{Separation <= target.fieldCoverageDegrees?}

    CheckCoverage -->|Yes: Target Field Matched| MatchFound[Resolve closest target record]
    MatchFound --> TranspUI[Coordinate Transparency View]

    subgraph Transparency ["Coordinate Transparency Display"]
        TranspUI --> DispReq[Show User Requested: RA, Dec]
        TranspUI --> DispCenter[Show Target Catalog Center: RA, Dec]
        TranspUI --> DispSep[Show Angular Separation & Coverage Status]
    end

    TranspUI --> LoadObservations[Load 4 demonstration observations for matched field]
    LoadObservations --> SuccessEnd([User explores observation sequence])

    CheckCoverage -->|No: Outside All Coverage| NoMatch[Return null / No Match Found]
    NoMatch --> ShowFallback[Render Friendly Empty State:<br/>'No mock observations available in this field'<br/>Display quick-select challenge target chips]
    ShowFallback --> FallbackAction{User Chooses Target}
    FallbackAction -->|Click Target Chip| SelectTarget[Load Selected Challenge Target]
```

#### Step-by-Step Experience Detail:
1. **Input Interaction**: User enters `269.45` into RA and `4.69` into Dec.
2. **Instant Validation**: Inputs validate on blur/change. If out of bounds (e.g., `Dec: 105.0`), an amber inline warning appears: *"Declination must be between -90.0° and +90.0°"*, and the submit button is disabled.
3. **Execution**: User clicks "Search Field".
4. **Spatial Resolution**: `observationService` computes great-circle angular separation between `(269.45, 4.69)` and the catalog centers of all five challenge targets.
5. **Coverage Evaluation**:
   - The separation to Barnard's Star center `(269.452, 4.693)` is calculated as $\approx 0.0037^\circ$ ($\approx 13$ arcseconds).
   - This falls well within Barnard's Star configured mock demonstration field coverage.
6. **Coordinate Transparency Rendering**:
   - The UI displays the demonstration frames.
   - Crucially, the metadata panel prominently displays:
     - `Requested: RA 269.450°, Dec +4.690°`
     - `Matched Field Center: RA 269.452°, Dec +4.693°`
     - `Offset: 0.004° from field center`
7. **No-Match Recovery**: If user enters `RA 100.0, Dec 20.0` (outside all 5 target fields), the viewer gracefully transitions into an empty field state: *"No mock demonstration observations are configured in this sky field. Select one of the five NASA challenge targets below to explore active fields."*

---

### 2.3 Journey C: Inspect Multi-Epoch Temporal Changes

This journey describes the analytical exploration of an observation sequence over time.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Viewer as SkyViewer
    participant Meta as ObservationInfo
    participant Controls as TimelineControls
    participant State as useObservationExplorer

    Note over User,State: Target Loaded: Barnard's Star (Proper Motion Demonstration)
    User->>Viewer: Inspect Observation 1 (Epoch 2026-02-15)
    Viewer-->>User: Displays initial star field image frame
    Meta-->>User: Reads UTC timestamp: 2026-02-15 00:00:00 UTC

    User->>Controls: Clicks 'Next ▶'
    Controls->>State: incrementObservation()
    State-->>Viewer: Observation 2 (Epoch 2026-05-15)
    State-->>Meta: Sequence: 2 of 4 | Timestamp: 2026-05-15 00:00:00 UTC
    Viewer-->>User: Renders frame 2 (demonstrating position displacement)

    User->>Controls: Clicks '▶ Play'
    Controls->>State: togglePlay(true)
    loop Every 1200ms
        State-->>Viewer: Advance to Observation 3, then 4
        State-->>Meta: Update timestamp to 2026-08-15, then 2026-11-15
    end
    Note over State: Reached Observation 4 (Final Frame)
    State->>Controls: Auto-stop playback, set isPlaying = false
    Controls-->>User: Button returns to 'Play', Next is disabled
    Meta-->>User: Final state highlighted: Observation 4 of 4
```

---

## 3. Edge Cases & Error Recovery Paths

| Edge Case | User Condition | System Response | Recovery Path |
| :--- | :--- | :--- | :--- |
| **Out-of-Bounds Coordinate** | User types RA: `410.0` or Dec: `-95.0`. | Real-time inline validation banner; "Search Field" button disabled. | User corrects numerical value within valid astronomical bounds. |
| **Non-Numeric / Text Input** | User pastes `18h 30m 00s` or alpha characters. | Field highlights amber; inline message: *"Please enter decimal degrees (e.g. 180.25)"*. | User re-enters value in decimal degrees. |
| **Uncovered Sky Coordinates** | User enters coordinates in unobserved sky region. | Returns clean fallback view; sky viewer displays placeholder field grid; no crash. | One-click chips allow instant jump to any of the 5 challenge targets. |
| **Image Asset Missing / 404** | Image file missing from `public/images/demo/`. | Viewport catches image `onError` and displays an accessible framing box: *"Demonstration graphic unavailable for this epoch"*. | User can step forward or select another target without app disruption. |
| **Scrubbing During Playback** | User drags scrubber slider while auto-play is running. | Scrubber interaction immediately clears the auto-play timer and pauses playback. | Observation updates smoothly to the scrubbed position; user can click Play to resume. |

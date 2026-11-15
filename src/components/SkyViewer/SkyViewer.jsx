import { useState, useEffect, useRef } from 'react';
import './SkyViewer.css';
import { renderFitsToCanvas } from '../../utils/fitsParser.js';

export function SkyViewer({
  selectedTarget,
  currentFrameIndex = 0,
  totalFrames = 4,
  currentObservation,
  searchStatus,
  requestedCoords,
  onSelectTarget,
  // Authentic FITS & WiseView-inspired controls
  activeFitsData = null,
  allFitsData = [],
  isFitsLoading = false,
  fitsError = null,
  viewMode = 'side-by-side',
  setViewMode,
  stretch = 'asinh',
  setStretch,
  invertColormap = false,
  setInvertColormap,
  minStretch = -1.5,
  maxStretch = 25.0,
  setStretchRange,
  zoomLevel = 2.0,
  zoomIn,
  zoomOut,
  resetZoom,
  isPlaying = false,
  onPrev,
  onNext,
  onTogglePlay,
  blinkIntervalMs = 800,
  setBlinkIntervalMs,
  sia2Status = null,
}) {
  const isNoMatch = searchStatus === 'no-match' || searchStatus === 'no-match-archive';
  const isRealFits = Boolean(activeFitsData || allFitsData.length > 0 || currentObservation?.isRealFits);

  // References to the canvases
  const blinkCanvasRef = useRef(null);
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);

  // Dynamic image source for synthetic demonstration targets
  const imageSource = currentObservation?.imageUrl || currentObservation?.imagePath || null;
  const [demoImageStatus, setDemoImageStatus] = useState(() => (imageSource ? 'loading' : 'none'));

  useEffect(() => {
    if (isRealFits || !imageSource) {
      setDemoImageStatus('none');
      return undefined;
    }

    setDemoImageStatus('loading');
    let isCancelled = false;

    const img = new Image();
    img.src = imageSource;

    img.onload = () => {
      if (!isCancelled) setDemoImageStatus('loaded');
    };
    img.onerror = () => {
      if (!isCancelled) setDemoImageStatus('error');
    };

    return () => {
      isCancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSource, isRealFits]);

  // Render authentic FITS data to canvas(es)
  useEffect(() => {
    if (!isRealFits) return;

    const renderOpts = {
      min: minStretch,
      max: maxStretch,
      stretch,
      invert: invertColormap,
      beta: 0.5,
    };

    // 1. Single / Blink Canvas
    if (blinkCanvasRef.current && activeFitsData) {
      const [w, h] = activeFitsData.dimensions;
      renderFitsToCanvas(activeFitsData.pixelData, w, h, blinkCanvasRef.current, renderOpts);
    }

    // 2. Dual Side-by-Side Canvases
    if (allFitsData.length >= 2) {
      const frame1 = allFitsData[0].fitsData;
      const frame2 = allFitsData[1].fitsData;

      if (leftCanvasRef.current && frame1) {
        renderFitsToCanvas(frame1.pixelData, frame1.dimensions[0], frame1.dimensions[1], leftCanvasRef.current, renderOpts);
      }
      if (rightCanvasRef.current && frame2) {
        renderFitsToCanvas(frame2.pixelData, frame2.dimensions[0], frame2.dimensions[1], rightCanvasRef.current, renderOpts);
      }
    }
  }, [isRealFits, activeFitsData, allFitsData, minStretch, maxStretch, stretch, invertColormap, viewMode]);

  // Simulated star graphics for the 5 challenge targets
  const getTargetStarGraphics = () => {
    if (!selectedTarget) return null;

    const id = selectedTarget.id;
    const epoch = currentFrameIndex;

    if (id === 'barnards-star') {
      const startX = 280;
      const startY = 270;
      const dx = 14;
      const dy = -16;
      const currentX = startX + epoch * dx;
      const currentY = startY + epoch * dy;

      return (
        <g id="barnard-proper-motion-group">
          <line
            x1={startX}
            y1={startY}
            x2={startX + 3 * dx}
            y2={startY + 3 * dy}
            stroke="rgba(229, 147, 36, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {[0, 1, 2, 3].map((ep) => (
            <circle
              key={ep}
              cx={startX + ep * dx}
              cy={startY + ep * dy}
              r={ep === epoch ? 3.5 : 2}
              fill={ep === epoch ? '#f0a238' : 'rgba(245, 244, 239, 0.3)'}
            />
          ))}
          <circle cx={currentX} cy={currentY} r="7" fill="#f0a238" />
          <circle cx={currentX} cy={currentY} r="14" fill="none" stroke="#f0a238" strokeWidth="1" opacity="0.6" />
          <text x={currentX + 16} y={currentY + 4} fill="#f5f4ef" fontSize="11" fontFamily="var(--font-mono)">
            {"Barnard's Star"}
          </text>
        </g>
      );
    }

    if (id === 'rw-aurigae') {
      const radii = [7.5, 4.0, 3.2, 6.8];
      const opacities = [1.0, 0.55, 0.4, 0.9];
      const r = radii[epoch] || 6;
      const op = opacities[epoch] || 0.8;

      return (
        <g id="rw-aur-group">
          <ellipse cx="300" cy="250" rx="32" ry="12" fill="none" stroke="rgba(229, 147, 36, 0.3)" strokeWidth="1" transform="rotate(-25 300 250)" />
          <circle cx="295" cy="248" r={r} fill="#e59324" opacity={op} />
          <circle cx="295" cy="248" r={r * 1.8} fill="none" stroke="#e59324" strokeWidth="1" opacity={op * 0.5} />
          <circle cx="316" cy="254" r="3.5" fill="#f5f4ef" opacity="0.85" />
          <text x="325" y="240" fill="#f5f4ef" fontSize="11" fontFamily="var(--font-mono)">
            RW Aurigae A+B (Occulting Disk)
          </text>
        </g>
      );
    }

    if (id === 'r-draconis') {
      const radii = [9.5, 5.5, 3.5, 8.0];
      const r = radii[epoch] || 7;

      return (
        <g id="r-dra-group">
          <circle cx="300" cy="250" r={r} fill="#e55353" />
          <circle cx="300" cy="250" r={r * 2.2} fill="none" stroke="#e55353" strokeWidth="1.5" opacity="0.45" />
          <circle cx="300" cy="250" r={r * 3.5} fill="none" stroke="#e55353" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          <text x="318" y="254" fill="#f5f4ef" fontSize="11" fontFamily="var(--font-mono)">
            R Draconis (Mira Pulsation)
          </text>
        </g>
      );
    }

    if (id === 'wise-0855') {
      return (
        <g id="wise-0855-group">
          <circle cx="300" cy="250" r="3.5" fill="#a86d2e" />
          <circle cx="300" cy="250" r="9" fill="none" stroke="#a86d2e" strokeWidth="1" opacity="0.7" />
          <circle cx="300" cy="250" r="18" fill="none" stroke="#a86d2e" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
          <text x="316" y="254" fill="#c0c0b8" fontSize="11" fontFamily="var(--font-mono)">
            WISE 0855 (Sub-stellar Y-Dwarf)
          </text>
        </g>
      );
    }

    // Default: Epsilon Indi B
    return (
      <g id="eps-ind-group">
        <circle cx="294" cy="248" r="4.2" fill="#739481" />
        <circle cx="306" cy="252" r="3.2" fill="#739481" opacity="0.8" />
        <circle cx="300" cy="250" r="18" fill="none" stroke="#739481" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <text x="320" y="254" fill="#f5f4ef" fontSize="11" fontFamily="var(--font-mono)">
          Eps Indi Ba + Bb (Binary System)
        </text>
      </g>
    );
  };

  const isDemoImageRendered = !isRealFits && demoImageStatus === 'loaded';

  // Extract metadata for the two frames if available
  const obs1 = allFitsData[0]?.observation || null;
  const fits1 = allFitsData[0]?.fitsData || null;
  const obs2 = allFitsData[1]?.observation || null;
  const fits2 = allFitsData[1]?.fitsData || null;

  const showSideBySide = isRealFits && viewMode === 'side-by-side' && allFitsData.length >= 2;

  // Coordinates for reticle readout
  const centerRa = activeFitsData?.wcs?.crval1 ?? selectedTarget?.ra ?? 0;
  const centerDec = activeFitsData?.wcs?.crval2 ?? selectedTarget?.dec ?? 0;

  return (
    <main className="sky-viewer-container" aria-label="Celestial Observation Stage">
      {/* Viewport Top Header */}
      <div className="sky-viewer-header">
        <div className="sky-viewer-target-title">
          <span>{selectedTarget ? selectedTarget.name : 'Target Field'}</span>
          <span className="sky-viewer-epoch-badge">
            {showSideBySide ? 'Dual Frame Comparison' : `Frame ${currentFrameIndex + 1} of ${totalFrames}`}
          </span>
          {currentObservation && !showSideBySide && (
            <span className="mono-nums sky-viewer-epoch-timestamp">
              • {currentObservation.timestamp.replace('T', ' ').replace('Z', ' UTC')}
            </span>
          )}
        </div>
        <div className="sky-viewer-header-right">
          {isRealFits ? (
            <>
              <span className="sky-viewer-status-pill pill-fits-real">
                Authentic SPHEREx FITS (117×117)
              </span>
              <span className="sky-viewer-status-pill pill-band">
                Band 1 (0.75 - 1.11 µm)
              </span>
            </>
          ) : (
            <>
              {demoImageStatus === 'error' && (
                <span className="sky-viewer-status-pill">Vector Placeholder</span>
              )}
              {demoImageStatus === 'loaded' && (
                <span className="sky-viewer-status-pill asset-active">Demo Graphic</span>
              )}
              <span className="sky-viewer-fov-tag">Demo field coverage: Not configured</span>
            </>
          )}
        </div>
      </div>

      {/* WiseView Interactive Toolbar */}
      <div className="wiseview-toolbar" role="toolbar" aria-label="Astronomical Image Controls">
        {/* Mode Switcher: Side-by-Side vs Blink Mode (When Real FITS is active) */}
        {isRealFits && (
          <>
            <div className="toolbar-group mode-toggle-group">
              <button
                type="button"
                className={`btn-toolbar-toggle ${viewMode === 'side-by-side' ? 'active' : ''}`}
                onClick={() => setViewMode && setViewMode('side-by-side')}
                title="View Both Frames Side-by-Side"
              >
                ⊞ Side-by-Side
              </button>
              <button
                type="button"
                className={`btn-toolbar-toggle ${viewMode === 'blink' ? 'active' : ''}`}
                onClick={() => setViewMode && setViewMode('blink')}
                title="Blink Comparison Mode"
              >
                ◐ Blink Mode
              </button>
            </div>
            <div className="toolbar-divider" />
          </>
        )}

        {/* Blink Transport (Always active in Blink Mode or Preset Mode) */}
        {(!showSideBySide) && (
          <>
            <div className="toolbar-group transport-mini-group">
              <button
                type="button"
                className="btn-toolbar-icon"
                onClick={onPrev}
                disabled={currentFrameIndex === 0}
                title="Previous Frame"
                aria-label="Previous Frame"
              >
                ◀
              </button>
              <button
                type="button"
                className={`btn-toolbar-icon btn-toolbar-play ${isPlaying ? 'active' : ''}`}
                onClick={onTogglePlay}
                title={isPlaying ? 'Pause Blink' : 'Start Blink Comparison'}
                aria-label={isPlaying ? 'Pause Blink' : 'Start Blink Comparison'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                type="button"
                className="btn-toolbar-icon"
                onClick={onNext}
                disabled={currentFrameIndex >= totalFrames - 1}
                title="Next Frame"
                aria-label="Next Frame"
              >
                ▶
              </button>

              <div className="toolbar-select-wrap" title="Blink Interval Cadence">
                <label htmlFor="blink-cadence-select" className="sr-only">Blink Speed</label>
                <select
                  id="blink-cadence-select"
                  className="toolbar-select"
                  value={blinkIntervalMs}
                  onChange={(e) => setBlinkIntervalMs && setBlinkIntervalMs(Number(e.target.value))}
                >
                  <option value={500}>500ms (Fast)</option>
                  <option value={800}>800ms (Blink)</option>
                  <option value={1200}>1200ms</option>
                  <option value={2000}>2000ms (Slow)</option>
                </select>
              </div>
            </div>
            <div className="toolbar-divider" />
          </>
        )}

        {/* Stretch & Invert (WiseView style) */}
        <div className="toolbar-group stretch-group">
          <button
            type="button"
            className={`btn-toolbar-toggle ${stretch === 'asinh' ? 'active' : ''}`}
            onClick={() => setStretch && setStretch(stretch === 'asinh' ? 'linear' : 'asinh')}
            title="Toggle between Asinh and Linear stretch"
          >
            {stretch.toUpperCase()}
          </button>

          <button
            type="button"
            className={`btn-toolbar-toggle ${invertColormap ? 'active' : ''}`}
            onClick={() => setInvertColormap && setInvertColormap(!invertColormap)}
            title="Invert Colormap (WiseView Dark Stars on Light Background)"
          >
            {invertColormap ? 'Inverted (B/W)' : 'Standard (W/B)'}
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Min / Max Stretch Sliders */}
        <div className="toolbar-group slider-group">
          <label className="slider-label" htmlFor="min-stretch-slider">
            <span>Min:</span>
            <input
              id="min-stretch-slider"
              type="range"
              min="-3.0"
              max="5.0"
              step="0.2"
              value={minStretch}
              onChange={(e) => setStretchRange && setStretchRange({ min: parseFloat(e.target.value) })}
              className="toolbar-range"
            />
            <span className="slider-val mono-nums">{minStretch.toFixed(1)}</span>
          </label>

          <label className="slider-label" htmlFor="max-stretch-slider">
            <span>Max:</span>
            <input
              id="max-stretch-slider"
              type="range"
              min="5.0"
              max="80.0"
              step="2.0"
              value={maxStretch}
              onChange={(e) => setStretchRange && setStretchRange({ max: parseFloat(e.target.value) })}
              className="toolbar-range"
            />
            <span className="slider-val mono-nums">{maxStretch.toFixed(0)}</span>
          </label>
        </div>

        <div className="toolbar-divider" />

        {/* Zoom Controls (Synchronized across both frames) */}
        <div className="toolbar-group zoom-group">
          <button
            type="button"
            className="btn-toolbar-icon"
            onClick={zoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            −
          </button>
          <span className="toolbar-zoom-text mono-nums">
            {(zoomLevel * 100).toFixed(0)}%
          </span>
          <button
            type="button"
            className="btn-toolbar-icon"
            onClick={zoomIn}
            title="Zoom In"
            aria-label="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            className="btn-toolbar-text"
            onClick={resetZoom}
            title="Reset Zoom"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Astronomical Canvas Viewport */}
      <div className="sky-viewer-canvas-wrap">
        {/* Loading Spinner for FITS array buffer or demo image */}
        {(isFitsLoading || (!isRealFits && demoImageStatus === 'loading')) && (
          <div className="sky-viewer-loading-spinner" role="status" aria-live="polite">
            <span className="spinner-dot" aria-hidden="true" />
            <span>{isFitsLoading ? 'Parsing SPHEREx FITS Images...' : 'Loading observation image...'}</span>
          </div>
        )}

        {/* Error Notification */}
        {fitsError && (
          <div className="fits-error-banner" role="alert">
            ⚠️ {fitsError}
          </div>
        )}

        {/* 1. SIDE-BY-SIDE DUAL VIEW (When active and real data is loaded) */}
        {showSideBySide && (
          <div className="side-by-side-dual-stage">
            {/* Left Pane: Frame 1 */}
            <div className="dual-pane-card">
              <div className="dual-pane-meta mono-nums">
                <span className="pane-tag">Frame 1</span>
                <span className="pane-obs-id">{obs1?.id || '2025W19_2B_0007_1'}</span>
                <span className="pane-timestamp">
                  {obs1?.timestamp ? obs1.timestamp.replace('T', ' ').replace('Z', ' UTC') : '12:32:42 UTC'}
                </span>
                <span className="pane-band">Band 1 (0.75-1.11µm)</span>
              </div>
              <div
                className="dual-canvas-frame"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <canvas
                  ref={leftCanvasRef}
                  width={117}
                  height={117}
                  className="fits-native-canvas"
                  aria-label="Observation Frame 1 (0007_1)"
                />
              </div>
              <div className="dual-pane-footer mono-nums">
                <span>Center: RA {fits1?.wcs?.crval1.toFixed(3) || '318.275'}°, Dec +{fits1?.wcs?.crval2.toFixed(3) || '17.589'}°</span>
                <span>Peak: +174.99 MJy/sr</span>
              </div>
            </div>

            {/* Center Cadence Divider */}
            <div className="dual-pane-divider">
              <div className="divider-line" />
              <div className="dual-delta-pill mono-nums">
                <span className="delta-tag">Δt Cadence</span>
                <span className="delta-val">+2m 09s</span>
                <span className="delta-sub">(128.9s)</span>
              </div>
              <div className="divider-line" />
            </div>

            {/* Right Pane: Frame 2 */}
            <div className="dual-pane-card">
              <div className="dual-pane-meta mono-nums">
                <span className="pane-tag pane-tag-f2">Frame 2</span>
                <span className="pane-obs-id">{obs2?.id || '2025W19_2B_0007_2'}</span>
                <span className="pane-timestamp">
                  {obs2?.timestamp ? obs2.timestamp.replace('T', ' ').replace('Z', ' UTC') : '12:34:51 UTC'}
                </span>
                <span className="pane-band">Band 1 (0.75-1.11µm)</span>
              </div>
              <div
                className="dual-canvas-frame"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <canvas
                  ref={rightCanvasRef}
                  width={117}
                  height={117}
                  className="fits-native-canvas"
                  aria-label="Observation Frame 2 (0007_2)"
                />
              </div>
              <div className="dual-pane-footer mono-nums">
                <span>Center: RA {fits2?.wcs?.crval1.toFixed(3) || '318.213'}°, Dec +{fits2?.wcs?.crval2.toFixed(3) || '17.777'}°</span>
                <span>Peak: +69.17 MJy/sr</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. SINGLE CANVAS VIEW (Blink Mode or Single Frame) */}
        {(!showSideBySide && isRealFits) && (
          <div
            className="fits-canvas-viewport"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
          >
            <canvas
              ref={blinkCanvasRef}
              width={activeFitsData?.dimensions[0] || 117}
              height={activeFitsData?.dimensions[1] || 117}
              className="fits-native-canvas"
              aria-label={`Authentic SPHEREx Level 2 FITS observation, frame ${currentFrameIndex + 1} of ${totalFrames}`}
            />
          </div>
        )}

        {/* 3. Synthetic Demo Image (When viewing mock presets with image assets) */}
        {isDemoImageRendered && (
          <img
            src={imageSource}
            alt={`Observation sequence frame ${currentFrameIndex + 1} for ${selectedTarget?.name}`}
            className="sky-observation-image"
          />
        )}

        {/* Celestial Compass (North Up / East Left) */}
        <div className="celestial-compass" aria-hidden="true">
          <svg className="compass-svg" viewBox="0 0 40 40" fill="none">
            <line x1="20" y1="20" x2="20" y2="6" stroke="#c0c0b8" strokeWidth="1.5" />
            <polygon points="20,2 17,7 23,7" fill="#c0c0b8" />
            <text x="20" y="3" textAnchor="middle" fill="#f5f4ef" fontSize="8" fontWeight="bold">N</text>

            <line x1="20" y1="20" x2="6" y2="20" stroke="#c0c0b8" strokeWidth="1.5" />
            <polygon points="2,20 7,17 7,23" fill="#c0c0b8" />
            <text x="0" y="23" textAnchor="start" fill="#f5f4ef" fontSize="8" fontWeight="bold">E</text>

            <circle cx="20" cy="20" r="2" fill="#959ba5" />
          </svg>
        </div>

        {/* Reticle Center Coordinate Readout (Single Frame / Blink Mode) */}
        {!showSideBySide && (
          <div className="reticle-readout">
            Center:{' '}
            <span className="reticle-coord-highlight mono-nums">
              RA {centerRa.toFixed(4)}°, Dec {centerDec >= 0 ? '+' : ''}{centerDec.toFixed(4)}°
            </span>
          </div>
        )}

        {/* Optical Bench Reticle Overlay (Only in Single Frame / Blink Mode) */}
        {!showSideBySide && (
          <svg
            className="sky-svg-viewport sky-svg-reticle-overlay"
            viewBox="0 0 600 500"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Optical Reticle and Crosshair Overlay"
          >
            {/* Background Reference Stars for Vector Fallbacks */}
            {!isRealFits && !isDemoImageRendered && (
              <g id="reference-stars" fill="#f5f4ef" opacity="0.6">
                <circle cx="75" cy="80" r="1.2" />
                <circle cx="120" cy="140" r="1.5" />
                <circle cx="190" cy="70" r="0.9" />
                <circle cx="95" cy="340" r="1.8" opacity="0.8" />
                <circle cx="160" cy="410" r="1.1" />
                <circle cx="230" cy="380" r="1.4" />
                <circle cx="380" cy="85" r="1.3" />
                <circle cx="450" cy="120" r="1.6" />
                <circle cx="510" cy="75" r="0.8" />
                <circle cx="410" cy="390" r="1.2" />
                <circle cx="485" cy="430" r="1.7" opacity="0.9" />
                <circle cx="530" cy="360" r="1.0" />
                <circle cx="260" cy="110" r="1.0" />
                <circle cx="340" cy="440" r="1.2" />
                <circle cx="50" cy="230" r="0.8" />
                <circle cx="550" cy="220" r="1.1" />
              </g>
            )}

            {/* Hairline Crosshairs and Rings */}
            <g id="reticle-overlays" stroke="#2d3642" strokeWidth="1" fill="none" opacity="0.85">
              <circle cx="300" cy="250" r="45" strokeDasharray="3 3" />
              <circle cx="300" cy="250" r="115" />
              <circle cx="300" cy="250" r="210" strokeDasharray="4 4" />

              <line x1="300" y1="20" x2="300" y2="480" stroke="#2d3642" strokeWidth="1" />
              <line x1="20" y1="250" x2="580" y2="250" stroke="#2d3642" strokeWidth="1" />

              <line x1="290" y1="250" x2="310" y2="250" stroke="var(--color-accent-amber)" strokeWidth="1.2" />
              <line x1="300" y1="240" x2="300" y2="260" stroke="var(--color-accent-amber)" strokeWidth="1.2" />
            </g>

            {/* Dynamic Celestial Target Graphics for Mock Presets */}
            {!isRealFits && !isDemoImageRendered && getTargetStarGraphics()}
          </svg>
        )}

        {/* Mandatory Provenance Watermark */}
        <div className="sky-viewer-watermark" aria-label="Scientific Provenance Notice">
          <span className={`watermark-dot ${isRealFits ? 'dot-real-fits' : ''}`} />
          <span>
            {isRealFits
              ? 'AUTHENTIC SPHEREx LEVEL 2 ARCHIVE DATA (DR1)'
              : (currentObservation?.isMock
                ? 'SYNTHETIC DEMONSTRATION OBSERVATION (MOCK)'
                : 'ILLUSTRATIVE PLACEHOLDER — NOT SCIENTIFIC DATA')}
          </span>
        </div>

        {/* Outside Pilot Index Notification */}
        {(isNoMatch || totalFrames === 0) && (
          <div className="no-match-overlay" role="region" aria-label="Archive Coverage Notification">
            <div className="no-match-card">
              <div className="no-match-icon">🔭</div>
              <h3 className="no-match-title">
                Not covered by the current pilot index. Full archive discovery is currently unavailable.
              </h3>
              <p className="no-match-desc">
                Target <strong>{selectedTarget?.name || 'Requested Field'}</strong> (RA {requestedCoords?.ra.toFixed(4)}°, Dec {requestedCoords?.dec >= 0 ? '+' : ''}{requestedCoords?.dec.toFixed(4)}°) is not included in the available DR1 pilot spatial index (Survey Week 2025W19_2B).
              </p>
              <div className="archive-unavailable-box mono-nums">
                <span className="gateway-badge">IRSA ARCHIVE STATUS</span>
                <span>{sia2Status?.message || 'IRSA SIA2 Gateway: Upstream service unreachable (HTTP 502 Proxy Error observed)'}</span>
              </div>
              <p className="no-match-clarification">
                SPHEREx performs an all-sky survey covering all celestial coordinates. Discovery for this sky region requires active IPAC/IRSA SIA2 server connectivity.
              </p>
              <button
                type="button"
                className="btn-quick-target btn-quick-target-pilot"
                onClick={() => onSelectTarget && onSelectTarget('spherex-cal-field')}
              >
                ⚡ View Working Demonstration (SPHEREx Calibration Field, RA 318.25°, Dec +17.65°)
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

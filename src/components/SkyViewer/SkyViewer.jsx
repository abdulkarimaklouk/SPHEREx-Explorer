import { useState, useEffect } from 'react';
import './SkyViewer.css';

export function SkyViewer({
  selectedTarget,
  currentFrameIndex = 0,
  totalFrames = 4,
  currentObservation,
  searchStatus,
  requestedCoords,
  angularOffset,
  nearestTarget,
  onSelectTarget,
  targets = [],
}) {
  const isNoMatch = searchStatus === 'no-match';

  // Dynamic image source from the selected observation record
  const imageSource = currentObservation?.imageUrl || currentObservation?.imagePath || null;

  // Track image lifecycle status: 'none' | 'loading' | 'loaded' | 'error'
  const [imageStatus, setImageStatus] = useState(() => (imageSource ? 'loading' : 'none'));

  useEffect(() => {
    if (!imageSource) {
      setImageStatus('none');
      return undefined;
    }

    setImageStatus('loading');
    let isCancelled = false;

    const img = new Image();
    img.src = imageSource;

    img.onload = () => {
      if (!isCancelled) {
        setImageStatus('loaded');
      }
    };

    img.onerror = () => {
      if (!isCancelled) {
        setImageStatus('error');
      }
    };

    return () => {
      isCancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSource]);

  // Compute simulated star offsets based on target and epoch (0..3)
  const getTargetStarGraphics = () => {
    if (!selectedTarget) return null;

    const id = selectedTarget.id;
    const epoch = currentFrameIndex; // 0, 1, 2, 3

    if (id === 'barnards-star') {
      // Proper motion demonstration: Star visibly shifts position across 4 epochs
      const startX = 280;
      const startY = 270;
      const dx = 14;
      const dy = -16;
      const currentX = startX + epoch * dx;
      const currentY = startY + epoch * dy;

      return (
        <g id="barnard-proper-motion-group">
          {/* Historical trajectory trail */}
          <line
            x1={startX}
            y1={startY}
            x2={startX + 3 * dx}
            y2={startY + 3 * dy}
            stroke="rgba(229, 147, 36, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Epoch positions markers */}
          {[0, 1, 2, 3].map((ep) => (
            <circle
              key={ep}
              cx={startX + ep * dx}
              cy={startY + ep * dy}
              r={ep === epoch ? 3.5 : 2}
              fill={ep === epoch ? '#f0a238' : 'rgba(245, 244, 239, 0.3)'}
            />
          ))}
          {/* Main proper motion star */}
          <circle cx={currentX} cy={currentY} r="7" fill="#f0a238" />
          <circle cx={currentX} cy={currentY} r="14" fill="none" stroke="#f0a238" strokeWidth="1" opacity="0.6" />
          <text
            x={currentX + 16}
            y={currentY + 4}
            fill="#f5f4ef"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            {"Barnard's Star"}
          </text>
        </g>
      );
    }

    if (id === 'rw-aurigae') {
      // Circumstellar disk occultation dimming
      const radii = [7.5, 4.0, 3.2, 6.8];
      const opacities = [1.0, 0.55, 0.4, 0.9];
      const r = radii[epoch] || 6;
      const op = opacities[epoch] || 0.8;

      return (
        <g id="rw-aur-group">
          <ellipse cx="300" cy="250" rx="32" ry="12" fill="none" stroke="rgba(229, 147, 36, 0.3)" strokeWidth="1" transform="rotate(-25 300 250)" />
          {/* Primary */}
          <circle cx="295" cy="248" r={r} fill="#e59324" opacity={op} />
          <circle cx="295" cy="248" r={r * 1.8} fill="none" stroke="#e59324" strokeWidth="1" opacity={op * 0.5} />
          {/* Secondary companion */}
          <circle cx="316" cy="254" r="3.5" fill="#f5f4ef" opacity="0.85" />
          <text x="325" y="240" fill="#f5f4ef" fontSize="11" fontFamily="var(--font-mono)">
            RW Aurigae A+B (Occulting Disk)
          </text>
        </g>
      );
    }

    if (id === 'r-draconis') {
      // Mira pulsating variable: Brightness / radius expansion
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
      // Sub-stellar Ultra-Cool Brown Dwarf: Very faint infrared point source
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

    // Default: Epsilon Indi B (Cold brown dwarf binary system)
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

  const isImageRendered = imageStatus === 'loaded';

  return (
    <main className="sky-viewer-container" aria-label="Celestial Observation Stage">
      {/* Viewport Top Header */}
      <div className="sky-viewer-header">
        <div className="sky-viewer-target-title">
          <span>{selectedTarget ? selectedTarget.name : 'Target Field'}</span>
          <span className="sky-viewer-epoch-badge">
            Observation {currentFrameIndex + 1} of {totalFrames}
          </span>
          {currentObservation && (
            <span className="mono-nums sky-viewer-epoch-timestamp">
              • {currentObservation.timestamp.replace('T', ' ').replace('Z', ' UTC')}
            </span>
          )}
        </div>
        <div className="sky-viewer-header-right">
          {imageStatus === 'error' && (
            <span className="sky-viewer-status-pill">
              Vector Placeholder (Asset Pending)
            </span>
          )}
          {imageStatus === 'loaded' && (
            <span className="sky-viewer-status-pill asset-active">
              Image Loaded
            </span>
          )}
          <span className="sky-viewer-fov-tag">
            Demo field coverage: Not configured
          </span>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div className="sky-viewer-canvas-wrap">
        {/* Loading Indicator */}
        {imageStatus === 'loading' && (
          <div className="sky-viewer-loading-spinner" role="status" aria-live="polite">
            <span className="spinner-dot" aria-hidden="true" />
            <span>Loading observation image...</span>
          </div>
        )}

        {/* Real Rendered Observation Image (When Available) */}
        {isImageRendered && (
          <img
            src={imageSource}
            alt={`Observation sequence frame ${currentFrameIndex + 1} for ${selectedTarget?.name}`}
            className="sky-observation-image"
          />
        )}

        {/* Celestial Orientation Compass (North / East) */}
        <div className="celestial-compass" aria-hidden="true">
          <svg className="compass-svg" viewBox="0 0 40 40" fill="none">
            {/* North arrow pointing UP */}
            <line x1="20" y1="20" x2="20" y2="6" stroke="#c0c0b8" strokeWidth="1.5" />
            <polygon points="20,2 17,7 23,7" fill="#c0c0b8" />
            <text x="20" y="3" textAnchor="middle" fill="#f5f4ef" fontSize="8" fontWeight="bold">N</text>

            {/* East arrow pointing LEFT (Astronomical Convention) */}
            <line x1="20" y1="20" x2="6" y2="20" stroke="#c0c0b8" strokeWidth="1.5" />
            <polygon points="2,20 7,17 7,23" fill="#c0c0b8" />
            <text x="0" y="23" textAnchor="start" fill="#f5f4ef" fontSize="8" fontWeight="bold">E</text>

            <circle cx="20" cy="20" r="2" fill="#959ba5" />
          </svg>
        </div>

        {/* Reticle Center Coordinate Readout */}
        <div className="reticle-readout">
          Center:{' '}
          <span className="reticle-coord-highlight mono-nums">
            RA {selectedTarget?.ra.toFixed(3)}°, Dec {selectedTarget?.dec >= 0 ? '+' : ''}{selectedTarget?.dec.toFixed(3)}°
          </span>
        </div>

        {/* The SVG Astronomical Field Graphic / Optical Reticle Overlay */}
        <svg
          className={`sky-svg-viewport ${isImageRendered ? 'sky-svg-reticle-overlay' : ''}`}
          viewBox="0 0 600 500"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={
            isImageRendered
              ? `Optical reticle overlay for ${selectedTarget?.name}, observation frame ${currentFrameIndex + 1}`
              : `Illustrative celestial observation graphic for ${selectedTarget?.name}, observation frame ${currentFrameIndex + 1} of ${totalFrames}`
          }
        >
          <defs>
            <radialGradient id="fieldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e2532" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#080a0f" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep celestial background gradient (shown when no image is loaded) */}
          {!isImageRendered && (
            <rect width="600" height="500" fill="url(#fieldGlow)" />
          )}

          {/* Background Fixed Reference Stars (shown when no image is loaded) */}
          {!isImageRendered && (
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

          {/* Optical Bench Reticle Rings & Crosshairs */}
          <g id="reticle-overlays" stroke="#2d3642" strokeWidth="1" fill="none" opacity="0.8">
            <circle cx="300" cy="250" r="50" strokeDasharray="3 3" />
            <circle cx="300" cy="250" r="120" />
            <circle cx="300" cy="250" r="210" strokeDasharray="4 4" />

            {/* Hairline Crosshairs */}
            <line x1="300" y1="20" x2="300" y2="480" stroke="#2d3642" strokeWidth="1" />
            <line x1="20" y1="250" x2="580" y2="250" stroke="#2d3642" strokeWidth="1" />

            {/* Central Micro-Ticks */}
            <line x1="290" y1="250" x2="310" y2="250" stroke="var(--color-accent-amber)" strokeWidth="1.2" />
            <line x1="300" y1="240" x2="300" y2="260" stroke="var(--color-accent-amber)" strokeWidth="1.2" />
          </g>

          {/* Dynamic Celestial Target Graphics (Vector fallback mode) */}
          {!isImageRendered && getTargetStarGraphics()}
        </svg>

        {/* Mandatory Disclosure Watermark */}
        <div className="sky-viewer-watermark" aria-label="Scientific Mock Data Notice">
          <span className="watermark-dot" />
          <span>
            {isImageRendered
              ? (currentObservation?.isMock ? 'SYNTHETIC DEMONSTRATION OBSERVATION (MOCK)' : 'OBSERVATION ASSET')
              : 'ILLUSTRATIVE PLACEHOLDER — NOT SCIENTIFIC DATA'}
          </span>
        </div>

        {/* Outside Coverage Empty State Overlay */}
        {isNoMatch && (
          <div className="no-match-overlay" role="region" aria-label="Outside Mock Coverage Notification">
            <div className="no-match-card">
              <div className="no-match-icon">🔭</div>
              <h3 className="no-match-title">Outside Demonstration Coverage</h3>
              <p className="no-match-desc">
                Requested coordinates (RA {requestedCoords?.ra.toFixed(3)}°, Dec {requestedCoords?.dec >= 0 ? '+' : ''}{requestedCoords?.dec.toFixed(3)}°)
                fall outside the simulated demonstration fields of the prototype.
              </p>
              {nearestTarget && angularOffset !== null && (
                <div className="no-match-distance mono-nums">
                  Suggested nearest catalog target: <strong style={{ color: 'var(--color-text-primary)' }}>{nearestTarget.name}</strong> (~{angularOffset.toFixed(2)}° away)
                </div>
              )}
              <div className="no-match-pills-label">Jump to a Challenge Target:</div>
              <div className="no-match-pills-grid">
                {targets.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="btn-quick-target"
                    onClick={() => onSelectTarget(t.id)}
                  >
                    ★ {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

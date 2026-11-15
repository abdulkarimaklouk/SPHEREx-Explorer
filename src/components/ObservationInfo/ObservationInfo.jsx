import './ObservationInfo.css';
import { formatSexagesimal } from '../../utils/coordinates.js';

export function ObservationInfo({
  selectedTarget,
  currentFrameIndex = 0,
  currentObservation,
  requestedCoords,
  angularOffset = 0,
}) {
  if (!selectedTarget) {
    return (
      <aside className="obs-info-container" aria-label="Target and Observation Metadata">
        <div className="obs-section-header">
          <h2 className="obs-section-title">Observation Details</h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
          Awaiting verified catalog data.
        </p>
      </aside>
    );
  }

  const { raHms, decDms } = formatSexagesimal(selectedTarget.ra, selectedTarget.dec);

  return (
    <aside className="obs-info-container" aria-label="Target and Observation Metadata">
      {/* 1. Verified Astronomical Target Facts */}
      <section aria-labelledby="target-facts-heading">
        <div className="obs-section-header">
          <h2 id="target-facts-heading" className="obs-section-title">
            Verified Target Facts
          </h2>
          <span className="badge-catalog-verified">✓ Factual Catalog</span>
        </div>

        <div className="obs-fact-table">
          <div className="obs-fact-row">
            <span className="obs-fact-label">Target Name</span>
            <span className="obs-fact-value">{selectedTarget.name}</span>
            {selectedTarget.alternateDesignations && (
              <span className="obs-fact-subvalue mono-nums">
                {selectedTarget.alternateDesignations.join(', ')}
              </span>
            )}
          </div>

          <div className="obs-fact-row">
            <span className="obs-fact-label">Host Constellation</span>
            <span className="obs-fact-value">{selectedTarget.constellation}</span>
          </div>

          <div className="obs-fact-row">
            <span className="obs-fact-label">Astrophysical Class</span>
            <span className="obs-fact-value">{selectedTarget.objectType}</span>
          </div>

          <div className="obs-fact-row">
            <span className="obs-fact-label">Catalog Center (ICRS)</span>
            <span className="obs-fact-value mono-nums">
              RA {selectedTarget.ra.toFixed(4)}°, Dec {selectedTarget.dec >= 0 ? '+' : ''}{selectedTarget.dec.toFixed(4)}°
            </span>
            <span className="obs-fact-subvalue mono-nums">
              Sexagesimal: {raHms}, {decDms}
            </span>
          </div>

          <div className="obs-fact-row">
            <span className="obs-fact-label">Provenance Citation</span>
            <span className="obs-fact-subvalue">
              Source: {selectedTarget.coordinateSource}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Coordinate Transparency Section */}
      <section aria-labelledby="coord-transparency-heading">
        <div className="obs-section-header">
          <h2 id="coord-transparency-heading" className="obs-section-title">
            Coordinate Transparency
          </h2>
          <span className="obs-fact-label">Field Alignment</span>
        </div>

        <div className="coord-transparency-card">
          <div className="transparency-row">
            <span className="transparency-label">Requested:</span>
            <span className="transparency-val mono-nums">
              {requestedCoords
                ? `RA ${requestedCoords.ra.toFixed(3)}°, Dec ${requestedCoords.dec >= 0 ? '+' : ''}${requestedCoords.dec.toFixed(3)}°`
                : 'Catalog Center'}
            </span>
          </div>

          <div className="transparency-row">
            <span className="transparency-label">Catalog Center:</span>
            <span className="transparency-val mono-nums">
              RA {selectedTarget.ra.toFixed(3)}°, Dec {selectedTarget.dec >= 0 ? '+' : ''}{selectedTarget.dec.toFixed(3)}°
            </span>
          </div>

          <div className="transparency-row">
            <span className="transparency-label">Angular Offset (Δθ):</span>
            <span className="transparency-val mono-nums transparency-offset-highlight">
              {angularOffset !== null ? `${angularOffset.toFixed(4)}° (${(angularOffset * 60).toFixed(2)}′)` : '0.0000°'}
            </span>
          </div>

          <div className="transparency-row">
            <span className="transparency-label">Demo Field Coverage:</span>
            <span className="transparency-val" style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
              Not configured
            </span>
          </div>

          <div className="transparency-note">
            The observation field is framed at the catalog center. The angular offset from your requested coordinates is reported transparently.
          </div>
        </div>
      </section>

      {/* 3. Synthetic Observation Sequence (Mock) */}
      <section aria-labelledby="obs-sequence-heading">
        <div className="obs-section-header">
          <h2 id="obs-sequence-heading" className="obs-section-title">
            Synthetic Observation
          </h2>
          <span className="badge-mock-data">MOCK DATA</span>
        </div>

        <div className="mock-observation-card">
          <div className="transparency-row">
            <span className="transparency-label">Sequence Frame:</span>
            <span className="transparency-val mono-nums">
              Observation {currentFrameIndex + 1} of 4
            </span>
          </div>

          <div className="transparency-row">
            <span className="transparency-label">Synthetic Timestamp:</span>
            <span className="transparency-val mono-nums">
              {currentObservation
                ? currentObservation.timestamp.replace('T', ' ').replace('Z', ' UTC')
                : 'Simulated Epoch'}
            </span>
          </div>

          <div className="transparency-row">
            <span className="transparency-label">Mock Provenance Flag:</span>
            <span className="transparency-val mono-nums" style={{ color: 'var(--color-accent-amber)' }}>
              isMock: true
            </span>
          </div>

          <div className="mock-callout">
            ⚠️ <strong>Demonstration Disclosure</strong>: Observation cadence, timestamps, and celestial images are synthetic demonstration data for the 2026 NASA Space Apps Challenge.
          </div>
        </div>
      </section>
    </aside>
  );
}

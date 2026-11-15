import './SearchPanel.css';

export function SearchPanel({
  targets = [],
  selectedTargetId,
  onSelectTarget,
  searchCoords,
  onCoordsChange,
  onSearch,
  onReset,
  searchStatus,
  searchError,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCoords.ra, searchCoords.dec);
  };

  const handleRaChange = (e) => {
    onCoordsChange({ ...searchCoords, ra: e.target.value });
  };

  const handleDecChange = (e) => {
    onCoordsChange({ ...searchCoords, dec: e.target.value });
  };

  return (
    <aside className="search-panel-container" aria-label="Celestial Target and Coordinate Search">
      {/* 1. Challenge Target Presets */}
      <section aria-labelledby="target-presets-heading">
        <div className="search-section-header">
          <h2 id="target-presets-heading" className="search-section-title">
            Challenge Targets
          </h2>
          <span className="search-section-count">{targets.length} Presets</span>
        </div>

        <div className="target-list" role="tablist" aria-label="5 Challenge Targets">
          {targets.map((target, idx) => {
            const isSelected = target.id === selectedTargetId && searchStatus !== 'no-match';
            return (
              <button
                key={target.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`target-card-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectTarget(target.id)}
              >
                <div className="target-card-top">
                  <div className="target-card-title-group">
                    <span className="target-card-index mono-nums">{idx + 1}</span>
                    <span className="target-card-name">{target.name}</span>
                  </div>
                  {isSelected && <span className="target-card-indicator">Active</span>}
                </div>
                <div className="target-card-meta">
                  {target.constellation} • {target.objectType.split('/')[0].trim()}
                </div>
                <div className="target-card-coords mono-nums">
                  RA {target.ra.toFixed(3)}° • Dec {target.dec >= 0 ? '+' : ''}{target.dec.toFixed(3)}°
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Coordinate Search Section */}
      <section aria-labelledby="coord-search-heading">
        <div className="search-section-header">
          <h2 id="coord-search-heading" className="search-section-title">
            Coordinate Search
          </h2>
          <span className="search-section-count">ICRS (J2000)</span>
        </div>

        <form onSubmit={handleSubmit} className="coord-form" noValidate>
          {/* RA Input */}
          <div className="coord-field-group">
            <label htmlFor="ra-input" className="coord-label">
              <span>Right Ascension (RA)</span>
              <span className="coord-bounds-hint">0.0° – 359.9999°</span>
            </label>
            <div className={`coord-input-wrapper ${searchStatus === 'error' && searchError?.includes('Ascension') ? 'input-error' : ''}`}>
              <input
                id="ra-input"
                type="text"
                inputMode="decimal"
                dir="ltr"
                className="coord-input"
                value={searchCoords.ra}
                onChange={handleRaChange}
                placeholder="e.g. 269.452"
                aria-describedby="ra-unit"
              />
              <span id="ra-unit" className="coord-unit-suffix">deg</span>
            </div>
          </div>

          {/* Dec Input */}
          <div className="coord-field-group">
            <label htmlFor="dec-input" className="coord-label">
              <span>Declination (Dec)</span>
              <span className="coord-bounds-hint">-90.0° – +90.0°</span>
            </label>
            <div className={`coord-input-wrapper ${searchStatus === 'error' && searchError?.includes('Declination') ? 'input-error' : ''}`}>
              <input
                id="dec-input"
                type="text"
                inputMode="decimal"
                dir="ltr"
                className="coord-input"
                value={searchCoords.dec}
                onChange={handleDecChange}
                placeholder="e.g. +4.693"
                aria-describedby="dec-unit"
              />
              <span id="dec-unit" className="coord-unit-suffix">deg</span>
            </div>
          </div>

          {/* Validation Feedback */}
          {searchStatus === 'error' && searchError && (
            <div className="coord-error-message" role="alert">
              ⚠️ {searchError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="coord-actions">
            <button type="submit" className="btn-search">
              Search Field
            </button>
            <button
              type="button"
              className="btn-reset"
              onClick={onReset}
              title="Reset coordinates to selected target catalog center"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* 3. Framing & Policy Guidance */}
      <div className="coverage-guidance">
        <div className="coverage-guidance-title">
          <span>🔭</span>
          <span>Demo field coverage: Not configured</span>
        </div>
        <p>
          Target coordinate search matches queried positions against the catalog centers of the five approved NASA Space Apps challenge objects. Numerical mock field coverage boundaries are not configured in this prototype.
        </p>
      </div>
    </aside>
  );
}

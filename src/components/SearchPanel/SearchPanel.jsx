import './SearchPanel.css';

export function SearchPanel({
  targets = [],
  selectedTargetId,
  onSelectTarget,
  searchCoords,
  onCoordsChange,
  fovArcsec = 720,
  onFovChange,
  timeRange = { start: '', end: '' },
  onTimeRangeChange,
  isSearchStale = false,
  onSearch,
  onReset,
  searchStatus,
  searchError,
  archiveSearchResults,
  sia2Status,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCoords.ra, searchCoords.dec);
  };

  const challengeTargets = targets.filter((t) => !t.isCalibrationDemo);
  const demoTarget = targets.find((t) => t.isCalibrationDemo);

  return (
    <aside className="search-panel-container" aria-label="Celestial Target and Coordinate Search">
      {/* 1. Verified Target Presets */}
      <section aria-labelledby="target-presets-heading">
        <div className="search-section-header">
          <h2 id="target-presets-heading" className="search-section-title">
            Challenge Targets
          </h2>
          <span className="search-section-count">5 Objects</span>
        </div>

        <div className="target-list" role="tablist" aria-label="5 Challenge Targets">
          {challengeTargets.map((target, idx) => {
            const isSelected = target.id === selectedTargetId;
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

        {/* Authentic FITS Working Demonstration Target */}
        {demoTarget && (
          <div className="demo-target-wrap">
            <div className="demo-divider-label">Real Data Demonstration</div>
            <button
              type="button"
              className={`target-card-btn btn-demo-cal ${demoTarget.id === selectedTargetId ? 'active' : ''}`}
              onClick={() => onSelectTarget(demoTarget.id)}
            >
              <div className="target-card-top">
                <div className="target-card-title-group">
                  <span className="demo-star-icon">⚡</span>
                  <span className="target-card-name">{demoTarget.name}</span>
                </div>
                {demoTarget.id === selectedTargetId && <span className="target-card-indicator">Active</span>}
              </div>
              <div className="target-card-meta">
                Vulpecula Strip • 2 Authentic FITS Frames
              </div>
              <div className="target-card-coords mono-nums">
                RA {demoTarget.ra.toFixed(3)}° • Dec +{demoTarget.dec.toFixed(3)}°
              </div>
            </button>
          </div>
        )}
      </section>

      {/* 2. Coordinate Search & Time Filters */}
      <section aria-labelledby="coord-search-heading">
        <div className="search-section-header">
          <h2 id="coord-search-heading" className="search-section-title">
            Archive Discovery Query
          </h2>
          <span className="search-section-count">ICRS / J2000</span>
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
                onChange={(e) => onCoordsChange({ ...searchCoords, ra: e.target.value })}
                placeholder="e.g. 269.4521"
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
                onChange={(e) => onCoordsChange({ ...searchCoords, dec: e.target.value })}
                placeholder="e.g. +4.6934"
                aria-describedby="dec-unit"
              />
              <span id="dec-unit" className="coord-unit-suffix">deg</span>
            </div>
          </div>

          {/* FOV Radius */}
          <div className="coord-field-group">
            <label htmlFor="fov-input" className="coord-label">
              <span>Search FOV Radius</span>
              <span className="coord-bounds-hint">Default 720″ (0.2°)</span>
            </label>
            <div className="coord-input-wrapper">
              <input
                id="fov-input"
                type="text"
                inputMode="numeric"
                dir="ltr"
                className="coord-input"
                value={fovArcsec}
                onChange={(e) => onFovChange && onFovChange(parseFloat(e.target.value) || 720)}
                placeholder="720"
              />
              <span className="coord-unit-suffix">arcsec</span>
            </div>
          </div>

          {/* Time Selection Filter */}
          <div className="time-filter-section">
            <div className="time-filter-title">Observation Time Range</div>
            <div className="time-filter-inputs">
              <div className="time-input-group">
                <label htmlFor="start-date-input" className="time-label">From</label>
                <input
                  id="start-date-input"
                  type="date"
                  className="time-date-input"
                  value={timeRange.start}
                  onChange={(e) => onTimeRangeChange && onTimeRangeChange({ ...timeRange, start: e.target.value })}
                />
              </div>
              <div className="time-input-group">
                <label htmlFor="end-date-input" className="time-label">To</label>
                <input
                  id="end-date-input"
                  type="date"
                  className="time-date-input"
                  value={timeRange.end}
                  onChange={(e) => onTimeRangeChange && onTimeRangeChange({ ...timeRange, end: e.target.value })}
                />
              </div>
            </div>
            {(timeRange.start || timeRange.end) && (
              <button
                type="button"
                className="btn-clear-time"
                onClick={() => onTimeRangeChange && onTimeRangeChange({ start: '', end: '' })}
              >
                Clear Time Filter
              </button>
            )}
          </div>

          {/* Stale Search Notice */}
          {isSearchStale && (
            <div className="stale-search-alert mono-nums">
              ⚠️ Parameters modified — click Search to execute query
            </div>
          )}

          {/* Validation Error Feedback */}
          {searchStatus === 'error' && searchError && (
            <div className="coord-error-message" role="alert">
              ⚠️ {searchError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="coord-actions">
            <button type="submit" className="btn-search btn-search-unified">
              Search SPHEREx Archive
            </button>
            <button
              type="button"
              className="btn-reset"
              onClick={onReset}
              title="Reset coordinates to target catalog center"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* 3. Archive Discovery Results Card */}
      {archiveSearchResults && (
        <div className={`archive-results-card ${archiveSearchResults.matched ? 'status-match' : 'status-nomatch'}`}>
          <div className="archive-results-header">
            <span className={`status-badge ${archiveSearchResults.matched ? 'badge-match' : 'badge-nomatch'}`}>
              {archiveSearchResults.matched ? '✓ AUTHENTIC ARCHIVE MATCH' : 'NOT COVERED IN PILOT INDEX'}
            </span>
            <span className="archive-results-count mono-nums">
              {archiveSearchResults.count} Obs
            </span>
          </div>

          <p className="archive-results-text">
            {archiveSearchResults.message}
          </p>

          {/* Live SIA2 Upstream Status Note */}
          <div className="sia2-gateway-note mono-nums">
            <span className="sia2-dot" />
            <span>
              {sia2Status?.message || 'IRSA SIA2: Upstream service unreachable (HTTP 502 Proxy Error observed)'}
            </span>
          </div>

          {archiveSearchResults.matched && archiveSearchResults.observations.length > 0 && (
            <div className="archive-obs-mini-list">
              <div className="mini-list-title">SPHEREx DR1 Observations:</div>
              {archiveSearchResults.observations.map((obs) => (
                <div key={obs.id} className="mini-obs-item mono-nums">
                  <span className="mini-obs-id">{obs.id}</span>
                  <span className="mini-obs-date">
                    {obs.timestamp.split('T')[1].slice(0, 8)} UTC
                  </span>
                </div>
              ))}
            </div>
          )}

          {!archiveSearchResults.matched && demoTarget && (
            <button
              type="button"
              className="btn-quick-pilot"
              onClick={() => onSelectTarget(demoTarget.id)}
            >
              ⚡ Load Working Demonstration (Calibration Field)
            </button>
          )}
        </div>
      )}

      {/* 4. Guidance & Limitations Notice */}
      <div className="coverage-guidance">
        <div className="coverage-guidance-title">
          <span>🔭</span>
          <span>SPHEREx DR1 Archive Policy</span>
        </div>
        <p>
          All 5 challenge targets and custom coordinates use the authentic SPHEREx archive discovery workflow. When live IRSA queries are gated by upstream proxy errors, only observations verified in the local pilot index (Week 2025W19_2B) can be retrieved.
        </p>
      </div>
    </aside>
  );
}

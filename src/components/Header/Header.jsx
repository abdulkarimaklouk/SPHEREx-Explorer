import './Header.css';

export function Header() {
  return (
    <header className="header-container" role="banner">
      <div className="header-brand">
        <svg
          className="header-logo-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Telescope Aperture / Astronomical Crosshair Icon */}
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" />
          <line x1="16" y1="2" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="25" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="16" x2="7" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="header-titles">
          <h1 className="header-title">
            SPHEREx Explorer
            <span className="header-version-tag">2026 Space Apps</span>
          </h1>
          <p className="header-subtitle">
            All-Sky Spectral Survey Sequence Viewer • Astronomical Coordinate Explorer
          </p>
        </div>
      </div>

      <aside className="header-mock-badge" aria-label="Mock Data Disclosure Banner">
        <span className="header-mock-indicator" aria-hidden="true" />
        <span>⚠️ MOCK OBSERVATION DATA ONLY — FOR DEMONSTRATION USE</span>
      </aside>
    </header>
  );
}

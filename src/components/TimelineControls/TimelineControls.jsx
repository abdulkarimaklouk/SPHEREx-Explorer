import './TimelineControls.css';

export function TimelineControls({
  currentFrameIndex = 0,
  totalFrames = 4,
  isPlaying = false,
  onPrev,
  onNext,
  onTogglePlay,
  onJumpToFrame,
  observations = [],
  cadenceMs = 1200,
}) {
  const isAtFirst = currentFrameIndex === 0;
  const isAtLast = currentFrameIndex >= totalFrames - 1;

  // Calculate width percentage for progress line (0%, 33.3%, 66.6%, 100%)
  const progressPercent = totalFrames > 1 ? (currentFrameIndex / (totalFrames - 1)) * 100 : 0;

  // Format short date for timeline node (e.g., 2026-02-15)
  const formatShortDate = (obs, index) => {
    if (obs && obs.timestamp) {
      return obs.timestamp.split('T')[0];
    }
    return `Epoch ${index + 1}`;
  };

  return (
    <footer className="timeline-controls-container" role="toolbar" aria-label="Observation Sequence Playback & Timeline Navigation">
      {/* 1. Playback Transport Buttons */}
      <div className="timeline-transport-group">
        <button
          type="button"
          className="btn-transport"
          onClick={onPrev}
          disabled={isAtFirst}
          aria-label="Previous observation frame"
          title="Step to previous observation"
        >
          <span>◀</span>
          <span>Prev</span>
        </button>

        <button
          type="button"
          className={`btn-transport btn-transport-play ${isPlaying ? 'is-playing' : ''}`}
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause timeline playback' : 'Play timeline sequence'}
          title={isPlaying ? 'Pause sequence' : 'Play sequence across epochs'}
        >
          <span>{isPlaying ? '⏸' : '▶'}</span>
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          type="button"
          className="btn-transport"
          onClick={onNext}
          disabled={isAtLast}
          aria-label="Next observation frame"
          title="Step to next observation"
        >
          <span>Next</span>
          <span>▶</span>
        </button>
      </div>

      {/* 2. 4-Step Scrubber Track */}
      <div className="timeline-scrubber-center">
        <div className="timeline-scrubber-track-wrap" role="group" aria-label="Observation Epoch Stepper">
          {/* Background Track */}
          <div className="timeline-track-bar" aria-hidden="true" />
          {/* Active Progress Bar */}
          <div
            className="timeline-track-progress"
            style={{ width: `calc(${progressPercent}% * 0.9)` }}
            aria-hidden="true"
          />

          {/* 4 Interactive Nodes */}
          {Array.from({ length: totalFrames }).map((_, idx) => {
            const obs = observations[idx];
            const isActive = idx === currentFrameIndex;
            const isCompleted = idx < currentFrameIndex;

            return (
              <button
                key={idx}
                type="button"
                className={`timeline-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => onJumpToFrame(idx)}
                aria-label={`Jump to Observation ${idx + 1} of ${totalFrames}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div className="timeline-node-circle">{idx + 1}</div>
                <span className="timeline-node-timestamp">
                  {formatShortDate(obs, idx)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Cadence and Auto-Stop Indicators */}
      <div className="timeline-meta-right">
        <div className={`timeline-autostop-pill ${isAtLast ? 'halted' : ''}`}>
          {isAtLast ? '● End of Sequence (Halted)' : 'Auto-stop: Frame 4'}
        </div>
        <div className="timeline-cadence-label">
          Cadence: {cadenceMs}ms / step
        </div>
      </div>
    </footer>
  );
}

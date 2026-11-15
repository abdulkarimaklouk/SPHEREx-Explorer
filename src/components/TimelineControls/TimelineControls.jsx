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
  cadenceMs = 800,
}) {
  const isAtFirst = currentFrameIndex === 0;
  const isAtLast = currentFrameIndex >= totalFrames - 1;

  // Calculate width percentage for progress line
  const progressPercent = totalFrames > 1 ? (currentFrameIndex / (totalFrames - 1)) * 100 : 0;

  const isRealData = observations.some((obs) => obs.isRealFits);

  // Format label for timeline node
  const formatNodeLabel = (obs, index) => {
    if (!obs) return `Frame ${index + 1}`;

    if (obs.isRealFits && obs.timestamp) {
      const timePart = obs.timestamp.split('T')[1]?.slice(0, 8) || '';
      const pointing = obs.pointing || (obs.id ? obs.id.split('_').slice(-2).join('_') : `P${index + 1}`);
      return `${pointing} (${timePart})`;
    }

    if (obs.timestamp) {
      return obs.timestamp.split('T')[0];
    }
    return `Epoch ${index + 1}`;
  };

  // Compute elapsed time interval between Frame 0 and Frame 1
  let intervalText = null;
  if (isRealData && observations.length >= 2) {
    const t0 = new Date(observations[0].timestampUtc || observations[0].timestamp).getTime();
    const t1 = new Date(observations[1].timestampUtc || observations[1].timestamp).getTime();
    if (!Number.isNaN(t0) && !Number.isNaN(t1)) {
      const deltaSec = Math.abs(t1 - t0) / 1000;
      const mins = Math.floor(deltaSec / 60);
      const secs = Math.round(deltaSec % 60);
      intervalText = `+${mins}m ${secs < 10 ? '0' : ''}${secs}s (129s)`;
    }
  }

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
          className={`btn-transport btn-transport-play ${isPlaying ? 'is-playing' : ''} ${isAtLast && !isPlaying ? 'btn-replay' : ''}`}
          onClick={onTogglePlay}
          aria-label={
            isPlaying
              ? 'Pause timeline playback'
              : (isAtLast ? 'Replay timeline sequence from beginning' : 'Play timeline sequence')
          }
          title={
            isPlaying
              ? 'Pause sequence'
              : (isAtLast ? 'Replay sequence from beginning' : 'Play sequence across epochs')
          }
        >
          <span>{isPlaying ? '⏸' : (isAtLast ? '↺' : '▶')}</span>
          <span>{isPlaying ? 'Pause' : (isAtLast ? 'Replay' : 'Blink')}</span>
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

      {/* 2. Scrubber Track */}
      <div className="timeline-scrubber-center">
        <div className="timeline-scrubber-track-wrap" role="group" aria-label="Observation Epoch Stepper">
          {/* Background Track */}
          <div className="timeline-track-bar" aria-hidden="true" />
          {/* Active Progress Bar */}
          <div
            className="timeline-track-progress"
            style={{ width: `calc((100% - 40px) * ${progressPercent / 100})` }}
            aria-hidden="true"
          />

          {/* Interactive Nodes */}
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
                <span className="timeline-node-timestamp mono-nums">
                  {formatNodeLabel(obs, idx)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Temporal Interval Badge for Authentic FITS Data */}
        {isRealData && intervalText && (
          <div className="timeline-interval-pill mono-nums">
            <span className="interval-tag">Δt Cadence:</span>
            <span className="interval-val">{intervalText}</span>
            <span className="interval-desc">• Rapid Survey Revisit</span>
          </div>
        )}
      </div>

      {/* 3. Cadence and Auto-Stop Indicators */}
      <div className="timeline-meta-right">
        <div className={`timeline-autostop-pill ${isAtLast ? 'halted' : ''}`}>
          {isAtLast ? '● Sequence End (Halted)' : `Auto-stop: Frame ${totalFrames}`}
        </div>
        <div className="timeline-cadence-label mono-nums">
          Cadence: {cadenceMs}ms / blink
        </div>
      </div>
    </footer>
  );
}

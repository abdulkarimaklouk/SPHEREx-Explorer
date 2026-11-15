import './App.css';
import { useObservationExplorer } from './hooks/useObservationExplorer.js';
import { Header } from './components/Header/Header.jsx';
import { SearchPanel } from './components/SearchPanel/SearchPanel.jsx';
import { SkyViewer } from './components/SkyViewer/SkyViewer.jsx';
import { ObservationInfo } from './components/ObservationInfo/ObservationInfo.jsx';
import { TimelineControls } from './components/TimelineControls/TimelineControls.jsx';

export function App() {
  const {
    targets,
    selectedTarget,
    selectedTargetId,
    currentFrameIndex,
    currentObservation,
    totalFrames,
    isPlaying,
    cadenceMs,
    searchCoords,
    setSearchCoords,
    searchStatus,
    searchError,
    requestedCoords,
    angularOffset,
    nearestTarget,
    stepNext,
    stepPrev,
    jumpToFrame,
    togglePlay,
    selectTarget,
    executeSearch,
    resetToCenter,
  } = useObservationExplorer();

  return (
    <div className="app-shell">
      {/* 1. Header with branding and persistent mock data banner */}
      <Header />

      {/* 2. Main Asymmetric Workbench Workspace */}
      <div className="workbench-layout">
        {/* Left Action Rail: Target Selection & Coordinate Search */}
        <SearchPanel
          targets={targets}
          selectedTargetId={selectedTargetId}
          onSelectTarget={selectTarget}
          searchCoords={searchCoords}
          onCoordsChange={setSearchCoords}
          onSearch={executeSearch}
          onReset={resetToCenter}
          searchStatus={searchStatus}
          searchError={searchError}
        />

        {/* Center Stage: Dominant Astronomical Sky Viewer */}
        <SkyViewer
          selectedTarget={selectedTarget}
          currentFrameIndex={currentFrameIndex}
          currentObservation={currentObservation}
          searchStatus={searchStatus}
          requestedCoords={requestedCoords}
          angularOffset={angularOffset}
          nearestTarget={nearestTarget}
          onSelectTarget={selectTarget}
          targets={targets}
        />

        {/* Right Rail: Metadata & Provenance Inspector */}
        <ObservationInfo
          selectedTarget={selectedTarget}
          currentFrameIndex={currentFrameIndex}
          currentObservation={currentObservation}
          requestedCoords={requestedCoords}
          angularOffset={angularOffset}
        />
      </div>

      {/* 3. Bottom Console: Timeline Transport & 4-Step Scrubber */}
      <TimelineControls
        currentFrameIndex={currentFrameIndex}
        totalFrames={totalFrames}
        isPlaying={isPlaying}
        onPrev={stepPrev}
        onNext={stepNext}
        onTogglePlay={togglePlay}
        onJumpToFrame={jumpToFrame}
        observations={selectedTarget?.observations || []}
        cadenceMs={cadenceMs}
      />
    </div>
  );
}

export default App;

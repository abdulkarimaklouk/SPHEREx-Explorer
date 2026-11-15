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
    presetTargets,
    customTargets,
    selectedTarget,
    selectedTargetId,
    currentFrameIndex,
    currentObservation,
    totalFrames,
    isPlaying,
    blinkIntervalMs,
    setBlinkIntervalMs,
    searchCoords,
    setSearchCoords,
    fovArcsec,
    setFovArcsec,
    timeRange,
    setTimeRange,
    isSearchStale,
    searchStatus,
    searchError,
    requestedCoords,
    angularOffset,
    nearestTarget,
    activeFitsData,
    allFitsData,
    isFitsLoading,
    fitsError,
    viewMode,
    setViewMode,
    archiveSearchResults,
    sia2Status,
    stretch,
    setStretch,
    invertColormap,
    setInvertColormap,
    minStretch,
    maxStretch,
    setStretchRange,
    zoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    stepNext,
    stepPrev,
    jumpToFrame,
    togglePlay,
    selectTarget,
    executeSearch,
    searchArchive,
    resetToCenter,
  } = useObservationExplorer();

  return (
    <div className="app-shell">
      {/* 1. Header with branding and persistent mission disclosure */}
      <Header />

      {/* 2. Main Asymmetric Workbench Workspace */}
      <div className="workbench-layout">
        {/* Left Action Rail: Target Selection & Coordinate Search */}
        <SearchPanel
          targets={targets}
          presetTargets={presetTargets}
          customTargets={customTargets}
          selectedTargetId={selectedTargetId}
          onSelectTarget={selectTarget}
          searchCoords={searchCoords}
          onCoordsChange={setSearchCoords}
          fovArcsec={fovArcsec}
          onFovChange={setFovArcsec}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          isSearchStale={isSearchStale}
          onSearch={executeSearch}
          onSearchArchive={searchArchive}
          onReset={resetToCenter}
          searchStatus={searchStatus}
          searchError={searchError}
          archiveSearchResults={archiveSearchResults}
          sia2Status={sia2Status}
        />

        {/* Center Stage: Dominant Astronomical Sky Viewer */}
        <SkyViewer
          selectedTarget={selectedTarget}
          currentFrameIndex={currentFrameIndex}
          totalFrames={totalFrames}
          currentObservation={currentObservation}
          searchStatus={searchStatus}
          requestedCoords={requestedCoords}
          angularOffset={angularOffset}
          nearestTarget={nearestTarget}
          onSelectTarget={selectTarget}
          onSearchArchive={searchArchive}
          targets={targets}
          activeFitsData={activeFitsData}
          allFitsData={allFitsData}
          isFitsLoading={isFitsLoading}
          fitsError={fitsError}
          viewMode={viewMode}
          setViewMode={setViewMode}
          stretch={stretch}
          setStretch={setStretch}
          invertColormap={invertColormap}
          setInvertColormap={setInvertColormap}
          minStretch={minStretch}
          maxStretch={maxStretch}
          setStretchRange={setStretchRange}
          zoomLevel={zoomLevel}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetZoom={resetZoom}
          isPlaying={isPlaying}
          onPrev={stepPrev}
          onNext={stepNext}
          onTogglePlay={togglePlay}
          blinkIntervalMs={blinkIntervalMs}
          setBlinkIntervalMs={setBlinkIntervalMs}
          sia2Status={sia2Status}
        />

        {/* Right Rail: Metadata & Provenance Inspector */}
        <ObservationInfo
          selectedTarget={selectedTarget}
          currentFrameIndex={currentFrameIndex}
          totalFrames={totalFrames}
          currentObservation={currentObservation}
          requestedCoords={requestedCoords}
          angularOffset={angularOffset}
          activeFitsData={activeFitsData}
          sia2Status={sia2Status}
        />
      </div>

      {/* 3. Bottom Console: Timeline Transport & Scrubber */}
      <TimelineControls
        currentFrameIndex={currentFrameIndex}
        totalFrames={totalFrames}
        isPlaying={isPlaying}
        onPrev={stepPrev}
        onNext={stepNext}
        onTogglePlay={togglePlay}
        onJumpToFrame={jumpToFrame}
        observations={selectedTarget?.observations || []}
        cadenceMs={blinkIntervalMs}
      />
    </div>
  );
}

export default App;

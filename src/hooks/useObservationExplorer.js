import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ObservationService } from '../services/observationService.js';
import { parseFitsBuffer } from '../utils/fitsParser.js';

const DEFAULT_CADENCE_MS = 800; // WiseView standard cadence

export function useObservationExplorer() {
  // Preset targets: 5 Challenge Objects + 1 Working Demonstration Field
  const presetTargets = useMemo(() => {
    const presets = ObservationService.getPresetTargets();
    const demo = ObservationService.getCalibrationTarget();
    return [...presets, demo];
  }, []);

  const [customTargets, setCustomTargets] = useState([]);

  // Combined targets: Presets followed by user-created custom targets
  const targets = useMemo(
    () => [...presetTargets, ...customTargets],
    [presetTargets, customTargets],
  );

  const initialTarget = presetTargets[5] || presetTargets[0]; // Start on authentic working demo

  const [selectedTargetId, setSelectedTargetId] = useState(initialTarget.id);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blinkIntervalMs, setBlinkIntervalMs] = useState(DEFAULT_CADENCE_MS);
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' | 'blink'

  // Coordinate Search & Transparency state
  const [searchCoords, setSearchCoords] = useState({
    ra: initialTarget.ra.toFixed(4),
    dec: initialTarget.dec >= 0 ? `+${initialTarget.dec.toFixed(4)}` : initialTarget.dec.toFixed(4),
  });
  const [fovArcsec, setFovArcsec] = useState(720);
  const [isSearchStale, setIsSearchStale] = useState(false);

  // Time Range Filter
  const [timeRange, setTimeRange] = useState({
    start: '',
    end: '',
  });

  const [searchStatus, setSearchStatus] = useState('matched'); // 'matched' | 'no-match' | 'error'
  const [searchError, setSearchError] = useState(null);
  const [requestedCoords, setRequestedCoords] = useState({ ra: initialTarget.ra, dec: initialTarget.dec });
  const [angularOffset, setAngularOffset] = useState(0);
  const [nearestTarget, setNearestTarget] = useState(initialTarget);
  const [archiveSearchResults, setArchiveSearchResults] = useState(null);
  const [sia2Status, setSia2Status] = useState(null);

  // Real FITS Image state & multi-frame cache
  const [activeFitsData, setActiveFitsData] = useState(null);
  const [allFitsData, setAllFitsData] = useState([]);
  const [isFitsLoading, setIsFitsLoading] = useState(false);
  const [fitsError, setFitsError] = useState(null);
  const fitsCacheRef = useRef(new Map());

  // Image display / stretch settings (WiseView-inspired)
  const [stretch, setStretch] = useState('asinh'); // 'asinh' | 'linear'
  const [invertColormap, setInvertColormap] = useState(false);
  const [minStretch, setMinStretch] = useState(-1.5);
  const [maxStretch, setMaxStretch] = useState(25.0);
  const [zoomLevel, setZoomLevel] = useState(2.0);

  const timerRef = useRef(null);

  // Active target entity with observations populated from archive search
  const selectedTarget = useMemo(() => {
    const base = targets.find((t) => t.id === selectedTargetId) || targets[0];
    if (!base) return null;

    // If archive search has returned observations for this target, attach them
    if (archiveSearchResults && archiveSearchResults.matched && archiveSearchResults.observations) {
      return {
        ...base,
        observations: archiveSearchResults.observations,
      };
    }

    // If target has its own authentic observations (e.g., calibration demo)
    if (base.observations && base.observations.length > 0) {
      return base;
    }

    // Default: not covered by pilot index, empty observations list
    return {
      ...base,
      observations: [],
    };
  }, [targets, selectedTargetId, archiveSearchResults]);

  const totalFrames = selectedTarget?.observations?.length || 0;

  const currentObservation = useMemo(() => {
    if (!selectedTarget?.observations || selectedTarget.observations.length === 0) {
      return null;
    }
    const safeIndex = Math.min(Math.max(0, currentFrameIndex), selectedTarget.observations.length - 1);
    return selectedTarget.observations[safeIndex] || null;
  }, [selectedTarget, currentFrameIndex]);

  // Load and parse all real FITS files for the selected target
  useEffect(() => {
    if (!selectedTarget || !selectedTarget.observations) {
      setActiveFitsData(null);
      setAllFitsData([]);
      setIsFitsLoading(false);
      setFitsError(null);
      return undefined;
    }

    const realObsList = selectedTarget.observations.filter(
      (obs) => obs.isRealFits && obs.fitsFile,
    );

    if (realObsList.length === 0) {
      setActiveFitsData(null);
      setAllFitsData([]);
      setIsFitsLoading(false);
      setFitsError(null);
      return undefined;
    }

    let isCancelled = false;
    setIsFitsLoading(true);
    setFitsError(null);

    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    const fetchPromises = realObsList.map((obs) => {
      const fitsPath = obs.fitsFile;
      if (fitsCacheRef.current.has(fitsPath)) {
        return Promise.resolve({
          obsId: obs.id,
          observation: obs,
          fitsData: fitsCacheRef.current.get(fitsPath),
        });
      }

      const cleanPath = fitsPath.startsWith('/') ? fitsPath.slice(1) : fitsPath;
      const fetchUrl = `${cleanBase}${cleanPath}`;

      return fetch(fetchUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to load authentic FITS file (${res.status} ${res.statusText})`);
          }
          return res.arrayBuffer();
        })
        .then((buf) => {
          const parsed = parseFitsBuffer(buf);
          fitsCacheRef.current.set(fitsPath, parsed);
          return {
            obsId: obs.id,
            observation: obs,
            fitsData: parsed,
          };
        });
    });

    Promise.all(fetchPromises)
      .then((results) => {
        if (isCancelled) return;
        setAllFitsData(results);
        const currentFits = results[currentFrameIndex]?.fitsData || results[0]?.fitsData || null;
        setActiveFitsData(currentFits);
        setIsFitsLoading(false);
      })
      .catch((err) => {
        if (isCancelled) return;
        setFitsError(err.message || 'Error loading authentic FITS observations');
        setIsFitsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedTarget, currentFrameIndex]);

  // Synchronize activeFitsData when frame index changes
  useEffect(() => {
    if (allFitsData.length > 0) {
      const current = allFitsData[currentFrameIndex]?.fitsData || allFitsData[0]?.fitsData || null;
      setActiveFitsData(current);
    }
  }, [currentFrameIndex, allFitsData]);

  // Step Next (stops at final frame without wrapping)
  const stepNext = useCallback(() => {
    setCurrentFrameIndex((prev) => {
      if (prev < totalFrames - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [totalFrames]);

  // Step Previous (stops at index 0 without wrapping)
  const stepPrev = useCallback(() => {
    setCurrentFrameIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Jump to specific frame index
  const jumpToFrame = useCallback((index) => {
    if (index >= 0 && index < totalFrames) {
      setCurrentFrameIndex(index);
    }
  }, [totalFrames]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prevPlaying) => {
      if (!prevPlaying) {
        if (currentFrameIndex >= totalFrames - 1) {
          setCurrentFrameIndex(0);
        }
        return true;
      }
      return false;
    });
  }, [currentFrameIndex, totalFrames]);

  // Playback Interval Management (Blink loop)
  useEffect(() => {
    if (!isPlaying || totalFrames <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return undefined;
    }

    timerRef.current = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => {
        if (prevIndex >= totalFrames - 1) {
          return 0; // In blink mode, loop between frames
        }
        return prevIndex + 1;
      });
    }, blinkIntervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, totalFrames, blinkIntervalMs]);

  // Core Archive Search Function (Used by both Presets and Custom Coordinates)
  const searchArchive = useCallback((raInput, decInput, fov = 720, targetName = '', timeFltr = null) => {
    setIsSearchStale(false);
    const activeTimeFilter = timeFltr || timeRange;
    const result = ObservationService.searchPilotIndex(raInput, decInput, fov, activeTimeFilter);

    setArchiveSearchResults(result);

    if (!result.isValid) {
      setSearchStatus('error');
      setSearchError(result.message);
      return result;
    }

    setRequestedCoords(result.requestedCoords);
    setSearchError(null);

    // Concurrently attempt live IRSA SIA2 query to test upstream reachability
    ObservationService.queryIrsaSia2(result.requestedCoords.ra, result.requestedCoords.dec, fov)
      .then((siaRes) => setSia2Status(siaRes))
      .catch(() => setSia2Status({ attempted: true, reachable: false, message: 'IRSA SIA2: Server connection failed' }));

    if (result.matched && result.observations.length > 0) {
      setSearchStatus('matched');
      setAngularOffset(0);
      setCurrentFrameIndex(0);
      setIsPlaying(false);
    } else {
      setSearchStatus('no-match');
      setIsPlaying(false);
      setCurrentFrameIndex(0);
    }

    return result;
  }, [timeRange]);

  // Unified Target Selection: Populates coordinates and immediately triggers archive discovery
  const selectTarget = useCallback((targetId) => {
    const target = targets.find((t) => t.id === targetId);
    if (!target) return;

    setSelectedTargetId(targetId);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
    setIsSearchStale(false);

    setSearchCoords({
      ra: target.ra.toFixed(4),
      dec: target.dec >= 0 ? `+${target.dec.toFixed(4)}` : target.dec.toFixed(4),
    });
    setRequestedCoords({
      ra: target.ra,
      dec: target.dec,
    });
    setNearestTarget(target);

    // Trigger archive search for this target's verified coordinates
    searchArchive(target.ra, target.dec, fovArcsec, target.name, timeRange);
  }, [targets, fovArcsec, timeRange, searchArchive]);

  // Handle Coordinate Input Modification (marks search as stale)
  const updateSearchCoords = useCallback((newCoords) => {
    setSearchCoords(newCoords);
    setIsSearchStale(true);
  }, []);

  const updateFovArcsec = useCallback((newFov) => {
    setFovArcsec(newFov);
    setIsSearchStale(true);
  }, []);

  const updateTimeRange = useCallback((newRange) => {
    setTimeRange(newRange);
    setIsSearchStale(true);
  }, []);

  // Execute explicit coordinate search
  const executeSearch = useCallback((raInput, decInput) => {
    searchArchive(raInput, decInput, fovArcsec, 'Custom Sky Position', timeRange);
  }, [searchArchive, fovArcsec, timeRange]);

  // Reset to Current Target Catalog Center Action
  const resetToCenter = useCallback(() => {
    if (selectedTarget) {
      selectTarget(selectedTarget.id);
    }
  }, [selectedTarget, selectTarget]);

  // Initialize with authentic demo search on mount
  useEffect(() => {
    searchArchive(initialTarget.ra, initialTarget.dec, 720, initialTarget.name, null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Zoom helpers
  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(5.0, Number((prev + 0.5).toFixed(1))));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(1.0, Number((prev - 0.5).toFixed(1))));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(2.0);
  }, []);

  const setStretchRange = useCallback(({ min, max }) => {
    if (typeof min === 'number') setMinStretch(min);
    if (typeof max === 'number') setMaxStretch(max);
  }, []);

  return {
    targets,
    presetTargets,
    customTargets,
    selectedTarget,
    selectedTargetId,
    currentFrameIndex,
    currentObservation,
    totalFrames,
    isPlaying,
    cadenceMs: blinkIntervalMs,
    blinkIntervalMs,
    setBlinkIntervalMs,
    viewMode,
    setViewMode,
    searchCoords,
    setSearchCoords: updateSearchCoords,
    fovArcsec,
    setFovArcsec: updateFovArcsec,
    timeRange,
    setTimeRange: updateTimeRange,
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
  };
}

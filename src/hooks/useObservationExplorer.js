import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ObservationService } from '../services/observationService.js';

const DEFAULT_TOTAL_FRAMES = 4;
const DEFAULT_CADENCE_MS = 1200;

export function useObservationExplorer() {
  const targets = useMemo(() => ObservationService.getPresetTargets(), []);
  const initialTarget = targets[0] || null;

  const [selectedTargetId, setSelectedTargetId] = useState(
    initialTarget ? initialTarget.id : 'barnards-star',
  );
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Search and coordinate transparency states
  const [searchCoords, setSearchCoords] = useState({
    ra: initialTarget ? initialTarget.ra.toString() : '269.452',
    dec: initialTarget ? initialTarget.dec.toString() : '4.693',
  });
  const [searchStatus, setSearchStatus] = useState('matched'); // 'matched' | 'no-match' | 'error'
  const [searchError, setSearchError] = useState(null);
  const [requestedCoords, setRequestedCoords] = useState(
    initialTarget ? { ra: initialTarget.ra, dec: initialTarget.dec } : null,
  );
  const [angularOffset, setAngularOffset] = useState(0);
  const [nearestTarget, setNearestTarget] = useState(initialTarget);

  const timerRef = useRef(null);

  const selectedTarget = useMemo(
    () => targets.find((t) => t.id === selectedTargetId) || targets[0] || null,
    [targets, selectedTargetId],
  );

  const totalFrames = selectedTarget?.observations?.length || DEFAULT_TOTAL_FRAMES;

  const currentObservation = useMemo(() => {
    if (!selectedTarget?.observations || selectedTarget.observations.length === 0) {
      return null;
    }
    const safeIndex = Math.min(Math.max(0, currentFrameIndex), selectedTarget.observations.length - 1);
    return selectedTarget.observations[safeIndex] || null;
  }, [selectedTarget, currentFrameIndex]);

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

  // Toggle Play / Pause with replay support from the final observation
  const togglePlay = useCallback(() => {
    setIsPlaying((prevPlaying) => {
      if (!prevPlaying) {
        // If user initiates playback at the final frame, replay from the beginning
        if (currentFrameIndex >= totalFrames - 1) {
          setCurrentFrameIndex(0);
        }
        return true;
      }
      return false;
    });
  }, [currentFrameIndex, totalFrames]);

  // Playback Interval Management (cleanly decoupled from state updaters)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return undefined;
    }

    timerRef.current = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => {
        if (prevIndex >= totalFrames - 1) {
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, DEFAULT_CADENCE_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, totalFrames]);

  // Strict auto-stop at the final observation frame
  useEffect(() => {
    if (isPlaying && currentFrameIndex >= totalFrames - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentFrameIndex, totalFrames]);

  // Select Target Preset Action
  const selectTarget = useCallback((targetId) => {
    const target = targets.find((t) => t.id === targetId);
    if (!target) return;

    setSelectedTargetId(targetId);
    setCurrentFrameIndex(0);
    setIsPlaying(false);

    setSearchCoords({
      ra: target.ra.toString(),
      dec: target.dec.toString(),
    });
    setRequestedCoords({
      ra: target.ra,
      dec: target.dec,
    });
    setAngularOffset(0);
    setSearchStatus('matched');
    setSearchError(null);
    setNearestTarget(target);
  }, [targets]);

  // Execute Coordinate Search Action
  const executeSearch = useCallback((raInput, decInput) => {
    const result = ObservationService.findTargetByCoordinates(raInput, decInput);

    if (!result.validation.isValid) {
      setSearchStatus('error');
      setSearchError(result.validation.raError || result.validation.decError);
      return;
    }

    setRequestedCoords(result.requestedCoords);
    setAngularOffset(result.angularOffsetDegrees);
    setSearchError(null);
    setNearestTarget(result.nearestTarget);

    if (result.matched && result.target) {
      setSelectedTargetId(result.target.id);
      setCurrentFrameIndex(0);
      setIsPlaying(false);
      setSearchStatus('matched');
    } else {
      setSearchStatus('no-match');
      setIsPlaying(false);
    }
  }, []);

  // Reset to Catalog Center Action
  const resetToCenter = useCallback(() => {
    if (selectedTarget) {
      selectTarget(selectedTarget.id);
    }
  }, [selectedTarget, selectTarget]);

  return {
    targets,
    selectedTarget,
    selectedTargetId,
    currentFrameIndex,
    currentObservation,
    totalFrames,
    isPlaying,
    cadenceMs: DEFAULT_CADENCE_MS,
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
  };
}

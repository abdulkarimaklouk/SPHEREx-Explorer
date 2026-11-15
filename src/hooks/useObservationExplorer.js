import { useState, useEffect, useCallback, useRef } from 'react';
import { ObservationService } from '../services/observationService.js';

const TOTAL_FRAMES = 4;
const DEFAULT_CADENCE_MS = 1200;

export function useObservationExplorer() {
  const targets = ObservationService.getPresetTargets();
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

  const selectedTarget =
    ObservationService.getTargetById(selectedTargetId) || targets[0];
  const currentObservation =
    selectedTarget && selectedTarget.observations
      ? selectedTarget.observations[currentFrameIndex] || null
      : null;

  // Step Next
  const stepNext = useCallback(() => {
    setCurrentFrameIndex((prev) => {
      if (prev < TOTAL_FRAMES - 1) {
        return prev + 1;
      }
      setIsPlaying(false);
      return prev;
    });
  }, []);

  // Step Previous
  const stepPrev = useCallback(() => {
    setCurrentFrameIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Jump to specific frame index (0..3)
  const jumpToFrame = useCallback((index) => {
    if (index >= 0 && index < TOTAL_FRAMES) {
      setCurrentFrameIndex(index);
    }
  }, []);

  // Toggle Play / Pause with wrap-to-0 if at the end
  const togglePlay = useCallback(() => {
    setIsPlaying((prevPlaying) => {
      if (!prevPlaying) {
        if (currentFrameIndex >= TOTAL_FRAMES - 1) {
          setCurrentFrameIndex(0);
        }
        return true;
      }
      return false;
    });
  }, [currentFrameIndex]);

  // Handle Playback Interval with strict auto-stop at the final frame (index 3)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentFrameIndex((prevIndex) => {
          if (prevIndex >= TOTAL_FRAMES - 1) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prevIndex;
          }
          const nextIndex = prevIndex + 1;
          if (nextIndex >= TOTAL_FRAMES - 1) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
          }
          return nextIndex;
        });
      }, DEFAULT_CADENCE_MS);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying]);

  // Select Target Preset Action
  const selectTarget = useCallback((targetId) => {
    const target = ObservationService.getTargetById(targetId);
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
  }, []);

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
    totalFrames: TOTAL_FRAMES,
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

/**
 * Astronomical Targets Data Export Facade for SPHEREx Explorer
 * 2026 NASA Space Apps Challenge
 *
 * CANONICAL ARCHITECTURE NOTICE:
 * As established in ADR-005 and TASK-304.1, `src/data/mockTargets.json` is the sole
 * canonical source of truth for target records and observation sequences.
 * This module delegates directly to MockDataProvider to eliminate data duplication.
 */

import { MockDataProvider } from '../services/providers/MockDataProvider.js';

export const CHALLENGE_TARGETS = MockDataProvider.loadTargets();

/**
 * Returns target by unique identifier
 * @param {string} id
 */
export function getTargetById(id) {
  return CHALLENGE_TARGETS.find((target) => target.id === id) || null;
}

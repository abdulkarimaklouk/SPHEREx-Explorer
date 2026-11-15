/**
 * Archive Data Provider Adapter for SPHEREx Explorer
 *
 * Single Responsibility: Access and return authentic pilot index records
 * from spherexPilotIndex.json.
 * Contains no business logic, coordinate mathematics, or React state.
 */

import pilotIndexData from '../../data/spherexPilotIndex.json' with { type: 'json' };

export class ArchiveDataProvider {
  /**
   * Loads the authentic SPHEREx DR1 pilot index dataset.
   * @returns {object}
   */
  static loadPilotIndex() {
    return pilotIndexData;
  }

  /**
   * Retrieves all indexed observation records.
   * @returns {Array<object>}
   */
  static loadPilotObservations() {
    return pilotIndexData.observations || [];
  }
}

/**
 * Mock Data Provider Adapter for SPHEREx Explorer
 *
 * Single Responsibility: Access and return raw mock target records from mockTargets.json.
 * Contains no business logic, coordinate mathematics, or React state.
 */

import mockData from '../../data/mockTargets.json' with { type: 'json' };

export class MockDataProvider {
  /**
   * Loads the raw dataset of targets and their synthetic observation sequences.
   * @returns {Array<object>} List of raw target records
   */
  static loadTargets() {
    return mockData.targets || [];
  }

  /**
   * Returns metadata disclaimer and provenance statement.
   * @returns {object}
   */
  static getMetadata() {
    return {
      version: mockData.version,
      challenge: mockData.challenge,
      disclaimer: mockData.disclaimer,
    };
  }
}

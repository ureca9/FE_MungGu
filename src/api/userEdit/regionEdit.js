import { createInterestEndpoint } from './preferenceEdit';

const { get: getPreferenceRegions, save: savePreferenceRegions } =
  createInterestEndpoint('regions');
export { getPreferenceRegions, savePreferenceRegions };


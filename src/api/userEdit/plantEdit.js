import { createInterestEndpoint } from './preferenceEdit';

const { get: getPreferencePlaces, save: savePreferencePlaces } =
  createInterestEndpoint('places');
export { getPreferencePlaces, savePreferencePlaces };


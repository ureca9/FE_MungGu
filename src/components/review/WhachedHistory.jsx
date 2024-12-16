import { useEffect } from 'react';

const WhachedHistory = ({ id, data, type }) => {
  useEffect(() => {
    if (data) {
      const watchedPlace = JSON.parse(localStorage.getItem('watched')) || [];
      const idKey = type === 'place' ? 'placeid' : 'pensionId';
      const isExisting = watchedPlace.some((item) => item[idKey] === id);

      if (!isExisting) {
        const updatedWatched = [
          {
            [idKey]: id,
            ...data,
          },
          ...watchedPlace,
        ].slice(0, 10);
        localStorage.setItem('watched', JSON.stringify(updatedWatched));
      }
    }
  }, [data, id, type]);
  return null;
};

export default WhachedHistory;

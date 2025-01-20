import axios from 'axios';

export const fetchPlaces = async (page, filters, accessToken) => {
  const params = {
    page,
    size: 10,
    searchWord: filters.searchWord || '',
    regionList: filters.regionList?.includes('전체') ? [] : filters.regionList || [],
    placeTypes: filters.placeTypes?.includes('전체') ? [] : filters.placeTypes || [],
    heaviestDogWeight: filters.heaviestDogWeight || 0,
  };

  const headers = {
    Accept: 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await axios.get('https://meong9.store/api/v1/search/places', {
    params,
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      for (const key in params) {
        if (Array.isArray(params[key])) {
          searchParams.append(key, params[key].join(','));
        } else {
          searchParams.append(key, params[key]);
        }
      }
      return searchParams.toString();
    },
    headers,
  });

  return response.data.data;
};

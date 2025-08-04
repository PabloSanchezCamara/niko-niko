import API from 'utils/api';

import { buildQueryParams } from './utils';

export const findCompany = async (id) => {
  const url = `/api/v1/company/${id}`;
  return API.request('GET', url);
};

export const findCompanyMoods = async (id, queryParams) => {
  const queryParamsString = buildQueryParams(queryParams);
  const url = `/api/v1/company/${id}/moods?${queryParamsString}`;
  return API.request('GET', url);
};

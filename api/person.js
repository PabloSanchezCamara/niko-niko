import API from '../utils/api';

export const sendMood = async (id, body) => {
  const url = `/api/v2/person/${id}/moods`;
  return API.request('POST', url, body);
};

export const updateMood = async (id, moodId, body) => {
  const url = `/api/v2/person/${id}/moods/${moodId}`;
  return API.request('PATCH', url, body);
};

export const findMood = async (id, date) => {
  const url = `/api/v2/person/${id}/moods?date=${date}`;
  return API.request('GET', url);
};

const getHeaders = token => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getUserSettings = (url, token) =>
  fetch(`${url}/settings`, {
    method: 'GET',
    headers: getHeaders(token),
  }).then(res => res.json());

export const updateUserSettings = (url, token, settings) =>
  fetch(`${url}/settings`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify(settings),
  }).then(res => res.json());

export const getUser = (url, token) =>
  fetch(`${url}/getUser`, {
    method: 'GET',
    headers: getHeaders(token),
  }).then(res => res.json());

export const updateUser = (url, token, userData) =>
  fetch(`${url}/updateUser`, {
    method: 'PATCH',
    headers: getHeaders(token),
    body: JSON.stringify(userData),
  }).then(res => res.json());

export const increaseStreak = (url, token) =>
  fetch(`${url}/streak`, {
    method: "PATCH",
    headers: getHeaders(token),
  }).then(res => res.json());

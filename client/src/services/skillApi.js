const getHeaders = token => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const createSkill = (url, token, data) =>
  fetch(`${url}/create`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getCUSkills = (url, token) =>
  fetch(`${url}/user`, {
    method: 'GET',
    headers: getHeaders(token),
  }).then(res => res.json());

export const deleteOneSkill = (url, token, skillId) =>
  fetch(`${url}/${skillId}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  }).then(res => res.json());

export const updateSkill = (url, token, skillId, data) =>
  fetch(`${url}/${skillId}`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getUserSkill = (url, token, userId) =>
  fetch(`${url}/user/${userId}`, {
    method: 'GET',
    headers: getHeaders(token),
  }).then(res => res.json());

export const getOneSkill = (url, token, skillId) =>
  fetch(`${url}/${skillId}`, {
    method: 'GET',
    headers: getHeaders(token),
  }).then(res => res.json());

export const getCategories = (url, token) =>
  fetch(`${url}/getCategories`, {
    method: "GET",
    headers: getHeaders(token),
  }).then(res => res.json());

export const getNiches = (url, token, category) =>
  fetch(`${url}/getNiches`, {
    method: "GET",
    headers: getHeaders(token),
    body: JSON.stringify({ category }),
  }).then(res => res.json());

export const getPhases = (url, token, skillId) =>
  fetch(`${url}/getPhases/${skillId}`, {
    method: "GET",
    headers: getHeaders(token),
    body: JSON.stringify({ id: skillId }),
  }).then((res) => res.json());

export const getExtPhase = (url, token, phaseId) =>
  fetch(`${url}/getExtPhase/${phaseId}`, {
    method: "GET",
    headers: getHeaders(token),
  }).then((res) => res.json());

export const getTask = (url, token, taskId) =>
  fetch(`${url}/getTask/${taskId}`, {
    method: "GET",
    headers: getHeaders(token),
  }).then((res) => res.json());
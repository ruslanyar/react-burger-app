import {
  BASE_URL,
  ERR_MESSAGE,
  ORDERS_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
} from './constants';

import { saveTokens } from './utils';

export async function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(await res.json());
}

export function orderFetch(ids, token) {
  return fetch(`${BASE_URL}${ORDERS_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  }).then(checkResponse);
}

export function fetchAuth(endpoint, body) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

function updateTokens() {
  const refreshToken = localStorage.getItem('refreshToken');
  return fetchAuth(REFRESH_TOKEN_ENDPOINT, {
    token: refreshToken,
  })
    .then(data => {
      console.log(data);
      if (!data.success) {
        return Promise.reject(data);
      }
      saveTokens(data);
      return data;
    })
}

export async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === ERR_MESSAGE) {
      const refreshData = await updateTokens();
      options.headers.Authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

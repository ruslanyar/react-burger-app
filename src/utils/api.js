import {
  BASE_URL,
  ORDERS_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT
} from './constants';

import { saveTokens } from './utils';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
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

export function updateTokens() {
  fetchAuth(REFRESH_TOKEN_ENDPOINT, {
    token: localStorage.getItem('refreshToken'),
  })
    .then(saveTokens)
}

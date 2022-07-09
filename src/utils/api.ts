import { ITokenResponse } from '../services/types/data';
import {
  BASE_URL,
  ERR_MESSAGE,
  ORDERS_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
} from './constants';

import { saveTokens } from './utils';

export async function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(await res.json());
}

export function orderFetch(ids: string[], token: string) {
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

export function fetchAuth(endpoint: string, body: object) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

function updateTokens(): Promise<ITokenResponse> {
  const refreshToken = localStorage.getItem('refreshToken');
  return fetchAuth(REFRESH_TOKEN_ENDPOINT, {
    token: refreshToken,
  })
    .then(data => {
      if (!data.success) {
        return Promise.reject(data);
      }
      saveTokens(data);
      return data;
    })
    .catch(err => console.log(err));
}

export async function fetchWithRefresh(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    console.log(err.message);
    if (err.message === ERR_MESSAGE) {
      const refreshData = await updateTokens();
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

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
  return fetch(`${BASE_URL}/${ORDERS_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  });
}

export function fetchAuth(endpoint: string, body: object) {
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

function updateTokens(): Promise<ITokenResponse> {
  const refreshToken = localStorage.getItem('refreshToken');
  return fetchAuth(REFRESH_TOKEN_ENDPOINT, {
    token: refreshToken,
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        return Promise.reject(data);
      }
      saveTokens(data);
      return data;
    })
    .catch((err) => console.log(err));
}

export async function fetchWithRefresh(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    return res;
  } catch (err: any) {
    console.log(err.message);
    if (err.message === ERR_MESSAGE) {
      console.log('2');
      const refreshData = await updateTokens();
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      const res = await fetch(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
}

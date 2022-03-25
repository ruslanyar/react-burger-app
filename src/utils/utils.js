import { BASE_URL } from "./constants";

export function orderFetch(igredients) {
  return fetch(`${BASE_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        ingredients: igredients
      }
    )
  });
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

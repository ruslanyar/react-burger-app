export function orderFetch(igredients) {
  return fetch('https://norma.nomoreparties.space/api/orders', {
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

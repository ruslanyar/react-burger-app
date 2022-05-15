import { BASE_URL, HIDE_ICON, PASSWORD, SHOW_ICON, TEXT } from "./constants";

export function orderFetch(ids) {
  return fetch(`${BASE_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        ingredients: ids
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


export function throttle(callee, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  }
}

export function onIconClickHandler(setFn) {
  setFn((prev) => {
    if (prev.type === PASSWORD) {
      return {
        icon: HIDE_ICON,
        type: TEXT,
      };
    } else {
      return {
        icon: SHOW_ICON,
        type: PASSWORD,
      };
    }
  });
}

export function inputOnChangeHandler(e, setFn) {
  setFn(e.target.value);
}

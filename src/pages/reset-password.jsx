import React, { useState } from 'react';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';

import { PASSWORD, TEXT } from '../utils/constants';
import { checkResponse } from '../utils/utils';

export function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const onSubmitHandler = (e, body) => {
    console.log(JSON.stringify(body));
    e.preventDefault();
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(body),
    })
      .then(checkResponse)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };

  return (
    <Form
      title="Восстановление пароля"
      body={{ password: passwordValue, token: codeValue }}
      buttonText="Сохранить"
      onClick={onSubmitHandler}
      text="Вспомнили пароль?"
      link="/login"
      linkText="Войти"
    >
      <FormInput
        type={PASSWORD}
        placeholder="Введите новый пароль"
        value={passwordValue}
        setValue={setPasswordValue}
        icon
      />
      <FormInput
        type={TEXT}
        placeholder="Введите код из письма"
        value={codeValue}
        setValue={setCodeValue}
      />
    </Form>
  );
}

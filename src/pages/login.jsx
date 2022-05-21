import React, { useState } from 'react';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { EMAIL, PASSWORD } from '../utils/constants';
import { checkResponse } from '../utils/utils';

export function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onSubmitHandler = (e, body) => {
    e.preventDefault();
    fetch('https://norma.nomoreparties.space/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  return (
    <Form
      title="Вход"
      body={{ email: emailValue, password: passwordValue }}
      buttonText="Войти"
      onClick={onSubmitHandler}
      text="Вы — новый пользователь?"
      link="/register"
      linkText="Зарегистрироваться"
      isLoginPage
    >
      <FormInput
        type={EMAIL}
        placeholder="E-mail"
        value={emailValue}
        setValue={setEmailValue}
      />
      <FormInput
        type={PASSWORD}
        placeholder="Пароль"
        value={passwordValue}
        setValue={setPasswordValue}
        icon
      />
    </Form>
  );
}

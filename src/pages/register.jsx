import React, { useState } from 'react';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { EMAIL, PASSWORD, TEXT } from '../utils/constants';
import { checkResponse } from '../utils/utils';

export function Register() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onSubmitHandler = (e, body) => {
    e.preventDefault();
    fetch('https://norma.nomoreparties.space/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(body),
    })
      .then(checkResponse)
      .then((data) => console.log(data));
  };

  return (
    <Form
      title="Регистрация"
      body={{ email: emailValue, password: passwordValue, name: nameValue }}
      buttonText="Зарегистрироваться"
      onClick={onSubmitHandler}
      text="Уже зарегистрированы?"
      link="/login"
      linkText="Войти"
    >
      <FormInput
        type={TEXT}
        placeholder="Имя"
        value={nameValue}
        setValue={setNameValue}
      />
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

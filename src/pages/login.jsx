import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { EMAIL, LOGIN_ENDPOINT, PASSWORD } from '../utils/constants';
import { fetchAuth } from '../utils/api';
import { USER_SIGN_IN } from '../services/actions/userActions';
import { saveTokens } from '../utils/utils';

export function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();

  const onSubmitHandler = (e, body) => {
    e.preventDefault();

    fetchAuth(LOGIN_ENDPOINT, body)
      .then(data => {
        if (data.success) {
          dispatch({ type: USER_SIGN_IN, payload: {...data.user, pass: passwordValue} });
        }
        return data;
      })
      .then(saveTokens)
      .catch(err => console.log(err));
  }

  return (
    <Form
      title="Вход"
      body={{ email: emailValue, password: passwordValue }}
      buttonText="Войти"
      onSubmit={onSubmitHandler}
      text="Вы — новый пользователь?"
      link="/register"
      linkText="Зарегистрироваться"
      isLoginPage
    >
      <FormInput
        name='email'
        type={EMAIL}
        placeholder="E-mail"
        value={emailValue}
        setValue={setEmailValue}
      />
      <FormInput
        name='password'
        type={PASSWORD}
        placeholder="Пароль"
        value={passwordValue}
        setValue={setPasswordValue}
        icon
      />
    </Form>
  );
}

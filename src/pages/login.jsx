import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { EMAIL, PASSWORD } from '../utils/constants';
import { signInUserThunk } from '../services/thunks';

export function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();

  const body = useMemo(() => ({
    email: emailValue,
    password: passwordValue,
  }), [emailValue, passwordValue]);

  const onSubmitHandler = useCallback((e, body) => {
    e.preventDefault();
    dispatch(signInUserThunk(body));
  }, [dispatch]);

  return (
    <Form
      title="Вход"
      body={body}
      buttonText="Войти"
      onSubmit={onSubmitHandler}
      text="Вы — новый пользователь?"
      link="/register"
      linkText="Зарегистрироваться"
      isLoginPage
    >
      <FormInput
        name="email"
        type={EMAIL}
        placeholder="E-mail"
        value={emailValue}
        setValue={setEmailValue}
      />
      <FormInput
        name="password"
        type={PASSWORD}
        placeholder="Пароль"
        value={passwordValue}
        setValue={setPasswordValue}
        icon
      />
    </Form>
  );
}

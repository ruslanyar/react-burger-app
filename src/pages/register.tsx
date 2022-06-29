import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { EMAIL, PASSWORD, TEXT } from '../utils/constants';
import { registerUser } from '../services/thunks';
import { TOnSubmitHandler } from '../components/form/form.types';

export function Register(): JSX.Element {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();

  const body = useMemo(() => ({
    email: emailValue,
    password: passwordValue,
    name: nameValue,
  }), [emailValue, nameValue, passwordValue]);

  const onSubmitHandler: TOnSubmitHandler = useCallback(
    (e, body) => {
      e.preventDefault();
      dispatch(registerUser(body));
    },
    [dispatch]
  );

  return (
    <Form
      title="Регистрация"
      body={body}
      buttonText="Зарегистрироваться"
      onSubmit={onSubmitHandler}
      text="Уже зарегистрированы?"
      link="/login"
      linkText="Войти"
    >
      <FormInput
        name="name"
        type={TEXT}
        placeholder="Имя"
        value={nameValue}
        setValue={setNameValue}
      />
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

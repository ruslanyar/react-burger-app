import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { EMAIL, PASSWORD, REGISTRATION_ENDPOINT, TEXT } from '../utils/constants';
import { fetchAuth } from '../utils/api';
import { USER_REGISTRATION } from '../services/actions/userActions';

export function Register() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();

  const onSubmitHandler = (e, body) => {
    e.preventDefault();

    fetchAuth(REGISTRATION_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch({ type: USER_REGISTRATION, payload: data.user });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      title="Регистрация"
      body={{ email: emailValue, password: passwordValue, name: nameValue }}
      buttonText="Зарегистрироваться"
      onSubmit={onSubmitHandler}
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

import React from 'react';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { PASSWORD } from '../utils/constants';

export function Login() {
  return (
    <Form
      title="Вход"
      buttonText="Войти"
      text="Вы — новый пользователь? "
      link="/register"
      linkText="Зарегистрироваться"
      text_2={true}
    >
      <FormInput type="email" placeholder="E-mail" />
      <FormInput type={PASSWORD} placeholder="Пароль" icon={true} />
    </Form>
  );
}

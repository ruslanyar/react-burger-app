import React from 'react';

import Form from '../components/form/form';
import FormInput from '../components/form-input/form-input';

import { PASSWORD, TEXT } from '../utils/constants';

export function Register() {
  return (
    <Form
      title="Регистрация"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы? "
      link="/login"
      linkText="Войти"
    >
      <FormInput type={TEXT} placeholder='Имя' />
      <FormInput type="email" placeholder="E-mail" />
      <FormInput type={PASSWORD} placeholder="Пароль" icon={true} />
    </Form>
  );
}

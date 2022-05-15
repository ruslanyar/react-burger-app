import React from 'react';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';

export function ForgotPassword() {
  return (
    <Form
      title="Восстановление пароля"
      buttonText="Восстановить"
      text_1="Вспомнили пароль? Войти"
    >
      <FormInput type="email" placeholder="Укажите e-mail" />
    </Form>
  );
}

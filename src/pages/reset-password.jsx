import React from 'react';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';

import { PASSWORD, SHOW_ICON, TEXT } from '../utils/constants';

export function ResetPassword() {
  return (
    <Form
      title="Восстановление пароля"
      buttonText="Сохранить"
      text_1="Вспомнили пароль? Войти"
    >
      <FormInput type={PASSWORD} placeholder='Введите новый пароль' icon={SHOW_ICON} />
      <FormInput type={TEXT} placeholder='Введите код из письма' />
    </Form>
  );
}

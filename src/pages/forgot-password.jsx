import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';
import { EMAIL } from '../utils/constants';
import { checkResponse } from '../utils/utils';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');

  const onSubmitHandler = (e, body) => {
    e.preventDefault();
    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(body),
    })
      .then(checkResponse)
      .then((data) => {
        if (data.success) {
          navigate('/reset-password');
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <Form
      title="Восстановление пароля"
      body={{ email: emailValue }}
      buttonText="Восстановить"
      onClick={onSubmitHandler}
      text="Вспомнили пароль?"
      link="/login"
      linkText="Войти"
    >
      <FormInput
        type={EMAIL}
        placeholder="Укажите e-mail"
        value={emailValue}
        setValue={setEmailValue}
      />
    </Form>
  );
}

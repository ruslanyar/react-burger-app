import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';

import { EMAIL } from '../utils/constants';
import { forgotPasswordRequest } from '../utils/api';

export function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [emailValue, setEmailValue] = useState('');

  const onSubmitHandler = (e, body) => {
    e.preventDefault();

    forgotPasswordRequest(body)
      .then((data) => {
        if (data.success) {
          navigate('/reset-password', { state: { from: location } });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      title="Восстановление пароля"
      body={{ email: emailValue }}
      buttonText="Восстановить"
      onSubmit={onSubmitHandler}
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

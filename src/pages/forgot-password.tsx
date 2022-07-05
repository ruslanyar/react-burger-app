import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';

import { EMAIL, FORGOT_PASSWORD_ENDPOINT } from '../utils/constants';
import { fetchAuth } from '../utils/api';
import { TOnSubmitHandler } from '../components/form/form.types';

export const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [emailValue, setEmailValue] = useState('');

  const onSubmitHandler: TOnSubmitHandler = (e, body) => {
    e.preventDefault();

    fetchAuth(FORGOT_PASSWORD_ENDPOINT, body)
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
        name='email'
        type={EMAIL}
        placeholder="Укажите e-mail"
        value={emailValue}
        setValue={setEmailValue}
      />
    </Form>
  );
}

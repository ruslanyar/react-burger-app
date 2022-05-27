import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FormInput from '../components/form-input/form-input';
import Form from '../components/form/form';

import { PASSWORD, RESET_PASSWORD_ENDPOINT, TEXT } from '../utils/constants';
import { fetchAuth } from '../utils/api';

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (from !== '/forgot-password') {
      navigate('/forgot-password', { replace: true });
    }
  }, [from, navigate]);

  const onSubmitHandler = (e, body) => {
    e.preventDefault();

    fetchAuth(RESET_PASSWORD_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form
      title="Восстановление пароля"
      body={{ password: passwordValue, token: codeValue }}
      buttonText="Сохранить"
      onSubmit={onSubmitHandler}
      text="Вспомнили пароль?"
      link="/login"
      linkText="Войти"
    >
      <FormInput
        type={PASSWORD}
        placeholder="Введите новый пароль"
        value={passwordValue}
        setValue={setPasswordValue}
        icon
      />
      <FormInput
        type={TEXT}
        placeholder="Введите код из письма"
        value={codeValue}
        setValue={setCodeValue}
      />
    </Form>
  );
}

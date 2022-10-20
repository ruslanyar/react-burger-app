import { FC, useCallback, useMemo, useState } from 'react';

import Form from '../../components/form/form';
import FormInput from '../../components/form-input/form-input';

import { EMAIL, PASSWORD } from '../../utils/constants';
import { TOnSubmitHandler } from '../../components/form/form.types';
import { logInUser } from '../../services/thunks/user';
import { useAppDispatch } from '../../services/hooks';

export const Login: FC = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useAppDispatch();

  const body = useMemo(() => ({
    email: emailValue,
    password: passwordValue,
  }), [emailValue, passwordValue]);

  const onSubmitHandler: TOnSubmitHandler = useCallback((e, body) => {
    e.preventDefault();
    dispatch(logInUser(body));
  }, [dispatch]);

  return (
    <Form
      title="Вход"
      body={body}
      buttonText="Войти"
      onSubmit={onSubmitHandler}
      text="Вы — новый пользователь?"
      link="/register"
      linkText="Зарегистрироваться"
      isLoginPage
    >
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

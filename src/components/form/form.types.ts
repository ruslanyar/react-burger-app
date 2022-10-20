import { FormEvent, ReactNode } from 'react';

type TFormTitle = 'Регистрация' | 'Вход' | 'Восстановление пароля' | 'Восстановление пароля';
type TFormBodyKey = 'name' | 'password' | 'email' | 'token';
type TFormButtonText = 'Зарегистрироваться' | 'Войти' | 'Восстановить' | 'Сохранить';
type TFormText = 'Уже зарегистрированы?' | 'Вы — новый пользователь?' | 'Вспомнили пароль?';
type TFormBody = { [key in TFormBodyKey]?: string }

export type TOnSubmitHandler = (e: FormEvent<HTMLFormElement>, body: TFormBody) => void;

export interface IFormProps {
  title: TFormTitle;
  body: TFormBody;
  buttonText: TFormButtonText;
  onSubmit: TOnSubmitHandler;
  text: TFormText;
  link: '/login' | '/register';
  linkText: 'Войти' | 'Зарегистрироваться';
  isLoginPage?: boolean;
  children: ReactNode;
}

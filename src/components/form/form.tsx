import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { IFormProps } from './form.types';

import styles from './form.module.css';

const titleStyle = clsx(
  'text',
  'text_type_main-medium',
  styles['form-title'],
  'mb-6'
);

const Form: FC<IFormProps> = ({
  children,
  title,
  body,
  buttonText,
  onSubmit,
  text,
  link,
  linkText,
  isLoginPage = false,
}) => {
  return (
    <div className={styles['form-container']}>
      <h2 className={titleStyle}>{title}</h2>
      <form className={styles.form} onSubmit={(e) => onSubmit(e, body)}>
        {children}
        <div className={clsx(styles['form__button'], 'mb-20')}>
          <Button type="primary" size="medium">
            {buttonText}
          </Button>
        </div>
      </form>
      <div>
        <p className={clsx('text text_type_main-default', styles['form-text'])}>
          {text}{' '}
          <Link to={link} className="link">
            {linkText}
          </Link>
        </p>
        {isLoginPage && (
          <p
            className={clsx(
              'text text_type_main-default mt-4',
              styles['form-text']
            )}
          >
            Забыли пароль?{' '}
            <Link to="/forgot-password" className="link">
              Восстановить пароль
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Form;

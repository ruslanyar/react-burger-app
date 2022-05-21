import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './form.module.css';

const titleStyle = clsx(
  'text',
  'text_type_main-medium',
  styles['form-title'],
  'mb-6'
);

export default function Form({
  children,
  title,
  body,
  buttonText,
  onClick,
  text,
  link,
  linkText,
  isLoginPage = false,
}) {
  return (
    <div className={styles['form-container']}>
      <h2 className={titleStyle}>{title}</h2>
      <form className={styles.form}>
        {children}
        <div className={clsx(styles['form__button'], 'mb-20')}>
          <Button type="primary" size="medium" onClick={(e) => onClick(e, body)}>
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

Form.propTypes ={
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  title: PropTypes.string,
  body: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  isLoginPage: PropTypes.bool,
}

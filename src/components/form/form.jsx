import React from 'react';
import clsx from 'clsx';
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
  buttonText,
  text_1,
  text_2 = false,
}) {
  return (
    <div className={styles['form-container']}>
      <h2 className={titleStyle}>{title}</h2>
      <form className={styles.form}>
        {children}
        <div className={clsx(styles['form__button'], 'mb-20')}>
          <Button type="primary" size="medium">
            {buttonText}
          </Button>
        </div>
      </form>
      <div>
        <p className={clsx('text text_type_main-default', styles['form-text'])}>
          {text_1}
        </p>
        {text_2 && (
          <p
            className={clsx(
              'text text_type_main-default mt-4',
              styles['form-text']
            )}
          >
            Забыли пароль? Восстановить пароль
          </p>
        )}
      </div>
    </div>
  );
}

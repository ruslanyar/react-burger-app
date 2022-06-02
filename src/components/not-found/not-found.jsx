import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles['text-container']}>
        <h1 className="text text_type_main-large mb-4">А где здесь бургер заказать?</h1>
        <Link
          to="/"
          className={clsx(styles.link, 'text', 'text_type_main-medium')}
        >
          Вернуться на главную
        </Link>
      </div>
      <div className={styles.overlay} />
    </div>
  );
}

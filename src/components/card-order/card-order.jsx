import React from 'react';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './card-order.module.css';

export default function CardOrder() {
  return (
    <article className={clsx(styles['card-order'], 'p-6', 'mb-4')}>
      <div className={styles.orderId}>
        <span className={clsx('text', 'text_type_digits-default')}>
          #1234567
        </span>
        <span
          className={clsx(
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>

      <p className={clsx('text', 'text_type_main-medium')}>
        Death Star Starship Main бургер
      </p>

      <div className={styles.info}>

        <div className={styles.ingredients}>
          <div className={styles['image-container']}>
            <div className={styles.border} />
            <div
              style={{
                backgroundImage:
                  'url("https://code.s3.yandex.net/react/code/bun-02-mobile.png")',
              }}
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.price}>
          <span className={clsx('text', 'text_type_digits-default')}>430</span>
          <CurrencyIcon />
        </div>

      </div>
    </article>
  );
}

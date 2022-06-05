import React from 'react';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientIcon from '../ingredient-icon/ingredient-icon';

import styles from './card-order.module.css';

const imageUrls = [
  { id: 1, url: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png' },
  { id: 2, url: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png' },
  { id: 3, url: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png' },
  { id: 4, url: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png' },
  { id: 5, url: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png' },
  { id: 6, url: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png' },
  //{id:7, url: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"},
];

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
        <ul className="list">
          {imageUrls.map((url, index) => (
            <li className={styles['list-item']}>
              <IngredientIcon key={url.id} imageUrl={url.url} index={index} />
            </li>
          ))}
        </ul>

        <div className={styles.price}>
          <span className={clsx('text', 'text_type_digits-default')}>430</span>
          <CurrencyIcon />
        </div>
      </div>
    </article>
  );
}

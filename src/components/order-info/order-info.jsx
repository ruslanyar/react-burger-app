import React from 'react';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientIcon from '../ingredient-icon/ingredient-icon';

import styles from './order-info.module.css';

export default function OrderInfo() {
  return (
    <div className="">
      <span className="">#034533</span>
      <h2>Black Hole Singularity острый бургер</h2>
      <span>Выполнен</span>
      <h3>Состав:</h3>

      <ul
        className={clsx(
          styles['ingredients-list'],
          'list',
          'custom-scroll',
          'pr-6'
        )}
      >
        <li className={styles.ingredient}>
          <IngredientIcon
            imageUrl="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            position="relative"
          />
          <p>Флюоресцентная булка R2-D3</p>
          <div>
            <span></span>
            <CurrencyIcon />
          </div>
        </li>
      </ul>

      <div>
        <span></span>
        <div>
          <span></span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}

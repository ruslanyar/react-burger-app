import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientIcon from '../ingredient-icon/ingredient-icon';

import { BUN } from '../../utils/constants';

import styles from './card-order.module.css';

export default function CardOrder({ order }) {
  const { ingredients } = useSelector((store) => store.ingredients);

  const { name, number, ingredients: ingredIds } = order;

  const orderNumber = useMemo(() => {
    return `#${number.toString().padStart(6, '0')}`;
  }, [number]);

  const { imageUrls, totalPrice } = useMemo(() => {
    const urls = [];
    let price = 0;

    ingredIds.forEach((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        if (urls.length < 6) {
          urls.push(ingredient.image_mobile);
        }

        if (ingredient.type === BUN) {
          price += ingredient.price * 2;
        } else {
          price += ingredient.price;
        }
      }
    });

    return {
      imageUrls: urls,
      totalPrice: price,
    };
  }, [ingredients, ingredIds]);

  const count = useMemo(() => {
    return ingredIds.length - 6;
  }, [ingredIds.length]);

  return (
    <article className={clsx(styles['card-order'], 'p-6', 'mb-4')}>
      <div className={styles.orderId}>
        <span className={clsx('text', 'text_type_digits-default')}>
          {orderNumber}
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

      <p className={clsx('text', 'text_type_main-medium')}>{name}</p>

      <div className={styles.info}>
        <ul className="list">
          {imageUrls.map((url, index) => (
            <li key={index} className={styles['list-item']}>
              <IngredientIcon imageUrl={url} index={index} count={count} />
            </li>
          ))}
        </ul>

        <div className={styles.price}>
          <span className={clsx('text', 'text_type_digits-default')}>
            {totalPrice}
          </span>
          <CurrencyIcon />
        </div>
      </div>
    </article>
  );
}

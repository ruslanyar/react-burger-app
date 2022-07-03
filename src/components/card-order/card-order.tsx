import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../services/hooks/hooks';

import IngredientIcon from '../ingredient-icon/ingredient-icon';

import { BUN } from '../../utils/constants';
import { formatOrderNumber, getOrderStatus, getTimeStampString } from '../../utils/utils';
import { ingredientsSelector } from '../../services/selectors';
import { ICardOrderProps } from './card-order.types';
import { IIngredient } from '../../services/types/data';

import styles from './card-order.module.css';

const CardOrder: FC<ICardOrderProps> = ({ order, isUser }) => {
  const { ingredients } = useAppSelector(ingredientsSelector);
  const { name, number, ingredients: ingredIds, createdAt, status } = order;
  const orderStatus = getOrderStatus(status);

  const orderNumber = useMemo(() => {
    return `#${formatOrderNumber(number)}`;
  }, [number]);

  const { imageUrls, totalPrice } = useMemo(() => {
    const urls: string[] = [];
    let price = 0;

    ingredIds.forEach((id) => {
      const ingredient = ingredients.find((item: IIngredient) => item._id === id);
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

  const orderTime = getTimeStampString(createdAt);

  return (
    <article className={clsx(styles['card-order'], 'p-6', 'mb-4', 'mr-2')}>
      <div className={styles.orderId}>
        <span className={clsx('text', 'text_type_digits-default', 'mb-6')}>
          {orderNumber}
        </span>
        <span
          className={clsx(
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          {orderTime}
        </span>
      </div>

      <p
        className={clsx(
          'text',
          'text_type_main-medium',
          isUser ? 'mb-2' : 'mb-6'
        )}
      >
        {name}
      </p>
      {isUser && (
        <p
          className={clsx(
            'text',
            'text_type_main-default',
            'mb-6',
            status === 'done' && 'order-status'
          )}
        >
          {orderStatus}
        </p>
      )}
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
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  );
}

export default CardOrder;

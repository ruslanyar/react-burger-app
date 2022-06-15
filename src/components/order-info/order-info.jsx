import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderInfoItem from '../order-info-item/order-info-item';
import Loader from '../../ui/loader/Loader';

import { getOrders, ingredientsSelector } from '../../services/selectors';
import { wsClose, wsConnectionStart } from '../../services/actions';
import { formatOrderNumber, getOrderStatus } from '../../utils/utils';
import { BUN } from '../../utils/constants';

import styles from './order-info.module.css';

export default function OrderInfo({ isModal = false }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orders } = useSelector(getOrders);
  const { ingredients } = useSelector(ingredientsSelector);

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => dispatch(wsClose());
  }, [dispatch]);

  if (!orders) return <Loader />;

  const order = orders.find((order) => order._id === id);
  const { name, number, status, ingredients: ingredIds } = order;
  const orderNumber = `#${formatOrderNumber(number)}`;
  const orderStatus = getOrderStatus(status);

  const orderIngredients = ingredIds.reduce((acc, current) => {
    const ingredient = ingredients.find((item) => item._id === current);
    if (!acc[current]) {
      ingredient.type === BUN
        ? acc[current] = { ...ingredient, count: 2 }
        : acc[current] = { ...ingredient, count: 1 };
    } else {
      ingredient.type === BUN
        ? acc[current].count = 2
        : acc[current].count++;
    }

    return acc;
  }, {});

  const ingredientsList = Object.values(orderIngredients);
  const totalPrice = ingredientsList.reduce(
    (acc, ingredient) => acc + ingredient.price * ingredient.count,
    0
  );

  return (
    <div className={clsx(styles.container, 'pt-5')}>
      <p
        className={clsx(
          !isModal && styles['order-number'],
          'text',
          'text_type_digits-default',
          'mb-10'
        )}
      >
        {orderNumber}
      </p>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-3')}>{name}</h2>
      <p
        className={clsx(
          'text',
          'text_type_main-default',
          'mb-15',
          status === 'done' && 'order-status'
        )}
      >
        {orderStatus}
      </p>
      <h3 className={clsx('text', 'text_type_main-medium', 'mb-6')}>Состав:</h3>
      <div className="mb-10">
        <ul
          className={clsx(styles['ingredients-list'], 'list', 'custom-scroll')}
        >
          {ingredientsList.map((item, index) => (
            <li key={index} className={clsx(styles.ingredient, 'mr-6')}>
              <OrderInfoItem ingredient={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles['time-price']}>
        <p
          className={clsx(
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={styles.price}>
          <span className={clsx('text', 'text_type_digits-default', 'mr-2')}>
            {totalPrice}
          </span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}

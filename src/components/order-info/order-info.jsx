import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Loader from '../../ui/loader/Loader';

import { getOrders, ingredientsSelector } from '../../services/selectors';
import { wsClose, wsConnectionStart } from '../../services/actions';
import { formatOrderNumber, getOrderStatus } from '../../utils/utils';

import styles from './order-info.module.css';

export default function OrderInfo() {
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

  return (
    <div className={clsx(styles.container, 'pt-5')}>
      <p className={clsx('text', 'text_type_digits-default', 'mb-10')}>
        {orderNumber}
      </p>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-3')}>{name}</h2>
      <p
        className={clsx(
          'text',
          'text_type_main-default',
          'mb-15',
          status === 'done' && styles['order-status']
        )}
      >
        {orderStatus}
      </p>
      <h3 className={clsx('text', 'text_type_main-medium', 'mb-6')}>Состав:</h3>
      <div className="mb-10">
        <ul
          className={clsx(styles['ingredients-list'], 'list', 'custom-scroll')}
        >
          <li className={clsx(styles.ingredient, 'mr-6')}>
            <div className="mr-4">
              <IngredientIcon
                imageUrl="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                position="relative"
              />
            </div>
            <p className={clsx('text', 'text_type_main-default', 'mr-4')}>
              Флюоресцентная булка R2-D3
            </p>
            <div className={styles.currency}>
              <p className={clsx('text', 'text_type_digits-default', 'mr-4')}>
                2 x 30
              </p>
              <CurrencyIcon />
            </div>
          </li>
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
            570
          </span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}

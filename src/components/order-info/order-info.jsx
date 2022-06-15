import React, { useEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderInfoItem from '../order-info-item/order-info-item';
import Loader from '../../ui/loader/Loader';

import { getOrders, getUserOrders, ingredientsSelector } from '../../services/selectors';
import { wsAuthClose, wsAuthConnectionStart, wsClose, wsConnectionStart } from '../../services/actions';
import { formatOrderNumber, getOrderStatus, getTimeStampString } from '../../utils/utils';
import { BUN } from '../../utils/constants';

import styles from './order-info.module.css';

export default function OrderInfo({ isModal = false }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const match = useMatch(`/feed/${id}`);
  const selector = match ? getOrders : getUserOrders;
  const { orders } = useSelector(selector);
  const { ingredients } = useSelector(ingredientsSelector);

  useEffect(() => {
    if (match) {
      dispatch(wsConnectionStart());
    } else {
      dispatch(wsAuthConnectionStart());
    }

    return () => {
      if (match) {
        dispatch(wsClose());
      } else {
        dispatch(wsAuthClose());
      }
    };
  }, [dispatch, match]);

  if (!orders) return <Loader />;

  const order = orders.find((order) => order._id === id);
  const { name, number, status, ingredients: ingredIds, createdAt } = order;
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
  const orderTime = getTimeStampString(createdAt);

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
          {orderTime}
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

OrderInfo.propTypes = {
  isModal: PropTypes.bool,
}

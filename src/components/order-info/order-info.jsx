import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientIcon from '../ingredient-icon/ingredient-icon';

import { getOrders } from '../../services/selectors';
import { wsClose, wsConnectionStart } from '../../services/actions';

import styles from './order-info.module.css';
import { formatOrderNumber } from '../../utils/utils';
import Loader from '../../ui/loader/Loader';

export default function OrderInfo() {
  const { id } = useParams();
  const { orders } = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => dispatch(wsClose());
  }, [dispatch]);

  if (!orders) return <Loader />;

  const order = orders.find((order) => order._id === id);
  const { name, number, status } = order;
  const orderNumber = `#${formatOrderNumber(number)}`;
  const orderStatus = status // TODO

  return (
    <div className={clsx(styles.container, 'pt-5')}>
      <p className={clsx('text', 'text_type_digits-default', 'mb-10')}>{orderNumber}</p>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-3')}>{name}</h2>
      <p className={clsx('text', 'text_type_main-default', 'mb-15')}>{orderStatus}</p>
      <h3 className={clsx('text', 'text_type_main-medium', 'mb-6')}>Состав:</h3>

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

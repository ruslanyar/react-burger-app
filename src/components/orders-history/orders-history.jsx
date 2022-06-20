import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Loader from '../../ui/loader/Loader';
import OrdersList from '../orders-list/orders-list';

import { wsAuthConnectionStart, wsAuthClose } from '../../services/actions';
import { getUserOrders } from '../../services/selectors';

import styles from './orders-history.module.css';

export default function OrdersHistory() {
  const dispatch = useDispatch();
  const { orders } = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(wsAuthConnectionStart());

    return () => dispatch(wsAuthClose());
  }, [dispatch]);

  if (!orders) return <Loader />;

  return (
    <div className={clsx(styles.container, 'custom-scroll')}>
      <OrdersList orders={orders} to="profile/orders" isUser />
    </div>
  );
}

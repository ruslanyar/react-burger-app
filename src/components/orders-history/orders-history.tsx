import React, { useEffect } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import Loader from '../../ui/loader/Loader';
import OrdersList from '../orders-list/orders-list';

import { wsAuthConnectionStartAction, wsAuthCloseAction } from '../../services/actions';
import { getUserOrders } from '../../services/selectors';

import styles from './orders-history.module.css';

function OrdersHistory(): JSX.Element {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(getUserOrders);

  useEffect(() => {
    dispatch(wsAuthConnectionStartAction());

    return () => dispatch(wsAuthCloseAction()) as any; // ! as any !!!!!!!!!!!!
  }, [dispatch]);

  if (!orders) return <Loader />;

  return (
    <div className={clsx(styles.container, 'custom-scroll')}>
      <OrdersList orders={orders} to="profile/orders" isUser />
    </div>
  );
}

export default OrdersHistory;

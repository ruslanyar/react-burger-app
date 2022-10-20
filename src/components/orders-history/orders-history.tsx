import { FC, useEffect } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../services/hooks';

import Loader from '../../ui/loader/Loader';
import OrdersList from '../orders-list/orders-list';
import { selectWsAuthOrders, wsAuthClose, wsAuthStart } from '../../services/slices/wsAuthSlice';

import styles from './orders-history.module.css';

const OrdersHistory: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(selectWsAuthOrders);

  useEffect(() => {
    dispatch(wsAuthStart());

    return () => {
      dispatch(wsAuthClose());
    } 
  }, [dispatch]);

  if (!orders) return <Loader />;

  return (
    <div className={clsx(styles.container, 'custom-scroll')}>
      <OrdersList orders={orders} to="profile/orders" isUser />
    </div>
  );
}

export default OrdersHistory;

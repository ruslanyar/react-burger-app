import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';

import CardOrder from '../card-order/card-order';

import { IOrdersListProps } from './orders-list.types';

import styles from './orders-list.module.css';

const OrdersList: FC<IOrdersListProps> = ({ orders, to, isUser = false }) => {
  const location = useLocation();

  return (
    <ul className="list">
      {orders.map((order) => (
          <li key={order._id}>
            <Link
              to={`/${to}/${order._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <CardOrder order={order} isUser={isUser} />
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default OrdersList;

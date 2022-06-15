import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CardOrder from '../card-order/card-order';

import styles from './orders-list.module.css';
import { orderPropType } from '../../utils/propTypes';

export default function OrdersList({ orders, to, isUser = false }) {
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

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
  to: PropTypes.string.isRequired,
  isUser: PropTypes.bool,
}

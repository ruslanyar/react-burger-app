import React from 'react';
import clsx from 'clsx';

import OrderInfo from '../components/order-info/order-info';

import styles from './order-info-page.module.css';

export function OrderInfoPage() {
  return (
    <div className={clsx(styles['order-info'], 'mt-25')}>
      <OrderInfo />
    </div>
  );
}

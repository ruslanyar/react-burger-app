import React, { useEffect } from 'react';

import clsx from 'clsx';

import CardOrder from '../card-order/card-order';

import styles from './burger-feed.module.css';

export default function BurgerFeed() {
  // useEffect(() => {
  //   const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
  // })

  return (
    <div className={styles.container}>
      <div className={clsx(styles.feed, 'custom-scroll')}>
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
      </div>

      <div className={styles.stats}>

      </div>
    </div>
  )
}

import React, { FC } from 'react';
import clsx from 'clsx';

import BurgerFeed from '../../components/burger-feed/burger-feed';

import styles from './feed-page.module.css';

export const FeedPage: FC = () => {
  return (
    <div className={clsx(styles.container, 'pl-5', 'pr-5')}>
      <h2 className={clsx('text', 'text_type_main-large', 'mb-5')}>
        Лента заказов
      </h2>
      <BurgerFeed />
    </div>
  );
}

import React, { useEffect } from 'react';

import clsx from 'clsx';

import CardOrder from '../card-order/card-order';

import styles from './burger-feed.module.css';
import { useDispatch } from 'react-redux';
import { wsClose, wsConnectionStart } from '../../services/actions';

const formatCount = (n) => {
  return n.toLocaleString();
}

export default function BurgerFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => {
      dispatch(wsClose());
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <section aria-label='Лента заказов' className={clsx(styles.feed, 'custom-scroll')}>
        {/* TODO Добавить список для элементов ленты*/}
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
        <CardOrder />
      </section>

      <section aria-label='Статистика заказов' className={styles.stats}>

        <div className={clsx(styles['orders-board'], 'mb-15')}>
          <section className={styles.done}>
            <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>Готовы:</h2>
            <ul className='list'>
              <li className={clsx(styles.number, styles['number_type_success'], 'text', 'text_type_digits-default', 'mb-2')}>034533</li>
              <li className={clsx(styles.number, styles['number_type_success'], 'text', 'text_type_digits-default', 'mb-2')}>034534</li>
              <li className={clsx(styles.number, styles['number_type_success'], 'text', 'text_type_digits-default', 'mb-2')}>034535</li>
              <li className={clsx(styles.number, styles['number_type_success'], 'text', 'text_type_digits-default', 'mb-2')}>034536</li>
              <li className={clsx(styles.number, styles['number_type_success'], 'text', 'text_type_digits-default', 'mb-2')}>034537</li>
            </ul>
          </section>

          <section className={styles['in-work']}>
            <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>В работе:</h2>
            <ul className='list'>
              <li className={clsx(styles.number, 'text', 'text_type_digits-default', 'mb-2')}>034538</li>
              <li className={clsx(styles.number, 'text', 'text_type_digits-default', 'mb-2')}>034539</li>
              <li className={clsx(styles.number, 'text', 'text_type_digits-default', 'mb-2')}>034540</li>
            </ul>
          </section>
        </div>

        <section className='mb-15'>
          <h2 className={clsx('text', 'text_type_main-medium')}>Выполнено за все время:</h2>
          <span className={clsx(styles.count, 'text', 'text_type_digits-large')}>{formatCount(28752)}</span>
        </section>

        <section className={styles.today}>
          <h2 className={clsx('text', 'text_type_main-medium')}>Выполнено за сегодня:</h2>
          <span className={clsx(styles.count, 'text', 'text_type_digits-large')}>{formatCount(138)}</span>
        </section>

      </section>
    </div>
  )
}

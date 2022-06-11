import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import CardOrder from '../card-order/card-order';
import Loader from '../../ui/loader/Loader';

import { wsClose, wsConnectionStart } from '../../services/actions';

import styles from './burger-feed.module.css';

const formatCount = (n) => {
  return n.toLocaleString();
};

const formatNumber = (n) => {
  return n.toString().padStart(6, '0');
};

export default function BurgerFeed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (store) => store.wsReducer.orders
  );
  const location = useLocation();

  const doneOrdersNumbers = useMemo(() => {
    return orders
      .filter((order) => order.status === 'done')
      .map((order) => order.number)
      .slice(0, 10);
  }, [orders]);

  const inWorkOrdersNumbers = useMemo(() => {
    return orders
      .filter((order) => order.status !== 'done')
      .map((order) => order.number)
      .slice(0, 10);
  }, [orders]);

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  if (!orders) return <Loader />;

  return (
    <div className={styles.container}>
      <section
        aria-label="Лента заказов"
        className={clsx(styles.feed, 'custom-scroll')}
      >
        <ul className="list">
          {orders &&
            orders.map((order) => (
              <li key={order._id}>
                <Link
                  to={`/feed/${order._id}`}
                  state={{ background: location }}
                  className={styles.link}
                >
                  <CardOrder order={order} />
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <section aria-label="Статистика заказов" className={styles.stats}>
        <div className={clsx(styles['orders-board'], 'mb-15')}>
          <section className={styles.done}>
            <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>
              Готовы:
            </h2>
            <ul className={clsx(styles['number-list'], 'list')}>
              {doneOrdersNumbers.length > 0 &&
                doneOrdersNumbers.map((num) => (
                  <li
                    className={clsx(
                      styles.number,
                      styles['number_type_success'],
                      'text',
                      'text_type_digits-default',
                      'mb-2'
                    )}
                  >
                    {formatNumber(num)}
                  </li>
                ))}
            </ul>
          </section>

          <section className={styles['in-work']}>
            <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>
              В работе:
            </h2>
            <ul className="list">
              {inWorkOrdersNumbers.length > 0 &&
                inWorkOrdersNumbers.map((num) => (
                  <li
                    className={clsx(
                      styles.number,
                      'text',
                      'text_type_digits-default',
                      'mb-2'
                    )}
                  >
                    {formatNumber(num)}
                  </li>
                ))}
            </ul>
          </section>
        </div>

        <section className="mb-15">
          <h2 className={clsx('text', 'text_type_main-medium')}>
            Выполнено за все время:
          </h2>
          <span
            className={clsx(styles.count, 'text', 'text_type_digits-large')}
          >
            {formatCount(total)}
          </span>
        </section>

        <section className={styles.today}>
          <h2 className={clsx('text', 'text_type_main-medium')}>
            Выполнено за сегодня:
          </h2>
          <span
            className={clsx(styles.count, 'text', 'text_type_digits-large')}
          >
            {formatCount(totalToday)}
          </span>
        </section>
      </section>
    </div>
  );
}

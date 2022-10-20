import { FC, useEffect, useMemo } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../services/hooks';

import OrdersList from '../orders-list/orders-list';
import Loader from '../../ui/loader/Loader';

import { selectWsOrders, wsClose, wsStart } from '../../services/slices/wsSlice';
import { formatOrderNumber } from '../../utils/utils';
import { IOrder } from '../../services/types/data';

import styles from './burger-feed.module.css';

const formatCount = (n: number): string => {
  return n.toLocaleString();
};

const BurgerFeed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector(selectWsOrders);

  const doneOrdersNumbers = useMemo<number[] | null>(() => {
    return orders
      ? orders
          .filter((order: IOrder) => order.status === 'done')
          .map((order: IOrder) => order.number)
          .slice(0, 10)
      : null;
  }, [orders]);

  const inWorkOrdersNumbers = useMemo<number[] | null>(() => {
    return orders
    ? orders
    .filter((order: IOrder) => order.status !== 'done')
    .map((order: IOrder) => order.number)
    .slice(0, 10)
    : null;
  }, [orders]);
  
  useEffect(() => {
    dispatch(wsStart());
    
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
        <OrdersList orders={orders} to="feed" />
      </section>

      <section aria-label="Статистика заказов" className={styles.stats}>
        <div className={clsx(styles['orders-board'], 'mb-15')}>
          <section className={styles.done}>
            <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>
              Готовы:
            </h2>
            <ul className={clsx(styles['number-list'], 'list')}>
              {doneOrdersNumbers &&
                doneOrdersNumbers.map((num, index) => (
                  <li
                    key={index}
                    className={clsx(
                      styles.number,
                      styles['number_type_success'],
                      'text',
                      'text_type_digits-default',
                      'mb-2'
                    )}
                  >
                    {formatOrderNumber(num)}
                  </li>
                ))}
            </ul>
          </section>

          <section className={styles['in-work']}>
            <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>
              В работе:
            </h2>
            <ul className="list">
              {inWorkOrdersNumbers &&
                inWorkOrdersNumbers.map((num, index) => (
                  <li
                    key={index}
                    className={clsx(
                      styles.number,
                      'text',
                      'text_type_digits-default',
                      'mb-2'
                    )}
                  >
                    {formatOrderNumber(num)}
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

export default BurgerFeed;

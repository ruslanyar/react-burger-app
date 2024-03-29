import React, { FC, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { useAppDispatch } from '../../services/hooks';
import { logOutUser } from '../../services/thunks/user';

import styles from './navbar.module.css';

const Navbar: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onClickHandler = useCallback(() => {
    dispatch(logOutUser());
  }, [dispatch]);
  
  return (
    <aside className={clsx(styles.aside, 'mr-15')}>
      <nav className='mb-20'>
        <ul className={styles.list}>
          <li className={styles['list__item']}>
            <NavLink to="/profile" end className={styles.link}>
              {({ isActive }) => (
                <span
                  className={clsx(
                    'text',
                    'text_type_main-medium',
                    !isActive && 'text_color_inactive'
                  )}
                >
                  Профиль
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles['list__item']}>
            <NavLink to="/profile/orders" className={styles.link}>
              {({ isActive }) => (
                <span
                  className={clsx(
                    'text',
                    'text_type_main-medium',
                    !isActive && 'text_color_inactive'
                  )}
                >
                  История заказов
                </span>
              )}
            </NavLink>
          </li>
          <li
            className={clsx(
              styles['list__item'],
              'text',
              'text_type_main-medium',
              'text_color_inactive'
            )}
          >
            <button className={styles['exit-btn']} onClick={onClickHandler}>Выход</button>
          </li>
        </ul>
      </nav>
      {location.pathname === '/profile' && (
        <span
          className={clsx(
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      )}
      {location.pathname === '/profile/orders' && (
        <span
          className={clsx(
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          В этом разделе вы можете просмотреть свою историю заказов
        </span>
      )}
    </aside>
  );
}

export default Navbar;

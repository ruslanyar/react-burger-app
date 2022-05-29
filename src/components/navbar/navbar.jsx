import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './navbar.module.css';
import { fetchAuth } from '../../utils/api';
import { LOGOUT_ENDPOINT } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { USER_SIGN_OUT } from '../../services/actions/userActions';

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    fetchAuth(LOGOUT_ENDPOINT, { token: refreshToken })
      .then(() => dispatch({ type: USER_SIGN_OUT }))
  }
  
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

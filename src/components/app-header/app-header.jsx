import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          <li
            className={`${styles['list-item']} mt-4 mb-4 mr-2 pt-4 pb-4 pl-5 pr-5`}
          >
            <NavLink to="/" className={styles.link}>
              {({ isActive }) => (
                <>
                  <BurgerIcon />
                  <span
                    className={clsx(
                      'text',
                      'text_type_main-default',
                      'ml-2',
                      !isActive && 'text_color_inactive'
                    )}
                  >
                    Конструктор
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li
            className={`${styles['list-item']} mt-4 mb-4 pt-4 pb-4 pl-5 pr-5`}
          >
            <NavLink to="/login" className={styles.link}>
              {({ isActive }) => (
                <>
                  <ListIcon />
                  <span
                    className={clsx(
                      'text',
                      'text_type_main-default',
                      'ml-2',
                      !isActive && 'text_color_inactive'
                    )}
                  >
                    Лента заказов
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className={styles['list-item']}>
            <a href="/" className={styles.link}>
              <Logo />
            </a>
          </li>
          <li
            className={`${styles['list-item']} mt-4 mb-4 pt-4 pb-4 pl-5 pr-5`}
          >
            <NavLink to="/register" className={styles.link}>
              {({ isActive }) => (
                <>
                  <ProfileIcon />
                  <span
                    className={clsx(
                      'text',
                      'text_type_main-default',
                      'ml-2',
                      !isActive && 'text_color_inactive'
                    )}
                  >
                    Личный кабинет
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

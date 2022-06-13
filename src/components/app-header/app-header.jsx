import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const linkTextStyle = 'text text_type_main-default ml-2';
const listItemStyle = clsx(styles['list-item'], 'mt-4', 'mb-4', 'pt-4', 'pb-4', 'pl-5', 'pr-5');

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          <li
            className={listItemStyle}
          >
            <NavLink to="/" className={styles.link}>
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <span
                    className={clsx(
                      linkTextStyle,
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
            className={listItemStyle}
          >
            <NavLink to="/feed" end className={styles.link}>
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? 'primary' : 'secondary'} />
                  <span
                    className={clsx(
                      linkTextStyle,
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
            <Link to="/" className={styles.link}>
              <Logo />
            </Link>
          </li>
          <li
            className={listItemStyle}
          >
            <NavLink to="/profile" className={styles.link}>
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  <span
                    className={clsx(
                      linkTextStyle,
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

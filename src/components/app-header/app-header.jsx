import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          <li className={`${styles['list-item']} mt-4 mb-4 mr-2 pt-4 pb-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <BurgerIcon />
              <span className='text text_type_main-default ml-2'>Конструктор</span>
            </a>
          </li>
          <li className={`${styles['list-item']} mt-4 mb-4 pt-4 pb-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <ListIcon />
              <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
            </a>
          </li>
          <li className={styles['list-item']}>
            <a href="#" className={styles.link}>
              <Logo />
            </a>
          </li>
          <li className={`${styles['list-item']} mt-4 mb-4 pt-4 pb-4 pl-5 pr-5`}>
            <a href="#" className={styles.link}>
              <ProfileIcon />
              <span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;

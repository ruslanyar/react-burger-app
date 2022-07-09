import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import Navbar from '../../components/navbar/navbar';

import styles from './profile.module.css';

export const Profile: FC = () => {
  return (
    <div className={clsx(styles.container, 'mt-30', 'ml-5')}>
      <Navbar />
      <Outlet />
    </div>
  )
}

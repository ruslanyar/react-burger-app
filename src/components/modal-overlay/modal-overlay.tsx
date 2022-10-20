import React, { FC } from 'react';

import { IModalOverlayProps } from './modal-overlay.types';

import styles from './modal-overlay.module.css';

const ModalOverlay: FC<IModalOverlayProps> = ({ children, close }) => {
  const closeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={closeHandler}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;

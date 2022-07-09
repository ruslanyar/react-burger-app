import React, { FC, useCallback } from 'react';

import { IModalOverlayProps } from './modal-overlay.types';

import styles from './modal-overlay.module.css';

const ModalOverlay: FC<IModalOverlayProps> = ({ children, close }) => {
  const closeHandler = useCallback((e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  }, [close]);

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

import React, { FC, useCallback } from 'react';

import styles from './modal-overlay.module.css';

interface IModalOverlay {
  close: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ children, close }) => {
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

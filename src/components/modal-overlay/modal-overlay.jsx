import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

export default function ModalOverlay({ children, close }) {
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

ModalOverlay.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func.isRequired,
}

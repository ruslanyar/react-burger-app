import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children, close }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) close();
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleClose}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
}

export default ModalOverlay;

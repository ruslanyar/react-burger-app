import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children, close }) => {
  return (
    <div
      className={styles.overlay}
      onClick={close}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func.isRequired,
}

export default ModalOverlay;

import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { ESC_KEY } from '../../utils/constants';

import styles from './modal.module.css';

const Modal = ({ children, title='', close }) => {
  const handleEscClose = useCallback((evt) => {
    if (evt.key === ESC_KEY) {
      close();
    }
  }, [close]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [handleEscClose]);

  return createPortal(
    (
      <ModalOverlay close={close}>
        <div className={`${styles.container} pt-10 pb-15 pl-10 pr-10`}>
          <div className={styles.title}>
            <h2 className='text text_type_main-large'>{title}</h2>
            <div onClick={close} className={styles.close}>
              <CloseIcon />
            </div>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    document.querySelector('#modal')
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  close: PropTypes.func.isRequired,
}

export default Modal;

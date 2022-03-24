import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { ESC_KEY } from '../../utils/constants';

import modalStyles from './modal.module.css';

const Modal = ({ children, title, closeModal }) => {
  const handleEscClose = (evt) => {
    if (evt.key === ESC_KEY) closeModal();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  return createPortal(
    (
      <ModalOverlay close={closeModal}>
        <div className={`${modalStyles.container} pt-10 pb-15 pl-10 pr-10`}>
          <div className={modalStyles.title}>
            <h2 className='text text_type_main-large'>{title}</h2>
            <div onClick={closeModal}>
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
  children: PropTypes.element,
  title: PropTypes.string,
  closeModal: PropTypes.func,
}

export default Modal;

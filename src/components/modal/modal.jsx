import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { ESC_KEY, INGREDIENT_MODAL_ID, ORDER_MODAL_ID } from '../../utils/constants';
import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetailsActions';
import { CLOSE_ORDER_DETAILS } from '../../services/actions/orderActions';

import styles from './modal.module.css';

const Modal = ({ children, title='', modalId }) => {
  const dispatch = useDispatch();

  const onClickHandler = useCallback(() => {
    if (modalId === INGREDIENT_MODAL_ID) dispatch({ type: CLOSE_INGREDIENT_DETAILS });
    if (modalId === ORDER_MODAL_ID) dispatch({ type: CLOSE_ORDER_DETAILS });
  }, [dispatch, modalId]);

  const handleEscClose = useCallback((evt) => {
    if (evt.key === ESC_KEY) {
      onClickHandler();
    }
  }, [onClickHandler]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [handleEscClose]);

  return createPortal(
    (
      <ModalOverlay modalId={modalId}>
        <div className={`${styles.container} pt-10 pb-15 pl-10 pr-10`}>
          <div className={styles.title}>
            <h2 className='text text_type_main-large'>{title}</h2>
            <div onClick={onClickHandler}>
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
  modalId: PropTypes.string.isRequired,
}

export default Modal;

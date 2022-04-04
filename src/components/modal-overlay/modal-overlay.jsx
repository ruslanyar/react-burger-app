import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetailsActions';
import { INGREDIENT_MODAL_ID, ORDER_MODAL_ID } from '../../utils/constants';
import { CLOSE_ORDER_DETAILS } from '../../services/actions/orderActions';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children, modalId }) => {
  const dispatch = useDispatch();

  const onClickHandler = useCallback((evt) => {
    if (evt.target === evt.currentTarget) {
      if (modalId === INGREDIENT_MODAL_ID) dispatch({ type: CLOSE_INGREDIENT_DETAILS });
      if (modalId === ORDER_MODAL_ID) dispatch({ type: CLOSE_ORDER_DETAILS });
    }
  }, [dispatch, modalId]);

  return (
    <div
      className={styles.overlay}
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
  modalId: PropTypes.string.isRequired,
}

export default ModalOverlay;

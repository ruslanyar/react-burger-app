import React from 'react';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import orderStyles from './order-details.module.css';

const OrderDetails = ({ orderDetails }) => {
  const { number } = orderDetails.order;

  return (
    <div className={orderStyles.order}>
      <span className='text text_type_digits-large mt-4 mb-8'>{number}</span>
      <p className='text text_type_main-medium mb-15'>
        идентификатор заказа
      </p>
      <div className={`${orderStyles.done} mb-15`}>
        <div className={orderStyles['check-icon']}>
          <CheckMarkIcon />
        </div>
      </div>
      <p className='text text_type_main-default mb-2'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive mb-15'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetails: PropTypes.object,
}

export default OrderDetails;

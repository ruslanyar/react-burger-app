import React from 'react';
import { useSelector } from 'react-redux';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Loader from '../../ui/loader/Loader';

import { orderDetailsSelector } from '../../services/selectors';

import styles from './order-details.module.css'

export default function OrderDetails(): JSX.Element {
  const { order, request, failed, isEmpty } = useSelector(orderDetailsSelector);
  const number = order.order?.number;

  return (
    <div className={styles.order}>
      {isEmpty && (
        <p className='text text_type_main-default'>
          Для заказа необходимо выбрать ингредиенты
        </p>
      )}
      
      {failed && (
        <p className='text text_type_main-default'>
          Произошла ошибка связи с сервером
        </p>
      )}

      {request && <Loader />}

      {!request && !failed && !isEmpty && (
        <>
          <span className='text text_type_digits-large mt-4 mb-8'>{number}</span>
          <p className='text text_type_main-medium mb-15'>
            идентификатор заказа
          </p>
          <div className={`${styles.done} mb-15`}>
            <div className={styles['check-icon']}>
              <CheckMarkIcon type='primary' />
            </div>
          </div>
          <p className='text text_type_main-default mb-2'>
            Ваш заказ начали готовить
          </p>
          <p className='text text_type_main-default text_color_inactive mb-15'>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
import { FC } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../services/hooks';

import Loader from '../../ui/loader/Loader';

import { selectOrder } from '../../services/slices/orderSlice';

import styles from './order-details.module.css'

const OrderDetails: FC = () => {
  const { order, request, failed, isEmpty } = useAppSelector(selectOrder);
  let number;
  if (order) {
    number = order.number;
  }

  return (
    <div className={styles.order}>
      {isEmpty && !request && (
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

export default OrderDetails;

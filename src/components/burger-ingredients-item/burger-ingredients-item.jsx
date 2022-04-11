import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { openIngredientDetails } from '../../services/actions/ingredientDetailsActions';

import styles from './burger-ingredients-item.module.css';

function BurgerIngredientsItem({ data }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {...data},
  }, [data]);

  const onClickHandler = useCallback((item) => {
    dispatch(openIngredientDetails(item));
  }, [dispatch]);

  return (
    <li
      key={data._id}
      onClick={() => onClickHandler(data)}
      className={`${styles['list__item']} mb-8`}
      ref={dragRef}
    >
      <Counter count={data.count} size="default" />
      <img src={data.image} alt={data.name} className='ml-4 mr-4 mb-1'  />
      <div className={`${styles.currency} mb-1`}>
        <span className='text text_type_digits-default mr-2'>{data.price}</span>
        <CurrencyIcon />
      </div>
      <p className='text text_type_main-default'>{data.name}</p>
    </li>
  );
}

export default BurgerIngredientsItem;

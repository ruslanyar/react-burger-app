import React from 'react';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

function BurgerConstructorItem({ data }) {
  
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {...data},
  });

  return (
    <li
      key={data._id}
      onClick={() => console.log('')}
      className={`${styles['list__item']} mb-8`}
      ref={dragRef}
    >
      <Counter count={1} size="default" />
      <img src={data.image} alt={data.name} className='ml-4 mr-4 mb-1'  />
      <div className={`${styles.currency} mb-1`}>
        <span className='text text_type_digits-default mr-2'>{data.price}</span>
        <CurrencyIcon />
      </div>
      <p className='text text_type_main-default'>{data.name}</p>
    </li>
  );
}

export default BurgerConstructorItem;

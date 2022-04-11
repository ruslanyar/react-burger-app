import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { DECREASE_INGREDIENT_COUNT } from '../../services/actions/ingredientsActions';
import { DELETE_INGREDIENT, sortIngredients } from '../../services/actions/constructorActions';

import styles from './burger-constructor-item.module.css';

function BurgerConstructorItem ({ item, index }) {
  const dispatch = useDispatch();
  const constructorElementRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'constructor',
    drop(item) {
      const dragIndex = item.index;
      const dropIndex = index;
      if (dragIndex === dropIndex) return;
      dispatch(sortIngredients(dragIndex, dropIndex));
    }
  });

  const [, drag] = useDrag({
    type: 'constructor',
    item: { id: item.keyId, index }
  });

  drop(drag(constructorElementRef));

  const handleClose = (item) => {
    dispatch({ type: DECREASE_INGREDIENT_COUNT, payload: item });
    dispatch({ type: DELETE_INGREDIENT, payload: item });
  }

  return ( 
    <li className={`${styles['list__item']} mb-4`} ref={constructorElementRef}>
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item)}
      />
    </li>
   );
}


export default BurgerConstructorItem;

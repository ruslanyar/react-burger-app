import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { decreaseIngredientCount } from '../../services/actions/ingredientsActions';
import { deleteIngredient, sortIngredients } from '../../services/actions/constructorActions';

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

  const handleClose = (keyId, id) => {
    dispatch(decreaseIngredientCount(id));
    dispatch(deleteIngredient(keyId));
  }

  return ( 
    <li className={`${styles['list__item']} mb-4`} ref={constructorElementRef}>
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item.keyId, item._id)}
      />
    </li>
   );
}


export default BurgerConstructorItem;

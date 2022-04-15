import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { decreaseIngredientCount } from '../../services/actions/ingredientsActions';
import { deleteIngredient, sortIngredients } from '../../services/actions/constructorActions';
import { ingredientPropType } from '../../utils/propTypes';

import styles from './burger-constructor-item.module.css';

function BurgerConstructorItem ({ ingredient, index }) {
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
    item: { id: ingredient.keyId, index }
  });

  drop(drag(constructorElementRef));

  const handleClose = useCallback((keyId, id) => {
    dispatch(decreaseIngredientCount(id));
    dispatch(deleteIngredient(keyId));
  }, [dispatch]);

  return ( 
    <li className={`${styles['list__item']} mb-4`} ref={constructorElementRef}>
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose(ingredient.keyId, ingredient._id)}
      />
    </li>
   );
}

BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
}

export default BurgerConstructorItem;

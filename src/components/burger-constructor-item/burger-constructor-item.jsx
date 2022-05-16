import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { deleteIngredient, sortIngredients } from '../../services/actions/constructorActions';
import { ingredientPropType } from '../../utils/propTypes';

import styles from './burger-constructor-item.module.css';

export default function BurgerConstructorItem ({ ingredient, index }) {
  const dispatch = useDispatch();
  const constructorElementRef = useRef(null);

  const [, dropRef] = useDrop({
    accept: 'constructor',
    hover(item, monitor) {
      if (!constructorElementRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = constructorElementRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortIngredients(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, dragRef] = useDrag({
    type: 'constructor',
    item: { id: ingredient.keyId, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
    })
  }, [ingredient, index]);

  dropRef(dragRef(constructorElementRef));

  const handleClose = useCallback((keyId) => {
    dispatch(deleteIngredient(keyId));
  }, [dispatch]);

  return (
    <li style={{opacity}} className={`${styles['list__item']} mb-4`} ref={constructorElementRef}>
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose(ingredient.keyId)}
      />
    </li>
   );
}

BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
}

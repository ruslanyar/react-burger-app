import React, { FC, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../services/hooks/hooks';

import {
  deleteIngredientThunk,
  sortIngredientsThunk,
} from '../../services/thunks';
import { IBurgerConstructorItem } from './burger-constructor-item.types';

import styles from './burger-constructor-item.module.css';

const BurgerConstructorItem: FC<IBurgerConstructorItem> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();
  const constructorElementRef = useRef<HTMLDivElement>(null);

  const [, dropRef] = useDrop<{id: number; index: number}, void, any>({
    accept: 'constructor',
    hover(item, monitor) {
      if (!constructorElementRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect =
        constructorElementRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortIngredientsThunk(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, dragRef] = useDrag(
    {
      type: 'constructor',
      item: { id: ingredient.keyId, index },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    },
    [ingredient, index]
  );

  dropRef(dragRef(constructorElementRef));

  const handleClose = useCallback(
    (keyId) => {
      dispatch(deleteIngredientThunk(keyId));
    },
    [dispatch]
  );

  return (
    <div
      style={{ opacity }}
      className={clsx(styles['constructor__item'], 'mb-4')}
      ref={constructorElementRef}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose(ingredient.keyId)}
      />
    </div>
  );
}

export default BurgerConstructorItem;

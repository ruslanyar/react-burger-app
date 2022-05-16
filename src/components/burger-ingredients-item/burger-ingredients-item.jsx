import React, { useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { openIngredientDetails } from '../../services/actions/ingredientDetailsActions';
import { ingredientPropType } from '../../utils/propTypes';

import styles from './burger-ingredients-item.module.css';

export default function BurgerIngredientsItem({ ingredient }) {
  const { bun, topings } = useSelector(store => store.burger.ingredients);
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }, [ingredient]);

  const onClickHandler = useCallback((item) => {
    dispatch(openIngredientDetails(item));
  }, [dispatch]);

  const count = useMemo(
    () => {
      const counters = {};
      [...bun, ...topings].forEach(item => {
        if (!counters[item._id]) {
          counters[item._id] = 1;
        } else {
        counters[item._id]++;
        }
      });
      return counters[ingredient._id];
    },
    [bun, topings, ingredient]
  );

  const onDragStyle = isDragging ? styles['list__item_isDragging'] : '';

  return (
    <li
      key={ingredient._id}
      onClick={() => onClickHandler(ingredient)}
      className={`${styles['list__item']} ${onDragStyle} mb-8`}
      ref={dragRef}
    >
      <Counter count={count} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4 mb-1'  />
      <div className={`${styles.currency} mb-1`}>
        <span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
        <CurrencyIcon />
      </div>
      <p className='text text_type_main-default'>{ingredient.name}</p>
    </li>
  );
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
}

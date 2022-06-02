import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientPropType } from '../../utils/propTypes';

import styles from './burger-ingredients-item.module.css';

export default function BurgerIngredientsItem({ ingredient }) {
  const location = useLocation();

  const { bun, topings } = useSelector((store) => store.burger.ingredients);

  const [{ isDragging }, dragRef] = useDrag(
    {
      type: 'ingredient',
      item: { id: ingredient._id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [ingredient]
  );

  const count = useMemo(() => {
    const counters = {};
    [...bun, ...topings].forEach((item) => {
      if (!counters[item._id]) {
        counters[item._id] = 1;
      } else {
        counters[item._id]++;
      }
    });
    return counters[ingredient._id];
  }, [bun, topings, ingredient]);

  return (
    <li
      key={ingredient._id}
      className={clsx(
        styles['list__item'],
        isDragging && styles['list__item_isDragging']
      )}
      ref={dragRef}
    >
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={styles.link}
      >
        <Counter count={count} size="default" />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="ml-4 mr-4 mb-1"
        />
        <div className={`${styles.currency} mb-1`}>
          <span className="text text_type_digits-default mr-2">
            {ingredient.price}
          </span>
          <CurrencyIcon />
        </div>
        <p className={clsx(styles.name, 'text', 'text_type_main-default')}>
          {ingredient.name}
        </p>
      </Link>
    </li>
  );
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

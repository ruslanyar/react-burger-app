import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { addIngredient, DELETE_INGREDIENT } from '../../services/actions/constructorActions';
import { DECREASE_INGREDIENT_COUNT, INCREASE_INGREDIENT_COUNT } from '../../services/actions/ingredientsActions';
import { sendOrder } from '../../services/actions/orderActions';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const { ingredients } = useSelector(store => store.burger);
  const { bun, other } = ingredients;
  const dispatch = useDispatch();

  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item));
      dispatch({ type: INCREASE_INGREDIENT_COUNT, payload: item });
    },
  });

  const totalPrice = useMemo(() => {
    const bunPrice = bun?.length ? bun[0].price * 2 : 0;
    const otherPrice = other
      .reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
    const result = bunPrice + otherPrice;
    return result;
  }, [bun, other]);

  const ids = useMemo(() => {
    return [
      ...bun.map(item => item._id),
      ...other.map(item => item._id),
    ]
  }, [bun, other]);

  const onClickHandler = useCallback(() => {
    dispatch(sendOrder(ids));
  }, [dispatch, ids]);

  const handleClose = (item) => {
    dispatch({ type: DECREASE_INGREDIENT_COUNT, payload: item });
    dispatch({ type: DELETE_INGREDIENT, ingredient: item });
  }

  return (
    <section className={`${styles.constructor} mb-10 pt-25`} ref={dropTargetRef}>
      {bun.length !== 0 && (
        <div className='ml-6'>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun[0].name} (верх)`}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>
      )}
      <ul className={`${styles.list} mt-4 mb-4 custom-scroll`}>
        {other && other.map(item => (
          <li key={item.keyId} className={`${styles['list__item']} mb-4`}>
            <DragIcon />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => handleClose(item)}
            />
          </li>
        ))}
      </ul>
      {bun.length !== 0 && (
        <div className='ml-6 mb-10'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun[0].name} (низ)`}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>
      )}
      <div className={`${styles.currency} mr-4`}>
        <div className={`${styles.total} mr-10`}>
          <span className='text text_type_digits-medium mr-4'>{totalPrice}</span>
          <div className={styles.icon}>
            <CurrencyIcon />
          </div>
        </div>
        <div onClick={onClickHandler}>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </div>
    </section>
  );
}

export default BurgerConstructor;

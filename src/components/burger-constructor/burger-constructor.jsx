import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

import { addIngredient } from '../../services/actions/constructorActions';
import { sendOrder } from '../../services/actions/orderActions';

import styles from './burger-constructor.module.css';

export default function BurgerConstructor() {
  const { bun, topings } = useSelector(store => store.burger.ingredients);
  const dispatch = useDispatch();

  const [{ isHover, canDrop }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop({ id }) {
      dispatch(addIngredient(id));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const totalPrice = useMemo(() => {
    const bunPrice = bun?.length ? bun[0].price * 2 : 0;
    const otherPrice = topings
      .reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
    const result = bunPrice + otherPrice;
    return result;
  }, [bun, topings]);

  const onClickHandler = useCallback(() => {
    const ids = [
        ...bun.map(item => item._id),
        ...topings.map(item => item._id),
      ];
      
    dispatch(sendOrder(ids));
  }, [bun, topings, dispatch]);

  const isActive = canDrop && isHover;
  const dropStyle = isActive ? styles.isActive : canDrop ? styles.canDrop : '';

  return (
    <section className={`${styles.constructor} mb-10 mt-25`} ref={dropTargetRef}>
      <div style={{width: '100%', height: '100%'}} className={dropStyle}>
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
        {topings && topings.map((item, index) => (
          <BurgerConstructorItem key={item.keyId} ingredient={item} index={index} />
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
      </div>
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

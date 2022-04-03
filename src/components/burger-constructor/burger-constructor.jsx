import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ADD_INGREDIENT } from '../../services/actions/constructorActions';
import { sendOrder } from '../../services/actions/orderActions';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ openModal }) => {
  const { ingredients } = useSelector(store => store.burger);
  const { bun, main, sauce } = ingredients;
  const dispatch = useDispatch();

  const ingredientsWithOutBuns = useMemo(() => {
    return [...main, ...sauce];
  }, [main, sauce]);

  const onDropHandler = (item) => {
    dispatch({type: ADD_INGREDIENT, ingredient: item})
  }

  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    },

  });

  const totalPrice = useMemo(() => {
    const bunPrice = bun.length ? bun[0].price * 2 : 0;
    const ingredientsWithOutBunsPrice = ingredientsWithOutBuns
      .reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
    const result = bunPrice + ingredientsWithOutBunsPrice;
    return result;
  }, [bun, ingredientsWithOutBuns]);

  const ids = useMemo(() => {
    return [
      ...bun.map(item => item._id),
      ...ingredientsWithOutBuns.map(item => item._id),
    ]
  }, [bun, ingredientsWithOutBuns]);

  function handleClick() {
    dispatch(sendOrder(ids))
    openModal();
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
        {ingredientsWithOutBuns && ingredientsWithOutBuns.map(item => (
          <li key={item._id} className={`${styles['list__item']} mb-4`}>
            <DragIcon />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
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
        <div onClick={handleClick}>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;

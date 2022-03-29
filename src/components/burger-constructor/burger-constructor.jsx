import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useIngredients } from '../../services/contexts/ingredients-context';
import { orderFetch, checkResponse } from '../../utils/utils';
import { constructorReducer, initialState } from '../../services/reducers/burger-constructor';
import { SET_BUN, SET_IDS, SET_TOPINGS, SET_TOTAL_SUM } from '../../services/actions/burger-constructor';

import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ openModal, setOrderDetails }) => {
  const ingredients = useIngredients();

  const [state, dispatch] = useReducer(constructorReducer, initialState);

  useEffect(() => {
    const bun = ingredients.find(item => item.type === 'bun');
    const topings = ingredients.filter(item => item.type !== 'bun');
    const bunPrice = bun.price * 2;
    const totalPrice = topings.reduce((acc, cur) => {
      return acc + cur.price;
    }, bunPrice);
    const ids = [bun._id, ...topings.map(item => item._id)];

    dispatch({ type: SET_BUN, payload: bun });
    dispatch({ type: SET_TOPINGS, payload: topings });
    dispatch({ type: SET_TOTAL_SUM, payload: totalPrice })
    dispatch({ type: SET_IDS, payload: ids })
  }, [ingredients]);

  function handleClick() {
    orderFetch(state.ids)
      .then(checkResponse)
      .then(setOrderDetails)
      .then(openModal)
      .catch(error => console.log(error));
  }

  if (!state.bun && !state.topings) return null;

  return (
    <section className={`${constructorStyles.constructor} mb-10 pt-25`}>
      <div className='ml-6'>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${state.bun.name} (верх)`}
          price={state.bun.price}
          thumbnail={state.bun.image}
        />
      </div>
      <ul className={`${constructorStyles.list} mt-4 mb-4 custom-scroll`}>
        {state.topings.map(item => (
          <li key={item._id} className={`${constructorStyles['list__item']} mb-4`}>
            <DragIcon />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      <div className='ml-6 mb-10'>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${state.bun.name} (низ)`}
          price={state.bun.price}
          thumbnail={state.bun.image}
        />
      </div>
      <div className={`${constructorStyles.currency} mr-4`}>
        <div className={`${constructorStyles.total} mr-10`}>
          <span className='text text_type_digits-medium mr-4'>{state.total}</span>
          <div className={constructorStyles.icon}>
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
  setOrderDetails: PropTypes.func,
}

export default BurgerConstructor;

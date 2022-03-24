import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useIngredients } from '../../utils/ingredients-context';
import { orderFetch, checkResponse } from '../../utils/utils';

import constructorStyles from './burger-constructor.module.css';

const initialState = {
  total: 0,
}

function reducer(state, action) {
  switch (action.type) {

    case 'settotal':
      return {
        ...state,
        total: action.payload
      }

    default:
      throw new Error(`Неверный тип action: ${action.type}`);
  }
}

const BurgerConstructor = ({ openModal, setOrderDetails }) => {
  const ingredients = useIngredients();

  const [state, dispatch] = useReducer(reducer, initialState);

  const [bunIngredient, setBunIngredient] = useState(null);
  const [topingIngredients, setTopingIngredients] = useState(null);
  const [ingredientsIds, setingredientsIds] = useState(null);

  useEffect(() => {
    const bun = ingredients.find(item => item.type === 'bun');
    const topings = ingredients.filter(item => item.type !== 'bun');
    const bunPrice = bun.price * 2;
    const topingsPrice = topings.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
    const total = bunPrice + topingsPrice;
    const ids = [bun._id, ...topings.map(item => item._id)];

    setBunIngredient(bun);
    setTopingIngredients(topings);
    dispatch({ type: 'settotal', payload: total })
    setingredientsIds(ids)
  }, [ingredients]);

  function handleClick() {
    orderFetch(ingredientsIds)
      .then(checkResponse)
      .then(setOrderDetails)
      .then(() => openModal())
      .catch(error => console.log(error));
  }

  if (!bunIngredient && !topingIngredients) return null;

  return (
    <section className={`${constructorStyles.constructor} mb-10 pt-25`}>
      <div className='ml-6'>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${bunIngredient.name} (верх)`}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image}
        />
      </div>
      <ul className={`${constructorStyles.list} mt-4 mb-4 custom-scroll`}>
        {topingIngredients.map(item => (
          <li key={item._id} className={`${constructorStyles['list-item']} mb-4`}>
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
          text={`${bunIngredient.name} (низ)`}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image}
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

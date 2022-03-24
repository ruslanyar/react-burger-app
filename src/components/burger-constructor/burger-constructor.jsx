import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useIngredients } from '../../utils/ingredients-context';

import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ openModal }) => {
  const ingredients = useIngredients();

  const [totalPrice, setTotalPrice] = useState(null);
  const [bunIngredient, setBunIngredient] = useState(null);
  const [topingIngredients, setTopingIngredients] = useState(null);

  useEffect(() => {
    const bun = ingredients.find(item => item.type === 'bun');
    const topings = ingredients.filter(item => item.type !== 'bun');
    const bunPrice = bun.price * 2;
    const topingsPrice = topings.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
    const total = bunPrice + topingsPrice;

    setBunIngredient(bun);
    setTopingIngredients(topings);
    setTotalPrice(total);
  }, [ingredients]);

  if (!bunIngredient && !topingIngredients && !totalPrice) return null;

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
          <span className='text text_type_digits-medium mr-4'>{totalPrice}</span>
          <div className={constructorStyles.icon}>
            <CurrencyIcon />
          </div>
        </div>
        <div onClick={openModal}>
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

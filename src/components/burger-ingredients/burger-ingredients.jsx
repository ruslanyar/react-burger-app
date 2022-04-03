import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItem from '../burger-ingredients-item/burger-ingredients-item';
import Loader from '../../ui/loader/Loader';

import { getIngredients } from '../../services/actions/ingredientsActions';
import { BUN, MAIN, SAUCE } from '../../utils/constants';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ openModal }) => {
  const { ingredients, request, failed } = useSelector(store => store.ingredients);
  const [current, setCurrent] = useState(BUN);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const buns = useMemo(() => ingredients.filter(item => item.type === BUN), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(item => item.type === SAUCE), [ingredients]);
  const main = useMemo(() => ingredients.filter(item => item.type === MAIN), [ingredients]);

  if (request) return <Loader style={{margin: 'auto'}} />;
  if (failed) return (
    <p className='text text_type_main-medium'>
      Произошла ошибка при загрузке данных с сервера
    </p>
  );

  return (
    <section className='mb-10 pt-10'>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value={BUN} active={current === BUN} onClick={setCurrent}>Булки</Tab>
        <Tab value={SAUCE} active={current === SAUCE} onClick={setCurrent}>Соусы</Tab>
        <Tab value={MAIN} active={current === MAIN} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={`${styles.ingredients} custom-scroll`}>
        <section className='mb-10'>
          <h2 className='text text_type_main-medium mb-6' id={BUN}>Булки</h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {buns.map(ingr => (
              <BurgerConstructorItem key={ingr._id} data={ingr} />
            ))}
          </ul>
        </section>
        <section className='mb-10'>
          <h2 className='text text_type_main-medium mb-6' id={SAUCE}>Соусы</h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {sauces.map(ingr => (
              <BurgerConstructorItem key={ingr._id} data={ingr} />
            ))}
          </ul>
        </section>
        <section className='mb-10'>
          <h2 className='text text_type_main-medium mb-6' id={MAIN}>Начинки</h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {main.map(ingr => (
              <BurgerConstructorItem key={ingr._id} data={ingr} />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import Loader from '../../ui/loader/Loader';

import { throttle } from '../../utils/utils';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { BUN, MAIN, SAUCE } from '../../utils/constants';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const { ingredients, request, failed } = useSelector(store => store.ingredients);
  const [current, setCurrent] = useState(BUN);
  const dispatch = useDispatch();

  const scrollContainerRef = useRef(null);
  const bunTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);
  const mainTitleRef = useRef(null);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const onScrollHandler = () => {
    const currentScroll = scrollContainerRef.current.scrollTop;
    const bunTitlePos = Math.abs(bunTitleRef.current.offsetTop - currentScroll);
    const sauceTitlePos = Math.abs(sauceTitleRef.current.offsetTop - currentScroll);
    const mainTitlePos = Math.abs(mainTitleRef.current.offsetTop - currentScroll);

    if (bunTitlePos < sauceTitlePos) setCurrent(BUN);
    if (sauceTitlePos < bunTitlePos && sauceTitlePos < mainTitlePos) setCurrent(SAUCE);
    if (mainTitlePos < sauceTitlePos) setCurrent(MAIN);
  }

  const throttledOnScrollHandler = throttle(onScrollHandler, 50);

  const buns = useMemo(() => ingredients.filter(item => item.type === BUN), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(item => item.type === SAUCE), [ingredients]);
  const main = useMemo(() => ingredients.filter(item => item.type === MAIN), [ingredients]);

  if (request) return <Loader style={{margin: 'auto'}} />;
  if (failed) return (
    <p className='text text_type_main-default'>
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
      <div ref={scrollContainerRef} onScroll={throttledOnScrollHandler} className={`${styles.ingredients} custom-scroll`}>
        <section className='mb-10'>
          <h2 ref={bunTitleRef} className='text text_type_main-medium mb-6' id={BUN}>Булки</h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {buns.map(item => (
              <BurgerIngredientsItem key={item._id} data={item} />
            ))}
          </ul>
        </section>
        <section className='mb-10'>
          <h2 ref={sauceTitleRef} className='text text_type_main-medium mb-6' id={SAUCE}>Соусы</h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {sauces.map(item => (
              <BurgerIngredientsItem key={item._id} data={item} />
            ))}
          </ul>
        </section>
        <section className='mb-10'>
          <h2 ref={mainTitleRef} className='text text_type_main-medium mb-6' id={MAIN}>Начинки</h2>
          <ul className={`${styles.list} pl-4 pr-4`}>
            {main.map(item => (
              <BurgerIngredientsItem key={item._id} data={item} />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default BurgerIngredients;

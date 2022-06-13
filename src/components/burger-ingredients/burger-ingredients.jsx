import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import { throttle } from '../../utils/utils';
import { BUN, MAIN, SAUCE } from '../../utils/constants';
import { ingredientsSelector } from '../../services/selectors';

import styles from './burger-ingredients.module.css';

const listStyle = clsx(styles.list, 'pl-4', 'pr-4');
const titleStyle = clsx('text', 'text_type_main-medium', 'mb-6');

export default function BurgerIngredients() {
  const { ingredients } = useSelector(ingredientsSelector);

  const [current, setCurrent] = useState(BUN);

  const scrollContainerRef = useRef(null);
  const bunTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);
  const mainTitleRef = useRef(null);

  const onScrollHandler = useCallback(() => {
    const currentScroll = scrollContainerRef.current.scrollTop;
    const bunTitlePos = Math.abs(bunTitleRef.current.offsetTop - currentScroll);
    const sauceTitlePos = Math.abs(
      sauceTitleRef.current.offsetTop - currentScroll
    );
    const mainTitlePos = Math.abs(
      mainTitleRef.current.offsetTop - currentScroll
    );

    if (bunTitlePos < sauceTitlePos) setCurrent(BUN);
    if (sauceTitlePos < bunTitlePos && sauceTitlePos < mainTitlePos)
      setCurrent(SAUCE);
    if (mainTitlePos < sauceTitlePos) setCurrent(MAIN);
  }, [scrollContainerRef, bunTitleRef, sauceTitleRef, mainTitleRef]);

  const throttledOnScrollHandler = throttle(onScrollHandler, 50);

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === BUN),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === SAUCE),
    [ingredients]
  );

  const main = useMemo(
    () => ingredients.filter((item) => item.type === MAIN),
    [ingredients]
  );

  return (
    <section className="mb-10 pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={clsx(styles.tabs, 'mb-10')}>
        <Tab value={BUN} active={current === BUN} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value={SAUCE} active={current === SAUCE} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value={MAIN} active={current === MAIN} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div
        ref={scrollContainerRef}
        onScroll={throttledOnScrollHandler}
        className={clsx(styles.ingredients, 'custom-scroll')}
      >
        <section className="mb-10">
          <h2 ref={bunTitleRef} className={titleStyle} id={BUN}>
            Булки
          </h2>
          <ul className={listStyle}>
            {buns.map((item) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 ref={sauceTitleRef} className={titleStyle} id={SAUCE}>
            Соусы
          </h2>
          <ul className={listStyle}>
            {sauces.map((item) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 ref={mainTitleRef} className={titleStyle} id={MAIN}>
            Начинки
          </h2>
          <ul className={listStyle}>
            {main.map((item) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../services/hooks/hooks';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import { throttle } from '../../utils/utils';
import { BUN, MAIN, SAUCE } from '../../utils/constants';
import { ingredientsSelector } from '../../services/selectors';
import { IIngredient } from '../../services/types/data';

import styles from './burger-ingredients.module.css';

const listStyle = clsx(styles.list, 'pl-4', 'pr-4');
const titleStyle = clsx('text', 'text_type_main-medium', 'mb-6');

const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector(ingredientsSelector);

  const [current, setCurrent] = useState(BUN);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bunTitleRef = useRef<HTMLHeadingElement>(null);
  const sauceTitleRef = useRef<HTMLHeadingElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  const onScrollHandler = useCallback(() => {
    const currentScroll = scrollContainerRef.current?.scrollTop;

    if (typeof currentScroll !== 'undefined') {
      if ( bunTitleRef.current && sauceTitleRef.current && mainTitleRef.current) {
        const bunTitlePos = Math.abs(
          bunTitleRef.current.offsetTop - currentScroll
        );
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
      }
    }
  }, [scrollContainerRef, bunTitleRef, sauceTitleRef, mainTitleRef]);

  const throttledOnScrollHandler = throttle(onScrollHandler, 50);

  const buns = useMemo(
    () => ingredients.filter((item: IIngredient) => item.type === BUN),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item: IIngredient) => item.type === SAUCE),
    [ingredients]
  );

  const main = useMemo(
    () => ingredients.filter((item: IIngredient) => item.type === MAIN),
    [ingredients]
  );

  const scrollIntoView = useCallback((element) => {
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="mb-10 pt-10">
      <h1 className="text text_type_main-large mb-5">???????????????? ????????????</h1>
      <div className={clsx(styles.tabs, 'mb-10')}>
        <Tab
          value={BUN}
          active={current === BUN}
          onClick={() => scrollIntoView(bunTitleRef.current)}
        >
          ??????????
        </Tab>
        <Tab
          value={SAUCE}
          active={current === SAUCE}
          onClick={() => scrollIntoView(sauceTitleRef.current)}
        >
          ??????????
        </Tab>
        <Tab
          value={MAIN}
          active={current === MAIN}
          onClick={() => scrollIntoView(mainTitleRef.current)}
        >
          ??????????????
        </Tab>
      </div>
      <div
        ref={scrollContainerRef}
        onScroll={throttledOnScrollHandler}
        className={clsx(styles.ingredients, 'custom-scroll')}
      >
        <section className="mb-10">
          <h2 ref={bunTitleRef} className={titleStyle} id={BUN}>
            ??????????
          </h2>
          <ul className={listStyle}>
            {buns.map((item: IIngredient) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 ref={sauceTitleRef} className={titleStyle} id={SAUCE}>
            ??????????
          </h2>
          <ul className={listStyle}>
            {sauces.map((item: IIngredient) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 ref={mainTitleRef} className={titleStyle} id={MAIN}>
            ??????????????
          </h2>
          <ul className={listStyle}>
            {main.map((item: IIngredient) => (
              <BurgerIngredientsItem key={item._id} ingredient={item} />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default BurgerIngredients;

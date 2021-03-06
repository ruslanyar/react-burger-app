import React, { FC, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

import { sendOrder } from '../../services/thunks';
import { getCookie } from '../../utils/utils';
import { addIngredientThunk } from '../../services/thunks';
import { constructorIngredients, userSelector } from '../../services/selectors';
import { IIngredient } from '../../services/types/data';
import { ICollect, IDragObj } from './burger-constructor.types';

import styles from './burger-constructor.module.css';

const BurgerConstructor: FC = () => {
  const { bun, topings } = useAppSelector(constructorIngredients);
  const { isAuth } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [{ isHover, canDrop }, dropTargetRef] = useDrop<
    IDragObj,
    void,
    ICollect
  >({
    accept: 'ingredient',
    drop({ id }) {
      dispatch(addIngredientThunk(id));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const totalPrice = useMemo(() => {
    const bunPrice = bun?.length ? bun[0].price * 2 : 0;
    const otherPrice = topings.reduce((acc: number, cur: IIngredient) => {
      return acc + cur.price;
    }, 0);
    const result = bunPrice + otherPrice;
    return result;
  }, [bun, topings]);

  const onClickHandler = useCallback(() => {
    if (isAuth) {
      const accessToken = `Bearer ${getCookie('token')}`;
      const ids = [
        ...bun.map((item: IIngredient) => item._id),
        ...topings.map((item: IIngredient) => item._id),
      ];
      dispatch(sendOrder(ids, accessToken));
    } else {
      navigate('/login');
    }
  }, [bun, topings, dispatch, isAuth, navigate]);

  const isActive = canDrop && isHover;
  const dropStyle = isActive ? styles.isActive : canDrop ? styles.canDrop : '';

  return (
    <section
      className={clsx(styles.constructor, 'mb-10', 'mt-25')}
      ref={dropTargetRef}
    >
      <div className={clsx(styles.container, dropStyle)}>
        {bun.length !== 0 && (
          <div className="ml-10">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun[0].name} (????????)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
        <ul className={clsx(styles.list, 'mt-4', 'mb-4', 'custom-scroll')}>
          {topings &&
            topings.map((item: IIngredient, index: number) => (
              <li key={item.keyId}>
                <BurgerConstructorItem
                  ingredient={item}
                  index={index}
                />
              </li>
            ))}
        </ul>
        {bun.length !== 0 && (
          <div className="ml-10 mb-10">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun[0].name} (??????)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
      </div>
      <div className={clsx(styles.currency, 'mr-4')}>
        <div className={clsx(styles.total, 'mr-10')}>
          <span className="text text_type_digits-medium mr-4">
            {totalPrice}
          </span>
          <div className={styles.icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Link
          to="order-details"
          state={{ background: location }}
          onClick={onClickHandler}
        >
          <Button type="primary" size="large">
            ???????????????? ??????????
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BurgerConstructor;

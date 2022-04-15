import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredients } from '../../services/actions/ingredientsActions';
import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetailsActions';
import { CLOSE_ORDER_DETAILS } from '../../services/actions/orderActions';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructorActions';

import styles from './app.module.css';

const App = () => {
  const isIngredientModalShown = useSelector(store => store.ingredientDetails.isOpen);
  const isOrderModalShown = useSelector(store => store.orderDetails.isOpen);
  const dispatch = useDispatch();

  const closeDetailsHandler = useCallback(() => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  }, [dispatch]);

  const closeOrderHandler = useCallback(() => {
    dispatch({ type: CLOSE_ORDER_DETAILS });
    dispatch({ type: CLEAR_CONSTRUCTOR });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
      </DndProvider>
      {isIngredientModalShown && (
        <Modal title='Детали ингредиента' close={closeDetailsHandler}>
          <IngredientDetails />
        </Modal>
      )}
      {isOrderModalShown && (
        <Modal close={closeOrderHandler}>
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

export default App;

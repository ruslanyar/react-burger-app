import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { INGREDIENT_MODAL_ID, ORDER_MODAL_ID } from '../../utils/constants';

import styles from './app.module.css';

const App = () => {
  const isIngredientModalShown = useSelector(store => store.details.isOpen);
  const isOrderModalShown = useSelector(store => store.order.isOpen);

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
        <Modal title='Детали ингредиента' modalId={INGREDIENT_MODAL_ID}>
          <IngredientDetails />
        </Modal>
      )}
      {isOrderModalShown && (
        <Modal modalId={ORDER_MODAL_ID}>
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

export default App;

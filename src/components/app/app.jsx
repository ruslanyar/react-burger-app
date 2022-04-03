import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './app.module.css';

const App = () => {
  const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);

  const handleOpenModalIngredient = (data) => {
    setIsIngredientModalShown(true);
  }

  const handleOpenModalOrder = () => {
    setIsOrderModalShown(true);
  }

  const handleCloseModalIngredient = () => {
    setIsIngredientModalShown(false);
  }

  const handleCloseModalOrder = () => {
    setIsOrderModalShown(false);
  }

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
            <BurgerIngredients
              openModal={handleOpenModalIngredient}
            />
            <BurgerConstructor
              openModal={handleOpenModalOrder}
            />
        </main>
      </DndProvider>
      {isIngredientModalShown && (
        <Modal
          title='Детали ингредиента'
          closeModal={handleCloseModalIngredient}
        >
          <IngredientDetails />
        </Modal>
      )}
      {isOrderModalShown && (
        <Modal
          closeModal={handleCloseModalOrder}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  )
}

export default App;

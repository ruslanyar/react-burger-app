import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { IngredientsContextProvider } from '../../utils/ingredients-context';

import { api } from '../../utils/constants';

import appStyles from './app.module.css';

const App = () => {
  const [modalIngredientState, setModalIngredientState] = useState({ visible: false });
  const [modalOrderState, setModalOrderState] = useState({ visible: false });
  const [ingredientModal, setIngredientModal] = useState({});

  const [ingredientsData, setIngredientsData] = useState(null);

  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        const res = await fetch(api);

        if (res.ok) {
          const data = await res.json();

          setIngredientsData(data.data);

          return;
        }

        await Promise.reject(res.status);
      } catch (error) {
        console.log(`Ошибка ${error}`);
      }
    }

    getIngredientsData();
  }, []);

  const handleOpenModalIngredient = (data) => {
    setIngredientModal(data);
    setModalIngredientState({ visible: true });
  }

  const handleOpenModalOrder = () => {
    setModalOrderState({ visible: true });
  }

  const handleCloseModalIngredient = () => {
    setModalIngredientState({ visible: false });
  }

  const handleCloseModalOrder = () => {
    setModalOrderState({ visible: false });
  }

  const modalOrder = (
    <Modal
      title=''
      closeModal={handleCloseModalOrder}
    >
      <OrderDetails />
    </Modal>
  );

  const modalIngredient = (
    <Modal
      title='Детали ингредиента'
      closeModal={handleCloseModalIngredient}
    >
      <IngredientDetails ingredient={ingredientModal} />
    </Modal>
  );

  return ingredientsData && (
    <IngredientsContextProvider ingredients={ingredientsData}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients
          ingredients={ingredientsData}
          openModal={handleOpenModalIngredient}
        />
        <BurgerConstructor
          openModal={handleOpenModalOrder}
        />
      </main>
      {modalIngredientState.visible && modalIngredient}
      {modalOrderState.visible && modalOrder}
    </IngredientsContextProvider>
  )
}

export default App;

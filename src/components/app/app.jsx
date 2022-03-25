import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { IngredientsContextProvider } from '../../services/contexts/ingredients-context';

import { BASE_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';

import appStyles from './app.module.css';

const App = () => {
  const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
  const [isOrderModalShown, setIsOrderModalShown] = useState(false);
  const [ingredientModal, setIngredientModal] = useState(null);
  const [ingredientsData, setIngredientsData] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getIngredientsData = async (url) => {
      try {
        const res = await fetch(`${BASE_URL}${url}`);
        const data = await checkResponse(res);

        setIngredientsData(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getIngredientsData('ingredients');
  }, []);

  const handleOpenModalIngredient = (data) => {
    setIngredientModal(data);
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

  return ingredientsData && (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients
          ingredients={ingredientsData}
          openModal={handleOpenModalIngredient}
        />
        <IngredientsContextProvider ingredients={ingredientsData}>
          <BurgerConstructor
            openModal={handleOpenModalOrder}
            setOrderDetails={setOrder}
          />
        </IngredientsContextProvider>
      </main>
      {isIngredientModalShown && (
        <Modal
          title='Детали ингредиента'
          closeModal={handleCloseModalIngredient}
        >
          <IngredientDetails ingredient={ingredientModal} />
        </Modal>
      )}
      {isOrderModalShown && (
        <Modal
          closeModal={handleCloseModalOrder}
        >
          <OrderDetails orderDetails={order} />
        </Modal>
      )}
    </>
  )
}

export default App;

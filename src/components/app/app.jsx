import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { api } from '../../utils/constants';

import appStyles from './app.module.css';

const App = () => {
	const [ingredientsData, setIngredientsData] = useState(null);
	const [modalIngredientState, setModalIngredientState] = useState({visible: false});
	const [modalOrderState, setModalOrderState] = useState({visible: false});
	const [ingredient, setIngredient] = useState({});

	useEffect(() => {
		const getIngredientsData = async () => {
			try {
				const res = await fetch(api);
				const data = await res.json();

				setIngredientsData(data.data);
			} catch (error) {
				console.log(error);
			}
		}

		getIngredientsData();
	}, []);

	const handleOpenModalIngredient = (data) => {
		setIngredient(data);
		setModalIngredientState({visible: true});
	}

	const handleOpenModalOrder = () => {
		setModalOrderState({visible: true});
	}

	const handleCloseModalIngredient = () => {
		setModalIngredientState({visible: false});
	}

	const handleCloseModalOrder = () => {
		setModalOrderState({visible: false});
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
			<IngredientDetails ingredient={ingredient} />
		</Modal>
	)

	return ingredientsData && (
		<>
			<AppHeader />
			<main className={appStyles.main}>
				<BurgerIngredients
					ingredients={ingredientsData}
					openModal={handleOpenModalIngredient}
				/>
				<BurgerConstructor
					ingredients={ingredientsData}
					openModal={handleOpenModalOrder}
				/>
			</main>
			{modalIngredientState.visible && modalIngredient}
			{modalOrderState.visible && modalOrder}
		</>
	)
}

export default App;

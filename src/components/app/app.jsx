import React, { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { api } from '../../utils/constants';

import appStyles from './app.module.css';

const App = () => {
	const [ingredientsData, setIngredientsData] = useState(null);

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

	return ingredientsData && (
		<>
			<AppHeader />
			<main className={appStyles.main}>
				<BurgerIngredients ingredients={ingredientsData} />
				<BurgerConstructor ingredients={ingredientsData} />
			</main>
		</>
	)
}

export default App;

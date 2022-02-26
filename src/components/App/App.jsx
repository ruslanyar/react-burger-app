import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data.json';
import appStyles from './app.module.css';

const App = () => {

	return (
		<>
			<AppHeader />
			<main className={appStyles.main}>
				<BurgerIngredients ingredients={data} />
				<BurgerConstructor ingredients={data} />
			</main>
		</>
	)
}

export default App;

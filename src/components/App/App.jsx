import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import data from '../../utils/data.json';
import appStyles from './App.module.css';

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

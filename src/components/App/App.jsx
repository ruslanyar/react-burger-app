import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

const App = () => {

	return (
		<>
			<AppHeader />
			<main>
				<BurgerIngredients />
			</main>
		</>
	)
}

export default App;

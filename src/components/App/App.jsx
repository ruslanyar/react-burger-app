import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import data from '../../utils/data.json';

const App = () => {

	return (
		<>
			<AppHeader />
			<main style={{display: 'flex', width: 1240, justifyContent: 'space-between'}}>
				<BurgerIngredients ingredients={data} />
				<BurgerConstructor ingredients={data} />
			</main>
		</>
	)
}

export default App;

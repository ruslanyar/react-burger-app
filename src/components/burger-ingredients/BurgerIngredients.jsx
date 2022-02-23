import React from 'react';
import ingredientsStyles from './BurgerIngredients.module.css';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
	const [current, setCurrent] = React.useState('rolls');
	
	return (
		<section className='pt-10'>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<div className={ingredientsStyles.tabs}>
				<Tab value='rolls' active={current === 'rolls'} onClick={setCurrent}>Булки</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
				<Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
			</div>

		</section>
	)
}


export default BurgerIngredients;

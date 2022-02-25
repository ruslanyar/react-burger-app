import React from 'react';
import ingredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem';

const makeIngredientsList = (array, type) => {
	return array.map(item => item.type === type &&
		<BurgerIngredientsItem key={item._id} ingredient={item} />)
}

const BurgerIngredients = ({ingredients}) => {
	const [current, setCurrent] = React.useState('buns');
	
	return (
		<section className='pt-10'>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<div className={`${ingredientsStyles.tabs} mb-10`}>
				<Tab value='buns' active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
				<Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
			</div>
			<div className={`${ingredientsStyles.ingredients} custom-scroll`}>
				<section className='mb-10'>
					<h2 className='text text_type_main-medium mb-6' id='bun'>Булки</h2>
					<ul className={`${ingredientsStyles['ingredients-item']} pl-4 pr-4`}>
						{makeIngredientsList(ingredients, 'bun')}
					</ul>
				</section>
				<section className='mb-10'>
					<h2 className='text text_type_main-medium mb-6' id='sauce'>Соусы</h2>
					<ul className={`${ingredientsStyles['ingredients-item']} pl-4 pr-4`}>
						{makeIngredientsList(ingredients, 'sauce')}
					</ul>
				</section>
				<section className='mb-10'>
					<h2 className='text text_type_main-medium mb-6' id='main'>Начинки</h2>
					<ul className={`${ingredientsStyles['ingredients-item']} pl-4 pr-4`}>
						{makeIngredientsList(ingredients, 'main')}
					</ul>
				</section>
			</div>
		</section>
	)
}


export default BurgerIngredients;

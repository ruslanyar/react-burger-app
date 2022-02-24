import React from 'react';
import ingredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';
import BurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem';

const makeIngredientsList = (array, type) => {
	return array.map(item => item.type === type &&
		<BurgerIngredientsItem key={item._id} ingredient={item} />)
}

const BurgerIngredients = () => {
	const [current, setCurrent] = React.useState('buns');
	
	return (
		<section className='pt-10'>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<div className={ingredientsStyles.tabs}>
				<Tab value='buns' active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
				<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
				<Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
			</div>
			<div className={`${ingredientsStyles.ingredients} custom-scroll`}>
				<section>
					<h2 className='text text_type_main-medium' id='bun'>Булки</h2>
					<div className={ingredientsStyles['ingredients-item']}>
						{makeIngredientsList(data, 'bun')}
					</div>
				</section>
				<section>
					<h2 className='text text_type_main-medium' id='sauce'>Соусы</h2>
					<div className={ingredientsStyles['ingredients-item']}>
						{makeIngredientsList(data, 'sauce')}
					</div>
				</section>
				<section>
					<h2 className='text text_type_main-medium' id='main'>Начинки</h2>
					<div className={ingredientsStyles['ingredients-item']}>
						{makeIngredientsList(data, 'main')}
					</div>
				</section>
			</div>
		</section>
	)
}


export default BurgerIngredients;

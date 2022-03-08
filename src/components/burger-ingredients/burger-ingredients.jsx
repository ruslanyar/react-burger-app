import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientPropType } from '../../utils/constants';

import ingredientsStyles from './burger-ingredients.module.css';

const BurgerIngredients = ({ingredients, openModal}) => {

	const [current, setCurrent] = React.useState('buns');

	const buns = ingredients.filter(item => item.type === 'bun');
	const sauces = ingredients.filter(item => item.type === 'sauce');
	const main = ingredients.filter(item => item.type === 'main');

	const makeIngredientsList = (array) => {
		return array.map(item => (
			<li key={item._id} onClick={() => openModal(item)} className={`${ingredientsStyles.item} mb-8`}>
				<Counter count={1} size="default" />
				<img src={item.image} alt={item.name} className='ml-4 mr-4 mb-1' />
				<div className={`${ingredientsStyles.currency} mb-1`}>
					<span className='text text_type_digits-default mr-2'>{item.price}</span>
					<CurrencyIcon />
				</div>
				<p className='text text_type_main-default'>{item.name}</p>
			</li>
		));
	}
	
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
						{makeIngredientsList(buns)}
					</ul>
				</section>
				<section className='mb-10'>
					<h2 className='text text_type_main-medium mb-6' id='sauce'>Соусы</h2>
					<ul className={`${ingredientsStyles['ingredients-item']} pl-4 pr-4`}>
						{makeIngredientsList(sauces)}
					</ul>
				</section>
				<section className='mb-10'>
					<h2 className='text text_type_main-medium mb-6' id='main'>Начинки</h2>
					<ul className={`${ingredientsStyles['ingredients-item']} pl-4 pr-4`}>
						{makeIngredientsList(main)}
					</ul>
				</section>
			</div>
		</section>
	);
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	openModal: PropTypes.func.isRequired,
}

export default BurgerIngredients;

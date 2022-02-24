import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './BurgerIngredientsItem.module.css';

const BurgerIngredientsItem = ({ingredient}) => {

	return (
		<div className={`${itemStyles.item}`}>
			<Counter count={1} size="default" />
			<img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4' />
			<div className={itemStyles.currency}>
				<span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
				<CurrencyIcon />
			</div>
			<p className='text text_type_main-default'>{ingredient.name}</p>
		</div>
	)
}

export default BurgerIngredientsItem;

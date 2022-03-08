import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientPropType } from '../../utils/constants';

import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ingredients, openModal}) => {
	
	const filteredIngredients = ingredients.filter(item => item.type !== 'bun');

	return (
		<section className={`${constructorStyles.constructor} pt-25`}>
			<div className='ml-6'>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${ingredients[0].name} (верх)`}
					price={ingredients[0].price}
					thumbnail={ingredients[0].image}
				/>
			</div>
			<ul className={`${constructorStyles.list} mt-4 mb-4 custom-scroll`}>
				{filteredIngredients.map(item => (
					<li key={item._id} className={`${constructorStyles['list-item']} mb-4`}>
						<DragIcon />
						<ConstructorElement
							text={item.name}
							price={item.price}
							thumbnail={item.image}
						/>
					</li>
				))}
			</ul>
			<div className='ml-6 mb-10'>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${ingredients[0].name} (низ)`}
					price={ingredients[0].price}
					thumbnail={ingredients[0].image}
				/>
			</div>
			<div className={`${constructorStyles.currency} mr-4`}>
				<div className={`${constructorStyles.total} mr-10`}>
					<span className='text text_type_digits-medium mr-4'>610</span>
					<div className={constructorStyles.icon}>
						<CurrencyIcon />
					</div>
				</div>
				<div onClick={openModal}>
					<Button type="primary" size="large">Оформить заказ</Button>
				</div>
			</div>
		</section>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;

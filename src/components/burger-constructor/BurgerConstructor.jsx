import React from 'react';
import constructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ingredientsList = (array) => {
	return array.map(item => item.type !== 'bun' &&
		(
			<li key={item._id} className={`${constructorStyles['list-item']} mb-4`}>
				<DragIcon />
				<ConstructorElement
					text={item.name}
					price={item.price}
					thumbnail={item.image}
				/>
			</li>
		)
	)
}

const BurgerConstructor = ({ingredients}) => {

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
				{ingredientsList(ingredients)}
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
					<span className='text text_type_digits-medium mr-2'>610</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large">Оформить заказ</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor;

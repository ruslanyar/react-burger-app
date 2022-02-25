import React from 'react';
import constructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ingredientsList = (array) => {
	return array.map(item => item.type !== 'bun' &&
		(
			<li>
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
			<ConstructorElement
				type='top'
				isLocked={true}
				text={`${ingredients[0].name} (верх)`}
				price={ingredients[0].price}
				thumbnail={ingredients[0].image}
			/>
			<ul className={`${constructorStyles.list} custom-scroll`}>
				{ingredientsList(ingredients)}
			</ul>
			<ConstructorElement
				type='bottom'
				isLocked={true}
				text={`${ingredients[0].name} (низ)`}
				price={ingredients[0].price}
				thumbnail={ingredients[0].image}
			/>
			<div>
				<div>
					<span></span>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large">Оформить заказ</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor;

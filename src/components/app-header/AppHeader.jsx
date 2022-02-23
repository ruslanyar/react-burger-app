import React from 'react';
import headerStyles from './AppHeader.module.css';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuListItem from '../menu-list-item/MenuListItem';

const AppHeader = () => {

	return (
		<header className={headerStyles.header}>
			<nav className={headerStyles.menu}>
				<ul className={headerStyles.list}>
					<MenuListItem className={headerStyles} link='#'>
						<BurgerIcon />
						<p className='text text_type_main-default'>Конструктор</p>
					</MenuListItem>
					<MenuListItem className={headerStyles} link='#'>
						<ListIcon />
						<p className='text text_type_main-default'>Лента заказов</p>
					</MenuListItem>
					<MenuListItem className={headerStyles} link='#'>
						<Logo />
					</MenuListItem>
					<MenuListItem className={headerStyles} link='#'>
						<ProfileIcon />
						<p className='text text_type_main-default'>Личный кабинет</p>
					</MenuListItem>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader;

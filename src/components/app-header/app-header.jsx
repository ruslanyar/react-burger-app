import React from 'react';
import headerStyles from './app-header.module.css';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuListItem from '../menu-list-item/menu-list-item';

const AppHeader = () => {

	return (
		<header className={headerStyles.header}>
			<nav className={headerStyles.menu}>
				<ul className={headerStyles.list}>
					<MenuListItem
						spacing='mt-4 mb-4 mr-2 pt-4 pb-4 pl-5 pr-5'
						link='#'
					>
						<BurgerIcon />
						<span className='text text_type_main-default ml-2'>Конструктор</span>
					</MenuListItem>
					<MenuListItem
						spacing='mt-4 mb-4 pt-4 pb-4 pl-5 pr-5'
						link='#'
					>
						<ListIcon />
						<span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
					</MenuListItem>
					<MenuListItem
						spacing=''
						link='#'
					>
						<Logo />
					</MenuListItem>
					<MenuListItem
						spacing='mt-4 mb-4 pt-4 pb-4 pl-5 pr-5'
						link='#'
					>
						<ProfileIcon />
						<span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
					</MenuListItem>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader;

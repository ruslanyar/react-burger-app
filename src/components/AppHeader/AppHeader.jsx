/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import headerStyles from './AppHeader.module.css'
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

	return (
		<header className={headerStyles.header}>
			<div className={headerStyles.logo}>
				<Logo />
			</div>
			<nav>
				<ul className={headerStyles.list}>
					<li className='mt-4 mb-4 mr-2'>
						<a href="#" className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`}>
							<BurgerIcon />
							<p className='text text_type_main-default ml-2'>Конструктор</p>
						</a>
					</li >
					<li className='mt-4 mb-4'>
						<a href="#" className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`}>
							<ListIcon />
							<p className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</p>
						</a>
					</li>
					<li className='mt-4 mb-4'>
						<a href="#" className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`}>
							<ProfileIcon />
							<p className='text text_type_main-default text_color_inactive'>Личный кабинет</p>
						</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default AppHeader;

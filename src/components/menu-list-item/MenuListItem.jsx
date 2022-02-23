import React from 'react';
import listItemStyles from './MenuListItem.module.css';

const MenuListItem = (props) => {

	return (
		<li className={`${listItemStyles['list-item']} ${props.spacing}`}>
			<a href={props.link} className={listItemStyles.link}>
				{props.children}
			</a>
		</li>
	)
}

export default MenuListItem;

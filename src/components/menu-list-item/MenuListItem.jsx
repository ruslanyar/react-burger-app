import React from 'react';

const MenuListItem = ({className, ...props}) => {

	return (
		<li>
			<a href={props.link} className={className.link}>
				{props.children}
			</a>
		</li>
	)
}

export default MenuListItem;

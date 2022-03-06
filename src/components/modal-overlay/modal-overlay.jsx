import React from 'react';

import overlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({children, close}) => {
	const handleClose = (e) => {
		if (e.target === e.currentTarget) close();
	}

	return (
		<div
			className={overlayStyles.overlay}
			onClick={handleClose}
		>
			{children}
		</div>
	)
}

export default ModalOverlay;

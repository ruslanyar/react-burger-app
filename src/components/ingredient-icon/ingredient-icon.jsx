import React from 'react';
import clsx from 'clsx';

import styles from './ingredient-icon.module.css';

export default function IngredientIcon({ imageUrl, index }) {
  return (
    <div
      style={{ zIndex: `${10 - index}`, left: `${index * 48}px` }}
      className={styles.ingredients}
    >
      <div className={styles['image-container']}>
        <div className={styles.border} />
        <div
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
          className={styles.image}
        />
      </div>
      {index && index === 5 && (
        <div className={styles.overlay}>
          <span className={clsx('text', 'text_type_main-small')}>{`+${3}`}</span>
        </div>
      )}
    </div>
  );
}
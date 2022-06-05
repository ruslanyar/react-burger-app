import React from 'react';

import styles from './ingredient-icon.module.css';

// TODO  в пропсы будет передаваться url картинки и индекс для вычесления z-index
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
    </div>
  );
}

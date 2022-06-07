import React, { useMemo } from 'react';
import clsx from 'clsx';

import styles from './ingredient-icon.module.css';

export default function IngredientIcon({
  imageUrl,
  index,
  position = 'absolute',
}) {

  const ingredientIconStyle = useMemo(() => (
    position === 'absolute'
      ? { position, zIndex: `${10 - index}`, left: `${index * 48}px` }
      : { position }),
    [index, position]
  );

  return (
    <div style={ingredientIconStyle} className={styles['ingredient-icon']}>
      <div className={styles.border} />
      <div
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
        className={styles.image}
      />
      {index === 5 && (
        <div className={styles.overlay}>
          <span className={clsx('text', 'text_type_main-small')}>
            {`+${3}`}
          </span>
        </div>
      )}
    </div>
  );
}

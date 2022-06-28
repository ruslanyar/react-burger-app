import React, { FC, useMemo } from 'react';
import clsx from 'clsx';

import { IIngredientIconProps } from './ingredient-icon.types';

import styles from './ingredient-icon.module.css';

const IngredientIcon: FC<IIngredientIconProps> = ({
  imageUrl,
  index,
  count,
  position = 'absolute',
}) => {
  const ingredientIconStyle = useMemo(
    () =>
      position === 'absolute'
        ? { position, zIndex: `${10 - index}`, left: `${index * 48}px` }
        : { position },
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
      {index === 5 && count > 0 && (
        <div className={styles.overlay}>
          <span className={clsx('text', 'text_type_main-small')}>
            {`+${count}`}
          </span>
        </div>
      )}
    </div>
  );
}

export default IngredientIcon;

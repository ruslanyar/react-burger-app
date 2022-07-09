import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import { useAppSelector } from '../../services/hooks/hooks';

import Loader from '../../ui/loader/Loader';
import { ingredientsSelector } from '../../services/selectors';
import { IIngredient } from '../../services/types/data';
import { IIngredientDetailsProps } from './ingredient-details.types';

import styles from './ingredient-details.module.css';

const IngredientDetails: FC<IIngredientDetailsProps> = ({
  isModal = false,
}) => {
  const { id } = useParams();

  const { ingredients } = useAppSelector(ingredientsSelector);

  if (Array.isArray(ingredients) && ingredients.length === 0) {
    return <Loader />;
  }

  const [ingredient]: IIngredient[] = ingredients.filter(
    (ingredient: IIngredient) => ingredient._id === id
  );

  return (
    <div className={styles.details}>
      <h2
        className={clsx(
          isModal && styles.title,
          'text',
          'text_type_main-large'
        )}
      >
        Детали ингредиента
      </h2>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className="mb-4"
      />
      <span className="text text_type_main-medium mb-8">{ingredient.name}</span>
      <div className={styles.nutritions}>
        <div
          className={clsx(
            styles['nutritions__values'],
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          <span>Калории,ккал</span>
          <span>Белки, г</span>
          <span>Жиры, г</span>
          <span>Углеводы, г</span>
        </div>
        <div
          className={clsx(
            styles['nutritions__values'],
            'text',
            'text_type_digits-default',
            'text_color_inactive'
          )}
        >
          <span>{ingredient.calories}</span>
          <span>{ingredient.proteins}</span>
          <span>{ingredient.fat}</span>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;

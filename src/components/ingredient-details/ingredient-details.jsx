import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Loader from '../../ui/loader/Loader';
import { ingredientsSelector } from '../../services/selectors';

import styles from './ingredient-details.module.css';

export default function IngredientDetails({ isModal = false }) {
  const { id } = useParams();

  const { ingredients } = useSelector(ingredientsSelector);

  if (Array.isArray(ingredients) && ingredients.length === 0) {
    return <Loader />;
  }

  const [ingredient] = ingredients.filter(
    (ingredient) => ingredient._id === id
  );

  return (
    <div className={styles.details}>
      <h2 className={clsx(isModal && styles.title, 'text', 'text_type_main-large')}>
        Детали ингредиента
      </h2>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className="mb-4"
      />
      <span className="text text_type_main-medium mb-8">{ingredient.name}</span>
      <table width="516" align="center">
        <tbody>
          <tr
            align="center"
            className="text text_type_main-default text_color_inactive"
          >
            <td>Калории,ккал</td>
            <td>Белки, г</td>
            <td>Жиры, г</td>
            <td>Углеводы, г</td>
          </tr>
          <tr
            align="center"
            className="text text_type_digits-default text_color_inactive"
          >
            <td>{ingredient.calories}</td>
            <td>{ingredient.proteins}</td>
            <td>{ingredient.fat}</td>
            <td>{ingredient.carbohydrates}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

IngredientDetails.propTypes = {
  isModal: PropTypes.bool,
}

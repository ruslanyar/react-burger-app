import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const { ingredient } = useSelector(store => store.details);

  return (
    <div className={styles.details}>
      <img src={ingredient.image_large} alt={ingredient.name} className='mb-4' />
      <span className='text text_type_main-medium mb-8'>{ingredient.name}</span>
      <table width="516" align="center">
        <tbody>
          <tr align="center" className='text text_type_main-default text_color_inactive'>
            <td>Калории,ккал</td>
            <td>Белки, г</td>
            <td>Жиры, г</td>
            <td>Углеводы, г</td>
          </tr>
          <tr align="center" className='text text_type_digits-default text_color_inactive'>
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

export default IngredientDetails;

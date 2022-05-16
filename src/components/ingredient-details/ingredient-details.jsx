import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

export default function IngredientDetails() {
  const { details } = useSelector(store => store.ingredientDetails);

  return (
    <div className={styles.details}>
      <img src={details.image_large} alt={details.name} className='mb-4' />
      <span className='text text_type_main-medium mb-8'>{details.name}</span>
      <table width="516" align="center">
        <tbody>
          <tr align="center" className='text text_type_main-default text_color_inactive'>
            <td>Калории,ккал</td>
            <td>Белки, г</td>
            <td>Жиры, г</td>
            <td>Углеводы, г</td>
          </tr>
          <tr align="center" className='text text_type_digits-default text_color_inactive'>
            <td>{details.calories}</td>
            <td>{details.proteins}</td>
            <td>{details.fat}</td>
            <td>{details.carbohydrates}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

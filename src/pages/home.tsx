import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

import styles from './home.module.css';

export function Home(): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles['constructor-container']}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

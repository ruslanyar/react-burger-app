import { createContext, useContext } from "react";

const IngredientsContext = createContext(null);

export const useIngredients = () => {
  return useContext(IngredientsContext);
}

export function IngredientsContextProvider({ children, ingredients }) {
  return (
    <IngredientsContext.Provider value={ingredients}>
      {children}
    </IngredientsContext.Provider>
  );
}



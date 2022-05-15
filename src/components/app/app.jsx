import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Layout,
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from '../../pages';

// import Modal from "../modal/modal";
// import OrderDetails from "../order-details/order-details";
// import IngredientDetails from "../ingredient-details/ingredient-details";

import { getIngredients } from '../../services/actions/ingredientsActions';
// import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredientDetailsActions";
// import { CLOSE_ORDER_DETAILS } from "../../services/actions/orderActions";
// import { CLEAR_CONSTRUCTOR } from "../../services/actions/constructorActions";

const App = () => {
  const dispatch = useDispatch();

  // const isIngredientModalShown = useSelector(
  //   (store) => store.ingredientDetails.isOpen;
  // );
  // const isOrderModalShown = useSelector((store) => store.orderDetails.isOpen);

  // const closeDetailsHandler = useCallback(() => {
  //   dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  // }, [dispatch]);

  // const closeOrderHandler = useCallback(() => {
  //   dispatch({ type: CLOSE_ORDER_DETAILS });
  //   dispatch({ type: CLEAR_CONSTRUCTOR });
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
      {/* {isIngredientModalShown && (
          <Modal title="Детали ингредиента" close={closeDetailsHandler}>
            <IngredientDetails />
          </Modal>
        )}
        {isOrderModalShown && (
          <Modal close={closeOrderHandler}>
            <OrderDetails />
          </Modal>
        )} */}
    </Router>
  );
};

export default App;

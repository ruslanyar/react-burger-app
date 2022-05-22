import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import {
  Layout,
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
} from '../../pages';

// import Modal from "../modal/modal";
// import OrderDetails from "../order-details/order-details";
// import IngredientDetails from "../ingredient-details/ingredient-details";

import { getIngredients } from '../../services/actions/ingredientsActions';
import ProfileForm from '../profile-form/profile-form';
import ProtectedRoute from '../protected-route/protected-route';
// import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredientDetailsActions";
// import { CLOSE_ORDER_DETAILS } from "../../services/actions/orderActions";
// import { CLEAR_CONSTRUCTOR } from "../../services/actions/constructorActions";

export default function App() {
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
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute anonymous>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute anonymous>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRoute anonymous>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRoute anonymous>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
          </Route>
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
    </>
  );
}

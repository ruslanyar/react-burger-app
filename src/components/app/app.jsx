import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import {
  Layout,
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFoundPage,
  Ingredient,
} from '../../pages';

import IngredientDetails from '../ingredient-details/ingredient-details';
import ProfileForm from '../profile-form/profile-form';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import Loader from '../../ui/loader/Loader';
// import OrderDetails from "../order-details/order-details";

import { getIngredients } from '../../services/actions/ingredientsActions';

// import { CLOSE_ORDER_DETAILS } from "../../services/actions/orderActions";
// import { CLEAR_CONSTRUCTOR } from "../../services/actions/constructorActions";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { request, failed } = useSelector((store) => store.ingredients);

  const background = location.state?.background;

  console.log(background);
  // const isIngredientModalShown = useSelector(
  //   (store) => store.ingredientDetails.isOpen;
  // );
  // const isOrderModalShown = useSelector((store) => store.orderDetails.isOpen);

  const closeDetailsHandler = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // const closeOrderHandler = useCallback(() => {
  //   dispatch({ type: CLOSE_ORDER_DETAILS });
  //   dispatch({ type: CLEAR_CONSTRUCTOR });
  // }, [dispatch]);

  if (request) return <Loader style={{ margin: '40px auto' }} />;

  if (failed)
    return (
      <p className="text text_type_main-default">
        Произошла ошибка при загрузке данных с сервера
      </p>
    );

  return (
    <>
      <Routes location={background || location}>
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

          <Route path="feed" element={<div>Здесь пока ничео нет</div>} />

          <Route path="ingredients/:id" element={<Ingredient />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal close={closeDetailsHandler}>
                <IngredientDetails isModal />
              </Modal>
            }
          />
        </Routes>
      )}

      {/* 
        {isOrderModalShown && (
          <Modal close={closeOrderHandler}>
            <OrderDetails />
          </Modal>
        )} */}
    </>
  );
}

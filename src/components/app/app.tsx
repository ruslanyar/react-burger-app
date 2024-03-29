import { FC, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
  Layout,
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
  OrderInfoPage,
  FeedPage,
  OrdersHistoryPage,
} from '../../pages';

import IngredientDetails from '../ingredient-details/ingredient-details';
import ProfileForm from '../profile-form/profile-form';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import Loader from '../../ui/loader/Loader';
import OrderDetails from '../order-details/order-details';
import OrderInfo from '../order-info/order-info';
import NotFound from '../not-found/not-found';

import { TCloseModalCallback, TLocationState } from './app.types';
import { getIngredients } from '../../services/thunks/ingredients';
import { getUserInfo } from '../../services/thunks/user';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { clearOrderDetails } from '../../services/slices/orderSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation() as TLocationState;
  const navigate = useNavigate();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (background) {
      window.history.replaceState({}, '');
    }
  }, [background]);

  const { request, failed }: { request: boolean; failed: boolean } = useAppSelector(selectIngredients);

  const closeModalHandler = useCallback<TCloseModalCallback>(() => {
    navigate(-1);
  }, [navigate]);

  const closeOrderHandler = useCallback<TCloseModalCallback>(() => {
    closeModalHandler();
    dispatch(clearOrderDetails());
    dispatch(clearConstructor());
  }, [dispatch, closeModalHandler]);

  if (request) return <Loader />;

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
          <Route index element={<Home />} />

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
            <Route path="orders" element={<OrdersHistoryPage />} />
          </Route>

          <Route
            path="profile/orders/:id"
            element={
              <ProtectedRoute>
                <OrderInfoPage />
              </ProtectedRoute>
            }
          />

          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<OrderInfoPage />} />

          <Route path="ingredients/:id" element={<Ingredient />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal close={closeModalHandler}>
                <IngredientDetails isModal />
              </Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal close={closeModalHandler}>
                <OrderInfo isModal />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal close={closeModalHandler}>
                <OrderInfo isModal />
              </Modal>
            }
          />

          <Route
            path="/order-details"
            element={
              <Modal close={closeOrderHandler}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;

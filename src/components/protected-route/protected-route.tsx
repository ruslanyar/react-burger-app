import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../services/hooks/hooks';

import { userSelector } from '../../services/selectors';
import { IProtectedRoutProps, TLocationState } from './protected-route.types';

const ProtectedRoute: FC<IProtectedRoutProps> = ({ children, anonymous = false }) => {
  const { isAuth } = useAppSelector(userSelector);
  const location = useLocation() as TLocationState;

  const from = location.state?.from?.pathname || '/';

  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

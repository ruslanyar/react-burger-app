import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { userSelector } from '../../services/selectors';

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isAuth } = useSelector(userSelector);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return <>{children}</>;
}

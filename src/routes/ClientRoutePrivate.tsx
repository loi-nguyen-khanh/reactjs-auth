import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_CLIENT } from '../constants/AuthConstant';
import { PrivateRouteProps } from './AdminRoutePrivate';

const ClientRoutePrivate: React.FC<PrivateRouteProps> = ({
  isLoggedIn,
  role,
  isOnboarding,
  element: Component,
  theme,
}) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role === ROLE_ADMIN) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  if (role === ROLE_CLIENT) {
    if (isOnboarding) {
      return <Navigate to="/onboarding" state={{ from: location }} />;
    }
    return <Component appTheme={theme} />;
  }

  return <Navigate to="/login" state={{ from: location }} />;

};

export default ClientRoutePrivate;

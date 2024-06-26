import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROLE_ADMIN, ROLE_CLIENT } from '../constants/AuthConstant';

export interface PrivateRouteProps {
  isLoggedIn: boolean;
  role: string | null;
  isOnboarding: boolean;
  element: React.ElementType;
  theme: string,
}

const AdminRoutePrivate: React.FC<PrivateRouteProps> = ({
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
    return <Component appTheme={theme} />;
  }

  if (role === ROLE_CLIENT) {
    if (isOnboarding) {
      return <Navigate to="/onboarding" state={{ from: location }} />;
    }
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return <Navigate to="/login" state={{ from: location }} />;

};

export default AdminRoutePrivate;

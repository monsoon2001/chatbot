import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as needed

type PrivateRouteProps = {
  path: string;
  element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the route if user is authenticated
  return <Route path={path} element={element} />;
};

export default PrivateRoute;

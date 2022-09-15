import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '~/utils/localStorage';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = {};

  return user?.admin ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

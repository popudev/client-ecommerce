import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthenState } from '~/hooks';

const RequireAuth = () => {
  const { authenState } = useAuthenState();
  const location = useLocation();
  const user = authenState.login.currentUser;

  return user?.admin ? <Outlet /> : <Navigate to="/notfound" state={{ from: location }} replace />;
};

export default RequireAuth;

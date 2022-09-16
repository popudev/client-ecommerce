import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useGlobalState } from '~/hooks';

const RequireAuth = () => {
  const { globalState } = useGlobalState();
  const location = useLocation();
  const user = globalState.login.currentUser;

  return user?.admin ? <Outlet /> : <Navigate to="/notfound" state={{ from: location }} replace />;
};

export default RequireAuth;

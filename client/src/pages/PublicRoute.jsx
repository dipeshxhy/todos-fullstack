import { Navigate, Outlet } from 'react-router';

const PublicRoute = ({ user }) => {
  return user ? <Navigate to="/todos" replace /> : <Outlet />;
};
export default PublicRoute;

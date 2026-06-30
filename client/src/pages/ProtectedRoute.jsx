import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;

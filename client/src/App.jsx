import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import { authContext } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Register from './pages/Register';
import TodoList from './pages/TodoList';
import PublicRoute from './pages/PublicRoute';

const App = () => {
  const { user } = useContext(authContext);

  return (
    <div className="min-h-screen w-full bg-primary text-white ">
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PublicRoute user={user} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/todos" element={<TodoList />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default App;

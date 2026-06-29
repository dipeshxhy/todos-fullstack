import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-primary text-white ">
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;

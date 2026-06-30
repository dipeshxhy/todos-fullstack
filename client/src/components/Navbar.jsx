import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthContext';
import { logout } from '../services/authService';

const Navbar = () => {
  const { user, handleLogout: logoutUser } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message || 'Logged out successfully');
      logoutUser();
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to log out');
      console.error('Error occurred while logging out:', error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className="text-lg">
              <Link to="/">Home</Link>
            </li>

            {user && (
              <li className="text-lg">
                <Link to="/todos">Tasks</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-stone-300 uppercase">
          TaskManager
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="hidden gap-4 sm:flex">
          <li className="text-xl">
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li className="text-xl mr-6">
              <Link to={'/todos'}>Tasks</Link>
            </li>
          )}
        </ul>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>

              <li>
                <button onClick={handleLogout} className="justify-between">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link className="btn" to="/register">
              Register
            </Link>
            <Link className="btn btn-accent" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

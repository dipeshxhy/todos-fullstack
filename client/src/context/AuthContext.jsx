import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();

        // Assuming backend returns { user: {...} }
        setUser(data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <authContext.Provider value={{ user, handleLogin, handleLogout, loading }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Configure axios
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Logout function
  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setToken(null);
  setUser(null);
  axios.defaults.headers.common['Authorization'] = '';
  toast.success('Logged out successfully');
  };

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/me');
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.log('Auth check failed:', error);
          logout();
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  return (
    <AppContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
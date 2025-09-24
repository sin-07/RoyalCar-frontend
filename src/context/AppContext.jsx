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
  const API_BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || 'https://royalcar-backend-ssqx.onrender.com';
  console.log('AppContext: Configuring axios with baseURL:', API_BASE_URL);
  axios.defaults.baseURL = API_BASE_URL;
  
  // Update axios authorization header when token changes
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      // If admin credentials, use admin login endpoint
      if (email === 'aniket.singh9322@gmail.com' && password === '1234567') {
        const response = await axios.post('/api/admin/login', { email, password });
        if (response.data.token && response.data.admin) {
          setToken(response.data.token);
          setUser({ ...response.data.admin, role: 'admin' });
          // Update axios authorization header immediately
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          // Do NOT save admin in localStorage
          return true;
        }
        return false;
      } else {
        // Normal user login
        const response = await axios.post('/api/auth/login', { email, password });
        if (response.data.token && response.data.user) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setToken(response.data.token);
          setUser(response.data.user);
          // Update axios authorization header immediately
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          return true;
        }
        return false;
      }
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
        // Only check /api/auth/me for non-admin users
        if (!user || user.role !== 'admin') {
          try {
            const response = await axios.get('/api/auth/me');
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          } catch (error) {
            console.log('Auth check failed:', error);
            logout();
          }
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
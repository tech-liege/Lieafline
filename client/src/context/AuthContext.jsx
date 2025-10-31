import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('token'); // expired, clear it
        setToken('');
      }
    } catch {
      localStorage.removeItem('token'); // invalid token format
      setToken('');
    }
  }

  const mock = [
    { title: 'JavaScript Fundamentals', desc: 'Syntax, arrays, objects, ES6+', percent: 70, tags: ['JS', 'Core'] },
    { title: 'React Basics', desc: 'Hooks, components, props/state', percent: 45, tags: ['React'] },
    { title: 'Data Structures', desc: 'Trees, graphs, maps', percent: 25, tags: ['CS'] },
    { title: 'JavaScript Advanced', desc: 'Syntax, arrays, objects, ES6+', percent: 7, tags: ['JS', 'Core'] },
    { title: 'React Advanced', desc: 'Hooks, components, props/state', percent: 5, tags: ['React'] },
    { title: 'Data Structures Advanced', desc: 'Trees, graphs, maps', percent: 10, tags: ['CS'] },
  ];

  useEffect(() => {
    // keep token in sync across tabs
    const handleStorageChange = () => setToken(localStorage.getItem('token') || '');
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loginContext = newToken => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return <AuthContext.Provider value={{ token, mock, loginContext, logout, isAuthenticated: !!token }}>{children}</AuthContext.Provider>;
}

export const AuthContexts = AuthContext;

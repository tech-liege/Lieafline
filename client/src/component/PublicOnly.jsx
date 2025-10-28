import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PublicOnly({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('token'); // expired, clear it
        return children;
      }
      return <Navigate to='/dashboard' replace />;
    } catch {
      localStorage.removeItem('token'); // invalid token format
      return children;
    }
  }

  return children;
}

export default PublicOnly;

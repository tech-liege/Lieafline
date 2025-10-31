import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PublicOnly({ children }) {
  const { token } = useAuth();

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
}

export default PublicOnly;

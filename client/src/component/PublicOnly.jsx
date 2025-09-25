import { Navigate } from 'react-router-dom';

function PublicOnly({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return children;
  }
  return <Navigate to='/' replace />;
}

export default PublicOnly;

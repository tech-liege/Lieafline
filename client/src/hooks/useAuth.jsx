import { useContext } from 'react';
import { AuthContexts } from '../context/AuthContext';

export function useAuth() {
  return useContext(AuthContexts);
}

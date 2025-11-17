import { useContext } from 'react';
import { AuthContexts, VarContexts } from '../context/Contexts';

export function useAuth() {
  return useContext(AuthContexts);
}

export function useVar() {
  return useContext(VarContexts);
}


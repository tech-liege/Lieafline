import { createBrowserRouter } from 'react-router-dom';
import Authenticate from '../pages/Authenticate';
import Home from '../pages/Home';
import Skills from '../pages/Skills';
import CreateSkill from '../pages/CreateSkill';
import EditSkill from '../pages/EditSkill';
import Progress from '../pages/Progress';
import Profile from '../pages/Profile';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Settings from '../pages/Settings';
import PrivateRoute from '../component/PrivateRoute';
import PublicOnly from '../component/PublicOnly';
import { AuthProvider } from '../context/AuthContext';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: (
      <AuthProvider>
        <ErrorPage />
      </AuthProvider>
    ),
    children: [
      {
        path: ':mode',
        element: (
          <PublicOnly>
            <Authenticate />
          </PublicOnly>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <PublicOnly>
            <ForgotPassword />
          </PublicOnly>
        ),
      },
      {
        path: 'reset-password/:token',
        element: (
          <PublicOnly>
            <ResetPassword />
          </PublicOnly>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: (
      <AuthProvider>
        <ErrorPage />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <PublicOnly>
            <Home />
          </PublicOnly>
        ),
      },
      {
        path: 'skills',
        element: (
          <PrivateRoute>
            <Skills />
          </PrivateRoute>
        ),
      },
      {
        path: 'skills/:skillId',
        element: (
          <PrivateRoute>
            <Skills />
          </PrivateRoute>
        ),
      },
      {
        path: 'createSkill',
        element: (
          <PrivateRoute>
            <CreateSkill />
          </PrivateRoute>
        ),
      },
      {
        path: 'editSkill/:skillId',
        element: (
          <PrivateRoute>
            <EditSkill />
          </PrivateRoute>
        ),
      },
      {
        path: 'progress',
        element: (
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'settings',
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

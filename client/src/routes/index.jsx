import { createBrowserRouter } from 'react-router-dom';
import Authenticate from '../pages/Authenticate';
import Home from '../pages/Home';
import Skills from '../pages/Skills';
import Progress from '../pages/Progress';
import Profile from '../pages/Profile';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Settings from '../pages/Settings';
import PrivateRoute from '../component/PrivateRoute';
import PublicOnly from '../component/PublicOnly';

export const router = createBrowserRouter([
  {
    path: '/authenticate',
    element: (
      <PublicOnly>
        <Authenticate />
      </PublicOnly>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'skills',
        element: (
          <PrivateRoute>
            <Skills />
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

import { createBrowserRouter } from 'react-router-dom';
import Authenticate from '../pages/Authenticate';
import Home from '../pages/Home';
import Skills from '../pages/Skills';
import ExploreSkills from "../pages/ExploreSkills";
import CreateSkill from "../pages/CreateSkill";
import EditSkill from "../pages/EditSkill";
import DeleteSkill from "../pages/DeleteSkill";
import Phases from "../pages/Phases";
import Progress from "../pages/Progress";
import Profile from "../pages/Profile";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Settings from "../pages/Settings";
import PrivateRoute from "../component/PrivateRoute";
import PublicOnly from "../component/PublicOnly";
import Render from "../component/Render";
import { AuthProvider, VarProvider } from "../context/Contexts";
import Lesson from "../pages/Lesson";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <AuthProvider>
        <VarProvider>
          <App />
        </VarProvider>
      </AuthProvider>
    ),
    errorElement: (
      <AuthProvider>
        <VarProvider>
          <ErrorPage />
        </VarProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: ":routeMode",
        element: (
          <PublicOnly>
            <Authenticate />
          </PublicOnly>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicOnly>
            <ForgotPassword />
          </PublicOnly>
        ),
      },
      {
        path: "reset-password/:token",
        element: (
          <PublicOnly>
            <ResetPassword />
          </PublicOnly>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthProvider>
        <VarProvider>
          <App />
        </VarProvider>
      </AuthProvider>
    ),
    errorElement: (
      <AuthProvider>
        <VarProvider>
          <ErrorPage />
        </VarProvider>
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
        path: "skills",
        element: (
          <PrivateRoute>
            <Render />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Skills />,
          },
          {
            path: ":skillId",
            element: <Skills />,
          },
          {
            path: "explore",
            element: <ExploreSkills />,
          },
          {
            path: "create",
            element: <CreateSkill />,
          },
          {
            path: "edit/:skillId",
            element: <EditSkill />,
          },
          {
            path: "delete/:skillId",
            element: <DeleteSkill />,
          },
        ],
      },
      {
        path: "phases",
        element: (
          <PrivateRoute>
            <Render />
          </PrivateRoute>
        ),
        children: [
          {
            path: ":phaseId",
            element: <Phases />,
          },
        ],
      },
      {
        path: "lesson/:lessonId",
        element: (
          <PrivateRoute>
            <Lesson />
          </PrivateRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

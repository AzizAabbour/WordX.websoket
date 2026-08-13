import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';
import EditorLayout from '../layouts/EditorLayout';

import LandingPage from '../features/landing/LandingPage';
import LoginPage from '../features/auth/LoginPage';
import SignUpPage from '../features/auth/SignUpPage';
import ForgotPasswordPage from '../features/auth/ForgotPasswordPage';

import DashboardPage from '../features/dashboard/DashboardPage';
import MyDocumentsPage from '../features/documents/MyDocumentsPage';
import FavoritesPage from '../features/documents/FavoritesPage';
import TrashPage from '../features/documents/TrashPage';
import TemplatesPage from '../features/templates/TemplatesPage';
import SettingsPage from '../features/settings/SettingsPage';

import EditorPage from '../features/editor/EditorPage';
import CVBuilderPage from '../features/cv/CVBuilderPage';
import CoverLetterPage from '../features/coverLetter/CoverLetterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/documents', element: <MyDocumentsPage typeFilter="all" /> },
      { path: '/cvs', element: <MyDocumentsPage typeFilter="cv" /> },
      { path: '/cover-letters', element: <MyDocumentsPage typeFilter="coverLetter" /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/trash', element: <TrashPage /> },
      { path: '/templates', element: <TemplatesPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
  {
    element: <EditorLayout />,
    children: [
      { path: '/editor/:id', element: <EditorPage /> },
      { path: '/cv-builder/:id', element: <CVBuilderPage /> },
      { path: '/cover-letter/:id', element: <CoverLetterPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

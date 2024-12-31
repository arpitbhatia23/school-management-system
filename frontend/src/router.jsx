import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

// Lazy loading components
import Dashboard from './pages/Dashboard'; // Assuming AddStudent page
import AddStudent from './components/Addstudent';
import LoginPage from './pages/LoginPage';
import AdminDashbaord from './components/AdminDashbaord';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        children: [
          {
            path: '/',
            element: <AdminDashbaord />,
          },
          {
            path: '/addstudent',
            element: <AddStudent />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;

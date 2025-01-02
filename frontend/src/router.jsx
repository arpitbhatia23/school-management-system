import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

// Lazy loading components
import Dashboard from './pages/Dashboard'; // Assuming AddStudent page
import AddStudent from './components/Addstudent';
import LoginPage from './pages/LoginPage';
import AdminDashbaord from './pages/AdminDashbaord';
import Getstudent from './components/Getstudent';

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
          {
            path:"/getstudents",
            element:<Getstudent/>
          }
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

import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

// Lazy loading components
import Dashboard from './pages/Dashboard'; // Assuming AddStudent page
import AddStudent from './components/Addstudent';
import LoginPage from './pages/LoginPage';
import AdminDashbaord from './pages/AdminDashbaord';
<<<<<<< HEAD
import Setting from './components/Setting';
=======
import Getstudent from './components/Getstudent';
>>>>>>> 9be1a9b2c390ca48c6f688535446beabb59f9f2f

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
<<<<<<< HEAD
            path:'/setting',
            element:<Setting/>
=======
            path:"/getstudents",
            element:<Getstudent/>
>>>>>>> 9be1a9b2c390ca48c6f688535446beabb59f9f2f
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

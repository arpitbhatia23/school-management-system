import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

// Lazy loading components
import Dashboard from './pages/Dashboard'; // Assuming AddStudent page
import AddStudent from './components/Addstudent';
import LoginPage from './pages/LoginPage';
import AdminDashbaord from './pages/AdminDashbaord';
import Setting from './components/Setting';
import Getstudent from './components/Getstudent';
import PromoteStudent from './components/PromoteStudent';
import GetParents from './components/GetParents';

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
            path:'/setting',
            element:<Setting/>
          },
          {
            path:"/getstudents",
            element:<Getstudent/>
          },
          {
            path:"/promoteStudent",
            element:<PromoteStudent/>
          },
          {
            path:"/getparents",
            element:<GetParents/>
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

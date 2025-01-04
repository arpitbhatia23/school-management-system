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
<<<<<<< HEAD
=======
import PromoteStudent from './components/PromoteStudent';
>>>>>>> 79fa3a38b3e4f29f58752902cb5a89e447823b78

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
<<<<<<< HEAD
            element:<Setting/>},
            {
            path:"/getstudents",
            element:<Getstudent/>
=======
            element:<Setting/>
          },
          {
            path:"/getstudents",
            element:<Getstudent/>
          },
          {
            path:"/promoteStudent",
            element:<PromoteStudent/>
>>>>>>> 79fa3a38b3e4f29f58752902cb5a89e447823b78
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

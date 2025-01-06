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
import PromoteStudent from './components/PromoteStudent';
import AddTeacher from './components/AddTeacher';
=======

import PromoteStudent from './components/PromoteStudent';
import GetParents from './components/GetParents';
import Getteacher from './components/GetTeacher';
>>>>>>> 7ec871d07254084cb407769ae8f78069a245480d

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
          },{
            path:'/addteacher',
            element:<AddTeacher/>
          },
          {
<<<<<<< HEAD
            path:'/setting',
            element:<Setting/>},
            {
            path:"/getstudents",
            element:<Getstudent/>},
           
          
          {
            path:"/promoteStudent",
            element:<PromoteStudent/>
=======
            path: '/setting',
            element: <Setting />,
          },
          {
            path: '/getstudents',
            element: <Getstudent />,
          },
          {
            path: '/promoteStudent',
            element: <PromoteStudent />,
          },
          {
            path: '/getparents',
            element: <GetParents />,
          },
          {
            path:'/getteacher',
            element:<Getteacher/>
>>>>>>> 7ec871d07254084cb407769ae8f78069a245480d
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

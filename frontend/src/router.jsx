import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

import Dashboard from './pages/Dashboard'; // Assuming AddStudent page
import AddStudent from './components/Addstudent';
import LoginPage from './pages/LoginPage';
import AdminDashbaord from './pages/AdminDashbaord';
import Setting from './components/Setting';
import Getstudent from './components/Getstudent';
import AddTeacher from './components/AddTeacher';

import PromoteStudent from './components/PromoteStudent';
import GetParents from './components/GetParents';
import Getteacher from './components/GetTeacher';
import AddExpenses from './components/AddExpenses';
import AddSubject from './components/AddSubject';
import AddFees from './components/AddFees';

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
            path: '/addteacher',
            element: <AddTeacher />,
          },
          {
            path: '/addExpenses',
            element: <AddExpenses />,
          },{
            path:'/addFees',
            element:<AddFees/>
          },
          {
            path:'/addSubject'
            ,element:<AddSubject/>
          },

          {
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
            path: '/getteacher',
            element: <Getteacher />,
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

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
import GetFees from './components/GetFees';
import AddFees from './components/AddFees';
import Authlayout from './components/Authlayout';
import GetExpense from './components/GetExpense';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Authlayout>
            <Dashboard />
          </Authlayout>
        ),
        children: [
          {
            path: '/',
            element: (
              <Authlayout>
                <AdminDashbaord />
              </Authlayout>
            ),
          },
          {
            path: '/addstudent',
            element: (
              <Authlayout>
                <AddStudent />
              </Authlayout>
            ),
          },
          {
            path: '/addteacher',
            element: (
              <Authlayout>
                <AddTeacher />
              </Authlayout>
            ),
          },

          {
            path: '/addExpenses',
            element: (
              <Authlayout>
                <AddExpenses />
              </Authlayout>
            ),
          },
          {
            path: '/addFees',
            element: (
              <Authlayout>
                <AddFees />
              </Authlayout>
            ),
          },
          {
            path: '/addSubject',
            element: (
              <Authlayout>
                <AddSubject />
              </Authlayout>
            ),
          },

          {
            path: '/setting',
            element: (
              <Authlayout>
                <Setting />
              </Authlayout>
            ),
          },
          {
            path: '/getstudents',
            element: <Getstudent />,
          },
          {
            path: '/getFees',
            element: (
              <Authlayout>
                <GetFees />
              </Authlayout>
            ),
          },

          {
            path: '/promoteStudent',
            element: (
              <Authlayout>
                <PromoteStudent />
              </Authlayout>
            ),
          },

          {
            path: '/getparents',
            element: (
              <Authlayout>
                <GetParents />
              </Authlayout>
            ),
          },
          {
            path: '/getteacher',
            element: (
              <Authlayout>
                {' '}
                <Getteacher />
              </Authlayout>
            ),
          },
          {
            path: '/getexpense',
            element: (
              <Authlayout>
                {' '}
                <GetExpense />
              </Authlayout>
            ),
          },
        ],
      },
      {
        path: '/login',
        element: (
          <Authlayout Authentication={false}>
            {' '}
            <LoginPage />
          </Authlayout>
        ),
      },
    ],
  },
]);

export default router;

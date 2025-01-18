import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';
import Setting from '@/components/Setting';
import Dashboard from '@/pages/Dashboard';
import Authlayout from '@/components/Authlayout';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashbaord';
import Getstudent from '@/components/Getstudent';
import AddStudent from '@/components/Addstudent';
import PromoteStudent from '@/components/PromoteStudent';
import GetParents from '@/components/GetParents';
import Getteacher from '@/components/GetTeacher';
import AddTeacher from '@/components/AddTeacher';
import AddFees from '@/components/AddFees';
import GetFees from '@/components/GetFees';
import AddExpenses from '@/components/AddExpenses';
import GetExpense from '@/components/GetExpense';
import AddSubject from '@/components/AddSubject';
import TeacherDashboard from '@/components/teachercomp/TeacherDashboard';
import Attendance from '@/components/teachercomp/Attendance';
import GetStudent from '@/components/teachercomp/GetStudent';
import AddResult from '@/components/teachercomp/AddResult';
import Notfound from '@/components/Notfound';
import AddExam from '@/components/teachercomp/AddExam';
import Testcomp from '@/components/teachercomp/testcomp';
import Addassignments from '@/components/teachercomp/Addassignments';
import StDashboard from '@/components/Student/StDashboard';
import StResult from '@/components/Student/StResult';
import stNotification from '@/components/Student/StNotification';
import StNotification from '@/components/Student/StNotification';
import StAttendance from '@/components/Student/StAttendance';
import GetSubject from '@/components/Student/Getsuject';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} errorElement={<Notfound />}>
      {/* Admin Routes */}
      <Route
        path="/"
        element={
          <Authlayout>
            <Dashboard />
          </Authlayout>
        }
        errorElement={<Notfound />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="getstudents" element={<Getstudent />} />
        <Route path="addstudents" element={<AddStudent />} />
        <Route path="promotestudents" element={<PromoteStudent />} />
        <Route path="getparents" element={<GetParents />} />
        <Route path="getteachers" element={<Getteacher />} />
        <Route path="addteachers" element={<AddTeacher />} />
        <Route path="addfees" element={<AddFees />} />
        <Route path="getfees" element={<GetFees />} />
        <Route path="addexpenses" element={<AddExpenses />} />
        <Route path="getexpenses" element={<GetExpense />} />
        <Route path="settings" element={<Setting />} />
        <Route path="addsubjects" element={<AddSubject />} />
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <Authlayout>
            <Dashboard />
          </Authlayout>
        }
        errorElement={<Notfound />}
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="getstudents" element={<GetStudent />} />
        <Route path="results" element={<AddResult />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="settings" element={<Setting />} />
        <Route path="exams" element={<AddExam />} />
        <Route path="assignments" element={<Addassignments />} />
      </Route>
      {/* studdent */}
      <Route
        path="/student"
        element={
          <Authlayout>
            <Dashboard />
          </Authlayout>
        }
        errorElement={<Notfound />}
      >
        <Route index element={<StDashboard />} />
        <Route path="result" element={<StResult />} />
        <Route path="setting" element={<Setting />} />
        <Route path="notification" element={<StNotification />} />
        <Route path="subject" element={<GetSubject />} />
        <Route path="attendance" element={<StAttendance />} />
      </Route>

      {/* Login Route */}
      <Route
        path="/login"
        element={
          <Authlayout Authentication={false}>
            <LoginPage />
          </Authlayout>
        }
      />

      {/* Test Route */}

      <Route path="/test" element={<Testcomp />} errorElement={<Notfound />} />
    </Route>,
  ),
);

export default router;

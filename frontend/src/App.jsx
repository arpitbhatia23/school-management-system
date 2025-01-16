<<<<<<< HEAD
import { useEffect } from 'react';
import './App.css';
import { login } from './store/slice';
import { Toaster } from './components/ui/toaster';
import { Route, Routes} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthApi } from './services/authapi';
import Setting from './components/Setting';
import Dashboard from './pages/Dashboard';
import Authlayout from '@/components/Authlayout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashbaord';
import Getstudent from './components/Getstudent';
import AddStudent from './components/Addstudent';
import PromoteStudent from './components/PromoteStudent';
import GetParents from './components/GetParents';
import Getteacher from './components/GetTeacher';
import AddTeacher from './components/AddTeacher';
import AddFees from './components/AddFees';
import GetFees from './components/GetFees';
import AddExpenses from './components/AddExpenses';
import GetExpense from './components/GetExpense';
import AddSubject from './components/AddSubject';
import TeacherDashboard from './components/teachercomp/TeacherDashboard';
import Attendance from './components/teachercomp/Attendance';
import GetStudent from './components/teachercomp/GetStudent';
import AddResult from './components/teachercomp/AddResult';
import Addassignments from './components/teachercomp/Addassignments';

import { useEffect, useState } from "react";
import "./App.css";
import { login } from "./store/slice";
import { Toaster } from "./components/ui/toaster";
import { Route, RouterProvider, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthApi } from "./services/authapi";


import router from "@/router/router";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      const { currentUser } = useAuthApi();
      const res = await currentUser();
      if (res.data.success) {
        dispatch(login(res.data.data));
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [dispatch]);

 

  return (
    <>
      <div className="flex justify-center w-screen min-h-screen">
        <Toaster />
<<<<<<< HEAD
       <RouterProvider router={router}/>
=======
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/"
            element={<Authlayout><Dashboard /></Authlayout>}
            errorElement={<ErrorFallback />}
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
            <Route path="*" element={<Notfound />} />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={<Authlayout><Dashboard /></Authlayout>}
            errorElement={<ErrorFallback />}
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="getstudents" element={<GetStudent />} />
            <Route path="results" element={<AddResult />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="settings" element={<Setting />} />
            <Route path="exams" element={<AddExam />} />
            <Route path="*" element={<Notfound />} />
          </Route>

          {/* Login Route */}
          <Route
            path="/login"
            element={<Authlayout Authentication={false}><LoginPage /></Authlayout>}
          />

          {/* Test Route */}

             
             <Route path='/teacher' element={<Authlayout><Dashboard/></Authlayout>}>
             <Route path='/teacher' element={<Authlayout><TeacherDashboard/></Authlayout>}/>
<Route path ="Getstudents" element={<Authlayout><GetStudent/></Authlayout>}/>
<Route path ='results' element={<Authlayout><AddResult/></Authlayout>}/>
<Route path ="assignments" element={<Authlayout><Addassignments/></Authlayout>}/>

             <Route path='attendance' element={<Authlayout><Attendance/></Authlayout>}/>

           {/* <Route path ="Getstudents" element={<Authlayout><GetStudent/></Authlayout>}/> */}
             </Route>

            <Route path='/login' element={<Authlayout Authentication={false}><LoginPage/></Authlayout>}/>

         
          {/* </Routes> */}
          <Route path="/test" element={<Testcomp />} errorElement={<ErrorFallback />} />
        </Routes>
        <Toaster/>
>>>>>>> cced6b55418864f06a09c05672100c1e424d02fa
      </div>
    </>
  );
}

export default App;

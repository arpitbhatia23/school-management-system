import { useEffect } from 'react';
import './App.css';
import { login } from './store/slice';
import { Toaster } from './components/ui/toaster';
import { Outlet, Route, Router, Routes, useLocation } from 'react-router-dom';
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
import TeacherDashboard from './components/TeacherDashboard';

function App() {
  
  const dispatch = useDispatch();
  const currentuser = async () => {
    const { currentUser } = useAuthApi();
    const res = await currentUser();
    if (res.data.success === true) {
      const userData = res.data.data;
      dispatch(login(userData));
    }
  };
  useEffect(() => {
    currentuser();
  }, []);
  return (
    <>
      <div className=" flex justify-center   w-screen min-h-screen">
        <Toaster />
       
          <Routes>
            <Route path='/' element={<Authlayout><Dashboard/></Authlayout>}>
            {/* admin */}
            <Route path='/' element={<Authlayout><AdminDashboard/></Authlayout>}/>
            <Route path='getstudents' element={<Authlayout><Getstudent/></Authlayout>}/>
            <Route path='addstudents' element={<Authlayout><AddStudent/></Authlayout>}/>
            <Route path='promotestudents' element={<Authlayout><PromoteStudent/></Authlayout>}/>
            <Route path='getparents' element={<Authlayout><GetParents/></Authlayout>}/>
            <Route path='getteachers' element={<Authlayout><Getteacher/></Authlayout>}/>
            <Route path='addteachers' element={<Authlayout><AddTeacher/></Authlayout>}/>
            <Route path='addfees' element={<Authlayout><AddFees/></Authlayout>}/>
            <Route path='getfees' element={<Authlayout><GetFees/></Authlayout>}/>
            <Route path='addexpenses' element={<Authlayout><AddExpenses/></Authlayout>}/>
            <Route path='getexpenses' element={<Authlayout><GetExpense/></Authlayout>}/>
            <Route path='settings' element={<Authlayout><Setting/></Authlayout>}/>
            <Route path='addsubjects' element={<Authlayout><AddSubject/></Authlayout>}/>
            
             </Route>
             
             <Route path='/teacher' element={<Authlayout><Dashboard/></Authlayout>}>
             <Route path='/teacher' element={<Authlayout><TeacherDashboard/></Authlayout>}/>

             </Route>

            <Route path='/login' element={<Authlayout Authentication={false}><LoginPage/></Authlayout>}/>

         
          </Routes>
      </div>
    </>
  );
}

export default App;

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
import ErrorFallback from './components/ErrorFallback';
import Notfound from './components/Notfound';
import AddExam from './components/teachercomp/AddExam';

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
            <Route path='/' element={<Authlayout><Dashboard/></Authlayout>} errorElement={<ErrorFallback/>}>

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
            <Route path="*"  element={<Notfound/>} />
             </Route>   

                           {/* teacher router */}

             
             <Route path='/teacher' element={<Authlayout><Dashboard/></Authlayout>} errorElement={<ErrorFallback/>}>
             <Route path='/teacher' element={<Authlayout><TeacherDashboard/></Authlayout>}/>
<Route path ="Getstudents" element={<Authlayout><GetStudent/></Authlayout>}/>
<Route path ='results' element={<Authlayout><AddResult/></Authlayout>}/>

             <Route path='attendance' element={<Authlayout><Attendance/></Authlayout>}/>
             <Route path='settings' element={<Authlayout><Setting/></Authlayout>}/>

           <Route path='Exams' element={<Authlayout><AddExam/></Authlayout>} errorElement={<ErrorFallback/>}/>
           <Route path="*"  element={<Notfound/>} />
             </Route>

            <Route path='/login' element={<Authlayout Authentication={false}><LoginPage/></Authlayout>}/>

         
          </Routes>
      </div>
    </>
  );
}

export default App;

import { useEffect } from 'react';
import './App.css';

import { Toaster } from './components/ui/toaster';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthApi } from './services/authapi';
function App() {
  const dispatch= useDispatch()
  const currentuser=async()=>{
    const {currentUser}=useAuthApi()
    const res=await currentUser()
    console.log(res.data)
    if(res.data.success===true){
      dispatch(res.data)
    }
  }
  useEffect(()=>{
currentuser()
  },[])
  return (
    <>
      <div className=" flex justify-center   w-screen min-h-screen">
        <Toaster />

        <Outlet />
      </div>
    </>
  );
}

export default App;

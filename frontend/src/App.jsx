import { useEffect } from 'react';
import './App.css';
import { login } from './store/slice';
import { Toaster } from './components/ui/toaster';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthApi } from './services/authapi';
import Setting from './components/Setting';
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
        <Outlet />
      </div>
    </>
  );
}

export default App;

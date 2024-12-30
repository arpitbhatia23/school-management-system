import './App.css';

import { Toaster } from './components/ui/toaster';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
    <div className=' flex justify-center   w-screen min-h-screen'>
      <Toaster/>
   
      <Outlet/>

    </div>
    </>
  );
}

export default App;

import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { Toaster } from './components/ui/toaster';
function App() {
  return (
    <>
    <div className=' flex justify-center   w-screen min-h-screen'>
      <Toaster/>
    {/* <LoginPage/> */}
    <Dashboard/>

    </div>
    </>
  );
}

export default App;

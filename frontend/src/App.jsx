import './App.css';
import Navbar from '@/components/Navbar';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <>
      <div className=" flex justify-center items-center w-screen  h-screen">
        {/* <Navbar /> */}
        <LoginPage />
      </div>
    </>
  );
}

export default App;

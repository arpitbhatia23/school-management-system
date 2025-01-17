import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, Authentication = true }) {
  console.log("mounted");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const userdata = useSelector((state) => state.auth.userData);
  console.log(userdata);
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);

  useEffect(() => {
    if (Authentication && authStatus !== Authentication) {
      console.log(Authentication && authStatus !== Authentication);
      navigate('/login');
    } else if (!Authentication && authStatus !== Authentication) {
      if (userdata.role === 'admin') {
        navigate("/");
      }
      if (userdata.role === 'student') {
        navigate('/student');
      }
      if (userdata.role === 'teacher') {
        navigate('/teacher');
      }
    }
    setLoader(false);
  }, [authStatus, navigate, Authentication]);

  // Loader Component
  const Loader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );

  return loader ? <Loader /> : <>{children}</>;
}

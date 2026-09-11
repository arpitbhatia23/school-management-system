import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, Authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const { userData, status: authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    // Protected route
    if (Authentication && !authStatus) {
      navigate('/login', { replace: true });
      return;
    }

    // Public route
    if (!Authentication && authStatus) {
      const role = userData?.role;

      if (role === 'admin') {
        navigate('/', { replace: true });
      } else if (role === 'student') {
        navigate('/student', { replace: true });
      } else if (role === 'teacher') {
        navigate('/teacher', { replace: true });
      }

      return;
    }

    setLoader(false);
  }, [authStatus, userData, Authentication, navigate]);

  const Loader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
    </div>
  );

  return loader ? <Loader /> : children;
}

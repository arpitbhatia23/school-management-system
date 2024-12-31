import React from 'react';
import img from '../assets/12.svg';
import Login from '@/components/Login';
const LoginPage = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center  p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          {' '}
          {/* <img src={img} className="h-full  hidden sm:flex  w-[60%] object-cover rounded-[10px] " /> */}
          <Login className={'mx-4'} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

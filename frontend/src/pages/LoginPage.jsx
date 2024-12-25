import React from 'react';
import img from '../assets/12.svg';
import Login from '@/components/Login';
const LoginPage = () => {
  return (
    <>
      <div className="bg-orange-500   flex justify-start items-center  rounded-[10px] h-[80vh] w-[60vw]">
        <img src={img} className="h-full  w-[60%] object-cover " />
        <Login className={"mx-4"}/>
      </div>
    </>
  );
};

export default LoginPage;

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

const Login = ({className}) => {
  return ( 
    <div className={` ${className} flex flex-col  bg-white p-10 rounded-xl gap-y-6 `}>
      <Input
        type="email"
        placeholder="enter your email"/>

      <Input type="password" placeholder="enter your password" className="w-full" />
      <Button>submit</Button>
    </div>
  );
};

export default Login;

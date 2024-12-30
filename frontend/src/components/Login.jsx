import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import img from "../assets/12.svg"
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { useAuthApi } from '@/services/authapi';
import { Card, CardContent } from './ui/card';
import Selectcomp from './Select';

const Login = ({ className },props) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: '',
    },
  });
  const {login}=useAuthApi()
const [loading ,setloading]=useState(false)
  const items=[
    "admin",
    "teacher",
    "student"
  ]
  const onSubmit = async(data) => {
    console.log(data)
    setloading(true)
    const res=await  login(data)
    setloading(false)
    console.log(res?.data)
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card className="overflow-hidden  bg-orange-500">
      <CardContent className="grid p-0 md:grid-cols-2">
      <div className="relative hidden  md:block">
            <img
              src={img}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${className} flex flex-col bg-white p-10 rounded-xl gap-y-4 w-80 m-16`}
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          rules={{required: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          rules={{required:"Password is required "}}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Selector */}
        <FormField
          control={form.control}
          name="role"
          rules={{required:"role is required "}}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Selectcomp selectLable="select role" selectvalue="Role" field={field} selectItems={items} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">{loading?"Submiting...": "submit"}</Button>
      </form>
    </Form>
    


    </CardContent>
    </Card>
    </div>
  );
};

export default Login;
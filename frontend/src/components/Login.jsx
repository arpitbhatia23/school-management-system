import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import img from '../assets/12.svg';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { useAuthApi } from '@/services/authapi';
import { Card, CardContent } from './ui/card';
import Selectcomp from './Select';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { login as AuthLogin } from '@/store/slice';
const Login = ({ className }, props) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: '',
    },
  });
  const { login } = useAuthApi();
  const nav = useNavigate();
  const [loading, setloading] = useState(false);
  const items = ['admin', 'teacher', 'student'];
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);
    setloading(true);
    const res = await login(data);
    console.log(res.data);
    setloading(false);
    if (res.data.success === true) {
      dispatch(AuthLogin(res.data.data.user));
      if (res.data?.data?.user.role === 'admin') {
        nav('/');
        toast({
          title: 'login successfully',
          description: `${res.data.data.user.name} welcome to admin dashboard`,
        });
      }
    } else {
      toast({
        title: res.data?.message || 'Login failed',
        description: `check your info please`,
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden bg-slate-50 border-0 shadow-lg sm:rounded-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden md:flex items-center justify-center bg-orange-500 p-8">
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            <img
              src={img}
              alt="School Management"
              className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-80"
            />
            <div className="relative z-20 text-white text-center">
              <h1 className="text-4xl font-bold mb-4 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-orange-50 text-lg">School Management System</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 md:p-12 bg-white">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-5 w-full max-w-[350px]"
              >
                <div className="text-center mb-4 md:hidden">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Welcome Back
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Please login to continue
                  </p>
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  rules={{
                    required: 'Email is required',
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  }}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-11"
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
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">
                        Account Role
                      </FormLabel>
                      <FormControl>
                        <Selectcomp
                          selectLable="Select your role"
                          selectvalue="Role"
                          field={field}
                          selectItems={items}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 mt-2 bg-orange-600 hover:bg-orange-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

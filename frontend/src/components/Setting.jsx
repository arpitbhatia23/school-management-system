import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardTitle } from './ui/card';
import { useAuthApi } from '@/services/authapi';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import Selectcomp from './Select';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Setting = () => {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const form = useForm({
    defaultValues: {
      name: '',
      gender: '',
      email: '',
      mobile: '',
    },
  });

  const { updateProfile } = useAuthApi();

  const onSubmit = async (data) => {
    const res = await updateProfile(data);

    console.log(res?.data);
    if (res?.data?.success) {
      toast({
        title: 'update successfully',
        description: res?.data?.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.data.message,
      });
    }
  };

  return (
    <>
      <Card className="m-20 ">
        <CardContent className="rounded-t-lg h-44 w-full bg-orange-500 p-0">
          <img
            src="https://cmsv2-assets.apptegy.net/uploads/9636/file/1041950/5a29fe57-06d2-49d0-bd96-64ccde879889.png"
            className="h-44 w-full object-cover rounded-t-lg "
            alt=""
          />
          <Avatar className="rounded-full bg-red-300  ">
            <AvatarImage
              src={userData?.profile_image?.url}
              className="rounded-full h-32 w-32 mx-4 transform -translate-y-16 border-4 border-white"
            />
            <AvatarFallback className="rounded-full h-32 w-32 mx-4 transform translate-y-12">
              cn
            </AvatarFallback>
          </Avatar>
        </CardContent>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-16">
              <CardContent className="flex flex-col item-center">
                <FormField
                  name="name"
                  rules={{ required: 'name is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  rules={{
                    required: 'email is required',
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="mobile"
                  rules={{ required: 'mobile is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>mobile</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter mobile number.."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="gender"
                  rules={{ required: 'gender is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Selectcomp
                          selectLable="select gender"
                          selectvalue="Gender"
                          selectItems={['male', 'female', 'other']}
                          field={{ ...field }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex  justify-center">
                  <button
                    type="submit"
                    className="bg-orange-600 p-2 text-white  m-4 w-28 "
                  >
                    Update
                  </button>
                </div>
              </CardContent>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default Setting;

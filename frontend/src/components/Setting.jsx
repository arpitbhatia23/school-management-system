import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardTitle } from './ui/card';
import { useAuthApi } from '@/services/authapi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import Selectcomp from './Select';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
const Setting = () => {
  const {image}= useState();
  const userData = useSelector(state=>
    state.auth.userData
  )
  console.log(userData)
  const form = useForm({
    defaultValues:{
      name:"",
      gender:"",
      email:"",
      mobile:""
      }
    });
    const {update} = useAuthApi();
    
    
    const onSubmit = async (data) => {
      const formData = new FormData();
      console.log(data)
      // 
      Object.keys(data).forEach((key)=>{
        formData.append(key,data[key]);
      })
      const res = await update(data);

      console.log(response?.data);
      if(res?.data?.statusCode ===201){
        toast({
          title:'update successfully',
          description:res?.data?.message
        })
      }else{
        toast({
          variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.data.message,
      });
        
      }};
    
  return (
    <>
    <Card className="m-20 ">
      <Card className="bg-blue-600 rounded-t-lg h-44 w-full py-10">
         <Avatar className='rounded-full bg-red-300'>
          <AvatarImage
          src={userData?.profile_image?.url}
          className='rounded-full'
          />
          <AvatarFallback>cn</AvatarFallback>

         </Avatar>
      </Card>
      <CardContent>
        {/* <CardTitle className="py-4">
          update profile
        </CardTitle> */}
        <Form {...form}>
<form
onSubmit={form.handleSubmit(onSubmit)}
 className='py-10'>
<CardContent className='flex flex-col item-center'>
  <FormField
  name= "name"
  rules={{required :"name is required"}}
  control={form.control}
  render={({field})=>(
    <FormItem >
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input
        type= "text"
        placeholder="Enter your name..."
        {...field}
        />
      </FormControl>
      <FormMessage/>
    </FormItem>
  )}/>
  <FormField
  name="email"
  rules={{
    required:"email is required",
    pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }}
  control={form.control}
  render={({field})=>(
    <FormItem >
      <FormLabel>Email</FormLabel>
      <FormControl>
    <Input
    type="email"
    placeholder="enter email address"
    {...field}
    />
      </FormControl>
      <FormMessage/>
    </FormItem>
  )}
    />
    <FormField
    name="mobile"
    rules ={{required:"mobile is required"}}
    control ={form.control}
    render={({field})=>(
      <FormItem >
        <FormLabel>mobile</FormLabel>
        <FormControl>
          <Input
          type="tel"
          placeholder="enter mobile number.."
          {...field}/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    )}
    />
    <FormField
    name="gender"
    rules ={{required :"gender is required"}}
    control={form.control}
    render={({field})=>(
      <FormItem >
        <FormLabel>gender</FormLabel>
        <FormControl>
          <Selectcomp
          selectLable="gender"
          selectItems={["male","female","other"]}
          field={field}/>
        </FormControl>
        <FormMessage/>
      </FormItem>    )}
    />
    <div className='flex  justify-center'>
    <button
                      type="submit"
                      className="bg-orange-500 p-2 text-white  m-4 w-28 "
                    >Update</button>
    </div>
</CardContent>

</form>
        </Form>
      </CardContent>
    </Card>
    
      
    </>
  )
}

export default Setting

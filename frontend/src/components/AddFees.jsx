import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from './ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import Selectcomp from './Select';
import { adminApi } from '@/services/adminapi';
import { toast } from '@/hooks/use-toast';

const AddFees = () => {
    const [loading,setloading]=useState(false)
    const form = useForm({
        defaultValues:{
            name:"",
            className:'',
            rollno:'',
            amount:'',
            status:'',
            payment_method:''
        }
    })
const {fees} = adminApi()
    const onSubmit = async(data)=>{
setloading(true)
const res = await fees(data)
setloading(false)
console.log(res)
if(res?.data?.success){
    toast({
        title:'fees added',
        discription:res.data?.message
    })
}else{
    toast({
        variant:'destructive',
        title:'something went wrong',
        description:res.data?.message
    })
}
    }
  return (
    <>
      <Card className=" m-2 sm:m-20 py-0">
      <CardContent>
      <CardTitle className='py-8'>Add Fees</CardTitle>

        <Form {...form} className="m-10">
          <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='m-'>

          <CardContent className="grid  grid-cols-2 sm:grid-cols-4 gap-4">
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
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              name="roll_no"
              rules={{ required: 'roll no is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll No</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Roll No"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name="className"
              rules={{ required: 'class is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              rules={{ required: 'status is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Selectcomp
                      selectLable="Select status"
                      selectvalue="Select status"
                      selectItems={['paid', 'unpaid', 'pending']}
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              rules={{ required: 'amount is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="payment_method"
              rules={{ required: 'method is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter payment method"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            
            
       
          </CardContent>
          <div className=' m-auto flex justify-center items-center gap-4 '>
              <button
              type='submit'
              className='text-white bg-orange-500 w-40 h-10 '
>
{loading ? 'Submitting...' : 'Submit'}{' '}

              </button>
              <button
              type='submit'
              className='text-white bg-green-500 w-40 h-10'
              onClick={()=>{
                form.reset()
              }}>Reset</button>
            </div>
          </form> 
        </Form>
      </CardContent>
    </Card>
    </>
  )
}

export default AddFees

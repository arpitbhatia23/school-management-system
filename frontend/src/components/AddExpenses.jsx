import React, { useState } from 'react';
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

const AddExpenses = () => {
  const [loading,setloading]=useState(false)
  const form = useForm({
    defaultValues: {
      name: '',
      expense_type: '',
      status: '',
      amount: '',
      due_date: '',
      email: '',
      phone: '',
    },
  });
  const { addExpense} = adminApi();
const onSubmit = async(data)=>{
  setloading(true)
const res = await addExpense(data)
setloading(false)
console.log(res)
if(res?.data?.success){
  toast({ title:'✅expenses added', description :res.data?.message})
}else{
  toast({
    variant:"destructive",
    title:'something went wrong.....🧐🧐',
    description:res.data?.message
  })
}

}
  return (
    <>
    <Card className='m-20'>
      <CardContent className="">
      <CardTitle className='py-4'>add new expense</CardTitle>

        <Form {...form} className="">
          <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=''>

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
              name="expense_type"
              rules={{ required: 'expense type is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Type</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter expense type"
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
              name="due_date"
              rules={{ required: 'due date is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter due date"
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
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              rules={{ required: 'phone number is required' }}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <br />
            <div className=' m-auto flex justify-center items-center gap-4 '>
              <button
              type='submit'
              className='bg-orange-500 w-40 h-10 '
>
{loading ? 'Submitting...' : 'Submit'}{' '}

              </button>
              <button
              type='submit'
              className='bg-green-500 w-40 h-10'
              onClick={()=>{
                form.reset()
              }}>Reset</button>
            </div>
          </CardContent>
          </form> 
        </Form>
      </CardContent>
    </Card>
    </>
  );
};

export default AddExpenses;

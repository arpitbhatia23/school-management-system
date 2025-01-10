import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { adminApi } from '@/services/adminapi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { toast } from '@/hooks/use-toast';

const GetFees = () => {
  const form = useForm({
    defaultValues: {
      className: '',
      name: '',
      roll_no: '',
    },
  });
  const [data, setdata] = useState([]);
  const { getFees } = adminApi();
  const submit = async (data) => {
    console.log(data);
    const res = await getFees(data);
    if (res?.data?.success) {
      setdata(res.data.data);
      toast({
        title: 'Success',
        description: res.data?.message,
        status: 'success',
      });
    } else {
      toast({
        title: 'Error',
        description: res.data?.message,
        status: 'error',
        variant: 'destructive',
      });
    }
  };
  return (
    <>
      <Card className="m-20">
        <CardContent>
          <CardTitle className ="m-4">GET FEES</CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <CardDescription className="grid grid-cols-4 gap-4"> 
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="className"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter class..... "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="roll_no"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter rollno"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </CardDescription>
            </form>
          </Form>
        </CardContent>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Roll no</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 &&
                  data.map((item) => (
                    <>
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.className}</TableCell>
                      <TableCell>{item.roll_no}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.payment_method}</TableCell>
              </TableRow>
                    </>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default GetFees;

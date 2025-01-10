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
import PaginationComponent from './paginationcomp';

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
  const [currentPage, setcurrentpages] = useState(1);
  const rows = 10;
  const totalpages = Math.ceil(data?.length / rows);
  const handelpagination = (newpage) => {
    setcurrentpages(newpage);
  };
  const pagination = data.slice((currentPage - 1) * rows, currentPage * rows);
  return (
    <>
      <Card className="m-20">
        <CardContent>
          <CardTitle className="m-4">GET FEES</CardTitle>
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
              {pagination.length > 0 &&
                pagination.map((item) => (
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
          {data?.length > 0 && (
            <PaginationComponent
              onPageChange={handelpagination}
              totalPages={totalpages}
              currentPage={currentPage}
            />
          )}{' '}
        </CardContent>
      </Card>
    </>
  );
};

export default GetFees;

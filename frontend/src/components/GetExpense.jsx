import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input'; // Ensure this is the correct path for your Input component
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

const GetExpense = () => {
  const [data, setdata] = useState();
  const form = useForm({
    defaultValues: {
      name: '',
      status: '',
      expense_type: '',
    },
  });
  const { getExpenses } = adminApi();
  const onSubmit = async (data) => {
    const res = await getExpenses(data);
    if (res.data.success) {
      setdata(res.data.data);
      toast({
        title: 'success',
        description: 'expenses get successfully',
      });
    } else {
      toast({
        title: 'failed',
        description: res.data.message,
      });
    }
  };
  const [currentPage, setcurrentpages] = useState(1);
  const rows = 10;
  const totalpages = Math.ceil(data?.length / rows);
  const handelpagination = (newpage) => {
    setcurrentpages(newpage);
  };
  const pagination = data?.slice((currentPage - 1) * rows, currentPage * rows);
  return (
    <Card className="m-20">
      <CardTitle className="m-4">Get Expense</CardTitle>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name Field */}
            <CardDescription className="grid grid-cols-4 gap-4 items-center justify-items-center">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Field */}
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Status" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expense Type Field */}
              <FormField
                name="expense_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense_type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Expense Type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="btn btn-primary mt-4">
                Submit
              </Button>
            </CardDescription>
          </form>
        </Form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expense_type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due_date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination?.length > 0 &&
              pagination.map((item) => (
                <>
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.expense_type}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.due_date}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
};

export default GetExpense;

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { studentapi } from '@/services/student';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Pagination } from '../ui/pagination';
import PaginationComponent from '../paginationcomp';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

const StAttendance = () => {
  const { getMonthlyAttendance } = studentapi();
  const [attendance, setattendance] = useState();
  const fetchattendance = async (data) => {
    console.log(data);
    const res = await getMonthlyAttendance(
      data || {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      },
    );
    console.log(res.data);
    if (res.data.success) {
      setattendance(res.data.data);
      toast({ title: 'success', description: 'attendance fetch sucessfully' });
    } else {
      toast({
        title: 'failed',
        description: res?.data?.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchattendance();
  }, []);
  const [currentPage, setcurrentpages] = useState(1);
  const rows = 10;
  const totalpages = Math.ceil(attendance?.length / rows);
  const handelpagination = (newpage) => {
    setcurrentpages(newpage);
  };
  const pagination = attendance?.slice(
    (currentPage - 1) * rows,
    currentPage * rows,
  );
  const from = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
    },
  });
  return (
    <div>
      <Card className="m-20">
        <Form {...from}>
          <form onSubmit={from.handleSubmit(fetchattendance)}>
            <CardContent className="grid grid-cols-3 gap-6 p-8">
              <FormField
                name="startDate"
                control={from.control}
                rules={{ required: 'start date is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter start date"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="endDate"
                control={from.control}
                rules={{ required: 'end date is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter end date"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">submit</Button>
            </CardContent>
          </form>
        </Form>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Roll no</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination?.length > 0 &&
                pagination.map((item) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.className}</TableCell>
                    <TableCell>{item.roll_no}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{new Date(item.Date).toDateString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        {pagination?.length > 0 && (
          <PaginationComponent
            onPageChange={handelpagination}
            totalPages={totalpages}
            currentPage={currentPage}
          />
        )}
      </Card>
    </div>
  );
};

export default StAttendance;

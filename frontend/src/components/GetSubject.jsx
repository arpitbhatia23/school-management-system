import { toast } from '@/hooks/use-toast';
import { adminApi } from '@/services/adminapi';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import PaginationComponent from './paginationcomp';

const GetSubject = () => {
  const [data, setdata] = useState();
  const form = useForm({
    defaultValues: {
      subject_name: '',
      className: '',
      days: '',
      time: '',
      teacher_name: '',
    },
  });
  const { getSubject } = adminApi();
  const onSubmit = async (data) => {
    const res = await getSubject(data);
    if (res.data.success) {
      setdata(res.data.data);
      toast({
        title: 'Success',
        description: 'Subject fetch Successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: res.data.message,
      });
    }
  };
  const [currentpages,setcurrentpages]=useState(1)
  const rows=10
  const totalpages=Math.ceil(data?.length/rows)
  const pagination=data?.slice((currentpages-1)*rows,currentpages*rows)
  const handelpagination=(newpage)=>{
setcurrentpages(newpage)
  }
  return (
    <>
      <Card className="m-20">
        <CardTitle className="m-4"><h2>Subjects</h2></CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardDescription className="grid  grid-cols-2 sm:grid-cols-4 gap-4">
                <FormField
                  name="className"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      {' '}
                      <FormItem>
                        <FormLabel></FormLabel>
                        Class
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Class....."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  name="subject_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Subject Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="my-6">Submit</Button>
              </CardDescription>
            </form>
          </Form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>teacher_name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination?.length > 0 &&
                pagination.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.subject_name}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.days}</TableCell>
                    <TableCell>{item.teacher_name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {
            data?.length>0&&
          <PaginationComponent totalPages={totalpages} currentPage={currentpages} onPageChange={handelpagination}/>
   }     </CardContent>
      </Card>
    </>
  );
};

export default GetSubject;
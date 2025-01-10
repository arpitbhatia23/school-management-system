import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { adminApi } from '@/services/adminapi';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import PaginationComponent from './paginationcomp';

const GetParents = () => {
  const form = useForm({
    defaultValues: {
      className: '',
      name: '',
    },
  });
  const [data, setdata] = useState([]);
  const { getParents } = adminApi();
  const onsumbit = async (data) => {
    console.log(data);
    const res = await getParents(data);
    if (res?.data?.success) {
      setdata(res.data.data);
      toast({
        title: 'successfull ',
        description: 'parents fecth sucessfully',
      });
    } else {
      toast({
        title: 'failed ',
        description: res.data.message,
      });
    }
  };

  console.log(data);

  const [currentpage,setcurrentpages]=useState(1)
  const rows=10
  const totalpages=Math.ceil(data.length/rows)

  const handelpagination=(newpages)=>{
  setcurrentpages(newpages)
  }
  const pagination=data?.slice((currentpage-1)*rows,currentpage*rows)

  return (
    <div>
      <Card className="m-2 sm:m-20 py-10 min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsumbit)}>
            <CardContent className="grid grid-cols-3 gap-x-16 items-center">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="enter the name of student "
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
                        {...field}
                        placeholder="enter the class of students"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="sbumit" className="my-10">
                submit
              </Button>
            </CardContent>
          </form>
        </Form>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FATHER NAME</TableHead>
                <TableHead>MOTHER NAME</TableHead>
                <TableHead>FATHER OCUUPATION</TableHead>
                <TableHead>PARENTS EMAIL</TableHead>
                <TableHead>PARENTS CONTACT</TableHead>
              </TableRow>
            </TableHeader>
            {pagination?.map((data) => (
              <TableBody key={data?.father_name}>
                <TableRow >
                  <TableCell>{data?.father_name}</TableCell>
                  <TableCell>{data?.mother_name}</TableCell>
                  <TableCell>{data?.father_occupation}</TableCell>
                  <TableCell>{data?.parents_email}</TableCell>
                  <TableCell>{data?.parents_phone}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {  data?.length>0&&     
 <PaginationComponent onPageChange={handelpagination} totalPages={totalpages} currentPage={currentPage}/>
}        </CardContent>
      </Card>

    </div>
  );
};

export default GetParents;

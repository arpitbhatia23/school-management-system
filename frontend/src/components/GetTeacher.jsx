import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { adminApi } from '@/services/adminapi';
import { Button } from './ui/button';
import DataTable from './DataTable';
import { toast } from '@/hooks/use-toast';

const Getteacher = () => {
  const form = useForm({
    defaultValues: {
      class_incharge: '',
      name: '',
    },
  });
  const [data, setdata] = useState([]);
  const { getTeachers } = adminApi();
  const onsumbit = async (data) => {
    console.log(data);
    const res = await getTeachers(data);
    if (res?.data?.success) {
      console.log(res.data)
      const newdata = res?.data?.data?.map((item) => {
        const { name, gender, _id,email,phone_no } = item;
        const {  class_incharge, address, nationality,DOB } = item.profile;
      
        return {
          _id,
          name,
          gender,
          class_incharge,
          address,
          nationality,
          email,
          phone_no,
          DOB
        };
      });

      setdata(newdata);

      toast({
        title: 'successfull ',
        description: 'teacher fecth sucessfully',
      });
    } else {
      toast({
        title: 'failed ',
        description: res.data.message,
        variant: 'destructive',

      });
    }
  };

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
                name="class_incharge"
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
          {data?.length > 0 ? (
            <DataTable
              data={data}
              tablecaption="teacher data"
              onUpdateData={setdata}
              type="teacher"
            />
          ) : (
            <CardTitle className="text-center">data not found</CardTitle>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Getteacher;

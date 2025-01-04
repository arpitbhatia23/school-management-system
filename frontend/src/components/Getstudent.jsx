import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { adminApi } from '@/services/adminapi';
import { Button } from './ui/button';
import DataTable from './DataTable';
import { toast } from '@/hooks/use-toast';

const Getstudent = () => {
  const form = useForm({
    defaultValues: {
      className: '',
      name: '',
    },
  });
  const [data, setdata] = useState([]);
  const { students } = adminApi();
  const onsumbit = async (data) => {
    console.log(data);
    const res = await students(data);
    if(res?.data?.success){

      const newdata =res?.data?.data?.map((item) => {
        const { name, gender, _id } = item;
        const { roll_no, className, address, nationality } = item.profile;
        const { father_name, parents_contact, parents_email } = item.parents_Detail;
        return {
          _id,
          name,
          gender,
          roll_no,
          className,
          parents_email,
          father_name,
          parents_contact,
          address,
          nationality,
        };

      });  
      
      setdata(newdata)

      toast({
      title:"successfull ",
      description:"student fecth sucessfully"
    })

  }else{
    toast({
      title:"failed ",
      description:res.data.message
    })
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
          {data?.length>0?<DataTable data={data} tablecaption="Students data"  onUpdateData={setdata}/>:<CardTitle className ="text-center">data not found</CardTitle>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Getstudent;

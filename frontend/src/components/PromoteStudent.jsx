import React from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { adminApi } from '@/services/adminapi';
import { toast } from '@/hooks/use-toast';
const PromoteStudent = () => {
  const { promoteStudent } = adminApi();
  const form = useForm({
    defaultValues: {
      name: '',
      currentClass: '',
      newClass: '',
      phone_no: '',
    },
  });
  const onSubmit = async (student) => {
    const res = await promoteStudent(student);
    if (res.data.success) {
      toast({
        title: 'Student Promoted',
        description: 'Student has been promoted successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: res?.data?.message || 'Student has not been promoted',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <Card className="m-20 p-8">
        <CardTitle className="p-4 text-center">PROMOTE STUDENT</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-4 gap-4">
              <FormField
                name="name"
                control={form.control}
                rules={{ required: 'name is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter the name of student"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="currentClass"
                control={form.control}
                rules={{ required: 'currentClass is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter the currentClass of student"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="newClass"
                control={form.control}
                rules={{ required: 'newClass is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter the newClass of student"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="phone_no"
                control={form.control}
                rules={{ required: 'Phone_no is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="enter the phone_no of student"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent className="flex justify-center">
              <Button type="submit">Promote</Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default PromoteStudent;

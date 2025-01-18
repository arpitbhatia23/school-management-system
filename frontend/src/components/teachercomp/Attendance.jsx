import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { teacherapi } from '@/services/teacherapi';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Button } from '../ui/button';

const Attendance = () => {
  const { getStudents, attendance } = teacherapi();
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      if (res.data.success) {
        setStudents(res.data.data);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const form = useForm({
    defaultValues: {
      attendance: students.map((student) => ({
        student_id: student._id,
        date: new Date().toLocaleDateString(),
        student_name: student.name,
        student_class: student.className,
        student_roll_no: student.roll_no,
        student_status: '',
      })),
    },
  });

  const { handleSubmit, control, setValue } = form;

  useEffect(() => {
    // Update form's default values when students are fetched
    form.reset({
      attendance: students.map((student) => ({
        student_id: student._id,
        student_name: student.name,
        student_roll_no: student.roll_no,
        student_class: student.className,
        date: new Date().toLocaleDateString(),
        student_status: '',
      })),
    });
  }, [students]);

  const onSubmit = async (data) => {
    const res = await attendance(data);
    if (res.data.success) {
      toast({ title: 'success', description: 'attendance added succesfully' });
    } else {
      toast({ title: 'failed', description: 'something went wrong' });
    }
    console.log('Attendance Data Submitted:', data);
  };

  return (
    <div>
      <Card className="m-20">
        <CardTitle className="m-4">Attendance</CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student roll_no</TableHead>
                    <TableHead>Student class</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students?.length > 0 ? (
                    students.map((student, index) => (
                      <TableRow key={student._id}>
                        <TableCell>
                          <FormField
                            name={`attendance[${index}].student_id`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    readOnly
                                    value={student._id} // Use student._id directly
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            name={`attendance[${index}].student_name`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    readOnly
                                    value={student.name}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            name={`attendance[${index}].student_roll_no`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    readOnly
                                    value={student.roll_no}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            name={`attendance[${index}].student_class`}
                            control={control}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    readOnly
                                    value={student.className}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            name={`attendance[${index}].date`}
                            control={control}
                            rules={{required:"date is required"}}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    value={new Date().toLocaleDateString()} // Use date dynamically
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            name={`attendance[${index}].student_status`}
                            control={control}
                            rules={{required:"status required"}}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-1">
                                      <Checkbox
                                        id={`present-${student._id}`}
                                        onCheckedChange={(checked) =>
                                          setValue(
                                            `attendance[${index}].student_status`,
                                            checked ? 'present' : '',
                                          )
                                        }
                                        checked={field.value === 'present'}
                                      />
                                      Present
                                    </label>
                                    <label className="flex items-center gap-1">
                                      <Checkbox
                                        id={`absent-${student._id}`}
                                        onCheckedChange={(checked) =>
                                          setValue(
                                            `attendance[${index}].student_status`,
                                            checked ? 'absent' : '',
                                          )
                                        }
                                        checked={field.value === 'absent'}
                                      />
                                      Absent
                                    </label>
                                    <label className="flex items-center gap-1">
                                      <Checkbox
                                        id={`leave-${student._id}`}
                                        onCheckedChange={(checked) =>
                                          setValue(
                                            `attendance[${index}].student_status`,
                                            checked ? 'leave' : '',
                                          )
                                        }
                                        checked={field.value === 'leave'}
                                      />
                                      Leave
                                    </label>
                                  </div>
                                </FormControl>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="4" className="text-center">
                        No students available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Button type="submit" className="btn btn-primary mt-4">
                Submit Attendance
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;

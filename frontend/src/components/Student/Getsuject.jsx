import { studentapi } from '@/services/student';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const Getsubject = () => {
  const { getsubject } = studentapi();
  const [data, setdata] = useState();
  const fetchsubject = async () => {
    const res = await getsubject();
    console.log(res.data);
    if (res.data.success) {
      setdata(res.data.data);
    }
  };

  useEffect(() => {
    fetchsubject();
  }, []);
  console.log(data);
  return (
    <div>
      <Card className="m-20">
        <CardContent className="">
          <CardDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>subject_name</TableHead>
                  <TableHead>class</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>teacher</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length &&
                  data.map((data) => (
                    <>
                      <TableRow key={data._id}>
                        <TableCell>{data.subject_name}</TableCell>
                        <TableCell>{data.class}</TableCell>
                        <TableCell>{data.days}</TableCell>
                        <TableCell>{data.time}</TableCell>
                        <TableCell>{data.teacher_name}</TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Getsubject;

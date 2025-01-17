import React, { useEffect, useState } from 'react';
import { Card, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { studentapi } from '@/services/student';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';

const StResult = () => {
  const [data, setdata] = useState();
  const { result } = studentapi();
  const userData = useSelector((state) => state.auth.userData);
  const fetchData = async (data) => {
    const res = await result(data);
    console.log(res.data);
    if (res.data.data) {
      setdata(res.data.data);
      toast({
        title: 'result fetch successfully',
        description: res.data?.message,
      });
    } else {
      toast({
        title: 'error',
        variant: 'destructive',
        description: rs.data?.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card className="m-20 px-6">
        <CardTitle className="py-4 text-orange-600"> Result</CardTitle>

        <div className=" flex justify-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Term</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.examtype}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.roll_no}</TableCell>

                    <TableCell>
                      <a
                        href={item.pdf}
                        target="_blank"
                        download={item.pdf}
                        className="text-bold text-blue-600"
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default StResult;

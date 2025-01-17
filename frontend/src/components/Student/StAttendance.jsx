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

const StAttendance = () => {
  const { getMonthlyAttendance } = studentapi();
  const [attendance, setattendance] = useState();
  const fetchattendance = async () => {
    const res = await getMonthlyAttendance({
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });
    console.log(res.data);
    if (res.data.success) {
      setattendance(res.data.data);
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
  return (
    <div>
      <Card className="m-20">
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
              {attendance?.length > 0 &&
                attendance.map((item) => (
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
        {attendance?.length > 0 && (
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

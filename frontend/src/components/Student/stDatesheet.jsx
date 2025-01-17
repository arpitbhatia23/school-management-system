import React, { useState } from 'react';
import { Card, CardTitle } from '../ui/card';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';
import { studentapi } from '@/services/student';

const stDatesheet = () => {
  const { getExam } = studentapi();
  const [data, setdata] = useState();

  return (
    <>
      <Card className="m-20">
        <CardTitle>Datesheet</CardTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.no</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Timming</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </Card>
    </>
  );
};

export default stDatesheet;

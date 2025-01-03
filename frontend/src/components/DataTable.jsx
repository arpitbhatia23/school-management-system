import React, { useCallback, useMemo, useState } from 'react';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from './ui/table';
import { getHeaders } from '@/utils/getheader';
import { Popover } from './ui/popover';
import { PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { adminApi } from '@/services/adminapi';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';

const DataTable = React.memo(function({ data, tablecaption = "table" })  {
  const tableheader = getHeaders(data);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { studentsById } = adminApi();

  const handleRowClick =useCallback( async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedStudent(null)
      const response = await studentsById(id);
      setSelectedStudent(response?.data?.data?.[0] || null);
    } catch (err) {
      console.error("Failed to fetch student details:", err);
      setError("Unable to fetch student details. Please try again later.");
    } finally {
      setLoading(false);
    }
  },[selectedStudent])

  return (
    <div>
      <Table>
        <TableCaption>{tablecaption}</TableCaption>
        <TableHeader>
          <TableRow>
            {tableheader?.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <Popover key={row._id}>
              <PopoverTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(row._id)}
                >
                  {tableheader?.map((header) => {
                    const keys = header.split(".");
                    let value = row;
                    keys.forEach((key) => {
                      value = value ? value[key] : null;
                    });
                    return <TableCell key={header}>{value || "-"}</TableCell>;
                  })}
                </TableRow>
              </PopoverTrigger>
              <PopoverContent className="p-4 my-12">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : selectedStudent ? (
                  <Card className="w-[450px]">
                    <CardContent className="flex flex-col items-center gap-4">
                      <CardTitle className="p-4">Student Details</CardTitle>
                      <img
                        src={selectedStudent?.profile_image?.image_url}
                        alt="Profile"
                        className="rounded-full h-24 w-24"
                      />
                      <CardDescription className="flex flex-col gap-4">
                        <div className="">
                          <strong>Name:</strong> {String(selectedStudent.name).toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Gender:</strong> {String(selectedStudent.gender).toUpperCase()}
                        </div>
                        <div className="">
                          <strong>DOB:</strong> {String(selectedStudent?.profile?.DOB).toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Roll No:</strong> {String(selectedStudent?.profile?.roll_no).toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Parent's Contact:</strong>{" "}
                          {String(selectedStudent?.parents_Detail?.parents_contact || "N/A").toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Parent's Email:</strong>{" "}
                          {String(selectedStudent?.parents_Detail?.parents_email || "N/A").toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Father's Occupation:</strong>{" "}
                          {String(selectedStudent?.parents_Detail?.father_occupation || "N/A").toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Father's Name:</strong>{" "}
                          {String(selectedStudent?.parents_Detail?.father_name || "N/A").toUpperCase()}
                        </div>
                        <div className="">
                          <strong>Mother's Name:</strong>{" "}
                          {String(selectedStudent?.parents_Detail?.mother_name || "N/A").toUpperCase()}
                        </div>
                      </CardDescription>
                    </CardContent>
                  </Card>
                ) : (
                  <p>No student details available.</p>
                )}
              </PopoverContent>
            </Popover>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default DataTable;

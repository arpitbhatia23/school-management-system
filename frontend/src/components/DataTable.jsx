import React, { useCallback, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from './ui/table';
import { getHeaders } from '@/utils/getheader';
import { adminApi } from '@/services/adminapi';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { DialogTrigger, Dialog, DialogFooter } from './ui/dialog';
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

const DataTable = React.memo(function ({ data, tablecaption = 'table', onUpdateData }) {
  const tableheader = getHeaders(data);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { studentsById, deleteuser } = adminApi();

  const handleRowClick = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        setSelectedStudent(null);
        const response = await studentsById(id);
        setSelectedStudent(response?.data?.data?.[0] || null);
      } catch (err) {
        console.error('Failed to fetch student details:', err);
        setError('Unable to fetch student details. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleDeleteStudent = async (id, event) => {
    event.stopPropagation();
    try {
      const res = await deleteuser({ id });
      if (res.data.success) {
        toast({
          title: 'Deleted',
          description: 'User deleted successfully',
        });

        onUpdateData((prevData) => prevData.filter((student) => student._id !== id));
        setSelectedStudent(null);
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong',
        });
      }
    } catch (err) {
      console.error('Failed to delete student:', err);
      toast({
        title: 'Error',
        description: 'Unable to delete student. Please try again later.',
      });
    }
  };

  return (
    <div>
      <Table className="">
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
            <Dialog key={row._id}>
              <DialogTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(row._id);
                  }}
                >
                  {tableheader?.map((header) => {
                    const keys = header.split('.');
                    let value = row;
                    keys.forEach((key) => {
                      value = value ? value[key] : null;
                    });
                    return <TableCell key={header}>{value || '-'}</TableCell>;
                  })}
                </TableRow>
              </DialogTrigger>
              <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-md z-50 min-w-96 min-h-96">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : selectedStudent ? (
                  <>
                    <DialogTitle className="font-semibold m-4 text-center">Details</DialogTitle>
                    <img
                      src={selectedStudent?.profile_image?.image_url}
                      alt="Profile"
                      className="rounded-full h-24 w-24 mx-auto"
                    />
                    <DialogDescription className="grid grid-cols-2 gap-x-4 gap-y-2 items-center justify-items-start mt-4">
                      <div>
                        <strong>Name:</strong> {String(selectedStudent?.name)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Gender:</strong> {String(selectedStudent?.gender)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Address:</strong> {String(selectedStudent?.profile?.address)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Blood_group:</strong> {String(selectedStudent?.profile?.bloodGroup)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Roll no:</strong> {String(selectedStudent?.profile?.roll_no)?.toUpperCase()}
                      </div><div>
                        <strong>Parents_contact:</strong> {String(selectedStudent?.parents_Detail?.parents_contact)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Categroy:</strong> {String(selectedStudent?.profile?.category)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Religion:</strong> {String(selectedStudent?.profile?.religion)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Father's name:</strong> {String(selectedStudent?.parents_Detail?.father_name)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Mother's name:</strong> {String(selectedStudent?.parents_Detail?.mother_name)?.toUpperCase()}
                      </div>
                      <div>
                        <strong>Father's occupation:</strong> {String(selectedStudent?.parents_Detail?.father_occupation)?.toUpperCase()}
                      </div><div>
                        <strong>Nationality:</strong> {String(selectedStudent?.profile?.nationality)?.toUpperCase()}
                      </div>
                    </DialogDescription>
                    <DialogFooter className='mt-6'>
                      <DialogClose className='mx-4' >
                        <Button>cancel</Button></DialogClose>
                      <Button
                        className="bg-red-500"
                        onClick={(e) => handleDeleteStudent(selectedStudent._id, e)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <p>No student details available.</p>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default DataTable;

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
import {
  DialogTrigger,
  Dialog,
  DialogFooter,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

const DataTable = React.memo(function ({
  data,
  tablecaption = 'table',
  onUpdateData,
  type = 'student',
}) {
  const tableheader = getHeaders(data);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { studentsById, deleteuser, getTeacherById } = adminApi();

  const handleRowClick = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedStudent(null);
      const apical = type === 'student' ? studentsById : getTeacherById;
      const response = await apical(type === 'student' ? id : { id });
      console.log(response.data);
      setSelectedStudent(
        type === 'student'
          ? response?.data?.data?.[0]
          : response?.data?.data || null,
      );
    } catch (err) {
      console.error('Failed to fetch student details:', err);
      setError('Unable to fetch student details. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteStudent = async (id, event) => {
    event.stopPropagation();
    try {
      const res = await deleteuser({ id });
      if (res.data.success) {
        toast({
          title: 'Deleted',
          description: `${type === 'teacher' ? 'Teacher' : 'Student'} deleted successfully`,
        });

        onUpdateData((prevData) =>
          prevData.filter((student) => student._id !== id),
        );
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
  console.log(selectedStudent);
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
                    <DialogTitle className="font-semibold m-4 text-center">
                      {type === 'teacher'
                        ? 'Teacher Details'
                        : 'Student Details'}
                    </DialogTitle>
                    <img
                      src={
                        type === 'student'
                          ? selectedStudent?.profile_image?.image_url
                          : selectedStudent?.profile_image?.url
                      }
                      alt="Profile"
                      className="rounded-full h-24 w-24 mx-auto"
                    />
                    <DialogDescription className="grid grid-cols-2 gap-x-4 gap-y-2 items-center justify-items-start mt-4">
                      {/* Render fields dynamically */}
                      {type === 'student'
                        ? Object.entries(
                            {    
                              ...selectedStudent?.profile,
                              ...selectedStudent?.parents_Detail,
                            } || {},
                          ).map(([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong>{' '}
                              {String(value).toUpperCase()}
                            </div>
                          ))
                        : Object.entries(selectedStudent?.profile || {}).map(
                            ([key, value]) => {
                              // Check if the key is "admission date" or similar
                              const isDateField =
                                key.includes('admission_Date');
                              const formattedValue =
                                isDateField && value
                                  ? new Date(value).toLocaleDateString(
                                      'en-US',
                                      {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                      },
                                    ) // Format the date
                                  : String(value).toUpperCase(); // Default for other fields

                              return (
                                <div key={key}>
                                  <strong>{key}:</strong> {formattedValue}
                                </div>
                              );
                            },
                          )}
                    </DialogDescription>
                    <DialogFooter className="mt-6 flex items-center">
                      <DialogClose className="mx-4">
                        <Button>cancel</Button>
                      </DialogClose>
                      <Button
                        className="bg-red-500"
                        onClick={(e) =>
                          handleDeleteStudent(selectedStudent._id, e)
                        }
                      >
                        Delete
                      </Button>
                                             
                       
                    </DialogFooter>
                  </>
                ) : (
                  <p>
                    No {type === 'student' ? 'student' : 'teacher'} details
                    available.
                  </p>
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

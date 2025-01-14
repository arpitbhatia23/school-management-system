import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { teacherapi } from '@/services/teacherapi';
import { toast } from '@/hooks/use-toast';
import { useDropzone } from 'react-dropzone';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const AddResult = () => {
    const [loading, setLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const form = useForm({
        defaultValues: {
            student_id: '',
            name: '',
            roll_no: '',
            examtype: '',
          pdf:''
        },
    });

    const { result } = teacherapi();

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0 && acceptedFiles[0].type === 'application/pdf') {
            setPdfFile(acceptedFiles[0]);
        } else {
            toast({
                title: 'Invalid File',
                variant: 'destructive',
                description: 'Please upload a valid PDF file.',
            });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
    });

    const onSubmit = async (data) => {
        if (!pdfFile) {
            toast({
                title: 'File Missing',
                variant: 'destructive',
                description: 'Please upload a PDF file.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('student_id', data.student_id);
        formData.append('name', data.name);
        formData.append('roll_no', data.roll_no);
        formData.append('examtype', data.examtype);
        formData.append('file', pdfFile);

        setLoading(true);
        try {
            const res = await result(formData);
            if (res?.data?.success) {
                toast({
                    title: 'Result Added',
                    description: 'Result added successfully.',
                });
                form.reset();
                setPdfFile(null);
            } else {
                throw new Error(res?.data?.message || 'An error occurred');
            }
        } catch (error) {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        form.reset();
        setPdfFile(null);
    };

    return (
        <>
            <Card className="m-20 p-4">
              <div className='flex justify-center my-4 text-orange-700'><CardTitle>Add Result</CardTitle>
              </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className=" grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <FormField
                            name="student_id"
                            control={form.control}
                            rules={{ required: 'ID is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter ID..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="name"
                            control={form.control}
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="roll_no"
                            control={form.control}
                            rules={{ required: 'Roll No. is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Roll No.</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter Roll No."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="examtype"
                            control={form.control}
                            rules={{ required: 'Exam Type is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Exam Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter Exam Type..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                </CardContent>

                        <div className="border-dashed border-2 border-gray-300 p-6 mt-4 text-center" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the PDF file here...</p>
                            ) : pdfFile ? (
                                <p>{pdfFile.name}</p>
                            ) : (
                                <p>Drag & drop a PDF file here, or click to select one</p>
                            )}
                        </div>
                        <div className="m-auto flex justify-center items-center gap-4 mt-6">
                            <button
                                type="submit"
                                className="bg-orange-500 w-40 h-10 text-white"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                            <button
                                className="bg-green-500 w-40 h-10 text-white"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>

                    </form>
                    </Form>
            </Card>
        </>
    );
};

export default AddResult;

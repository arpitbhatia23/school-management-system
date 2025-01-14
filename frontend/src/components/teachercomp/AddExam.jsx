import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { UploadCloud } from 'lucide-react';
import { Button } from '../ui/button';
import { teacherapi } from '@/services/teacherapi';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { toast } from '@/hooks/use-toast';

const AddExam = () => {
    const [image, setImage] = useState(null);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setImage(URL.createObjectURL(file));
            form.setValue('file', acceptedFiles); // Set file in form data
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const form = useForm({
        defaultValues: {
            exam_title: "",
            exam_discription: "",
            exam_date: "",
            class_name: "",
            file: null,
        },
    });

    const handelupoad = async (data) => {
        try {
            const formData = new FormData();
            formData.append('exam_title', data.exam_title);
            formData.append('exam_discription', data.exam_discription);
            formData.append('exam_date', data.exam_date);
            formData.append('class_name', data.class_name);
            formData.set('file', data.file[0]);
           
            const { exam } = teacherapi();
            const response = await exam(formData); // Assuming `exam` handles the API request
            if(response.data.success){
                toast({title:"success",description:"exam uploaded sucessfully"})
            }
            else{
                toast({title:"failed",description:response.data.message,  variant: 'destructive',
                })
 
            }
            console.log('Upload successful:', response);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <Card className="m-20">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handelupoad)}>
                    <CardContent className='grid grid-cols-1 sm:grid-cols-4 gap-4 m-8'>
                        <FormField
                            name="exam_title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter exam title" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="exam_discription"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter exam description" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="exam_date"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter exam date" type="date" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="class_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter class name" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardContent className="p-20 flex flex-col items-center">
                        <div
                            {...getRootProps()}
                            className={`border-dashed border-2 rounded-md p-8 w-full text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        >
                            <input {...getInputProps()} />
                            {image ? (
                                <div className="p-4 flex justify-center items-center">
                                    <img src={image} alt="Uploaded" className="h-48 w-48 object-cover rounded-md" />
                                </div>
                            ) : (
                                <>
                                <div className='flex flex-col justify-center items-center'>
                                    <UploadCloud className="text-gray-500 mb-4" size={40} />
                                    <span className="text-gray-600">Drag and drop an image here, or click to upload</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button onClick={() => setImage(null)} className="m-8">
                            Reset
                        </Button>
                        <Button className="m-8" type="submit">
                            Upload
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default AddExam;

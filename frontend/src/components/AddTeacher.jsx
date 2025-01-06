import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import profileimg from '../assets/image.png';
import { useAuthApi } from '@/services/authapi';
import { toast } from '@/hooks/use-toast';
// import { ToastAction } from '@/components/ui/toast';
import Selectcomp from './Select';
const AddTeacher = ({ class_incharge }) => {
  const [image, setimage] = useState(profileimg);
  const [imageform, setimageform] = useState();
  const [loading, setloading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
      gender: '',
      DOB: '',
      class_incharge: '',
      blood_group: '',
      religion: '',
      nationality: '',
      qualification:'',
      subject:'',
      category: '',
      address: '',
      email: '',
      phone_no: '',
      profile_image: '',
      role: 'teacher',
    },
  });
  const { register } = useAuthApi();

  const onSubmit = async (data) => {
    setloading(true);
    const formData = new FormData();
    data.profile_image = imageform;
    // Append all fields to FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]); // File field
    });

    

    const res = await register(formData);
    setloading(false);

    console.log(res);
    if (res?.data?.statusCode === 201) {
      toast({ title: 'teacher added', description: res.data?.message });
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.data.message,
      });
    }
  };

  const handelimage = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setimageform(file);

      const imageurl = URL.createObjectURL(file);

      setimage(imageurl);
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid file',
        description: 'Please upload an image file.',
      });
    }
  };

  return (
    <>
      <Card className=" m-2 sm:m-20 py-10">
        <CardContent>
          <CardTitle className="p-4">Add New Teacher</CardTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              class_incharge={`${class_incharge} `}
            >
              {/* add teacher */}
              <CardContent className="grid  grid-cols-2 sm:grid-cols-4 gap-4">
                <FormField
                  name="name"
                  rules={{ required: 'name is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter teacher name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="gender"
                  rules={{ required: 'gender is reuired' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                      
                        <Selectcomp
                          selectLable="select your gender"
                          selectvalue="Gender"
                          selectItems={['male', 'female', 'transgender']}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="DOB"
                  rules={{ required: 'DOB is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone_no"
                  rules={{ required: 'phone no is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter phone no."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="class_incharge"
                  rules={{ required: 'class incharge is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Incharge</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter class incharge"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                name='subject'
                rule={{required:'subject is required'}}
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                      type='text'
                      placeholder="enter subject"
                      {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>

<FormField
                name='qualification'
                rule={{required:'qualification is required'}}
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Input
                      type='text'
                      placeholder="enter Qualification"
                      {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>

                <FormField
                  name="blood_group"
                  rules={{ required: 'blood group is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Group</FormLabel>
                      <FormControl>
                        {/* <Input type="text" placeholder="Enter blood group" {...field} /> */}
                        <Selectcomp
                          selectLable="select blood group"
                          selectvalue="Blood Group"
                          field={field}
                          selectItems={[
                            'A_pos',
                            'A_neg',
                            'B_pos',
                            'B_neg',
                            'O_pos',
                            'O_neg',
                            'AB_pos',
                            'AB_neg',
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="religion"
                  rules={{ required: 'religion are required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>religion</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter religion"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nationality"
                  rules={{ required: 'nationality is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter nationality"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="category"
                  rules={{ required: 'cateroy is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Selectcomp
                          selectLable="select your category"
                          selectvalue="Category"
                          selectItems={['GENERAL', 'OBC', 'SC', 'ST']}
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="address"
                  rules={{ required: 'address is required' }}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              {/*upload image  */}
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center sm:items-start  justify-items-center p-2">
                <img src={image} alt="" className="rounded-full h-60 w-60" />
                <div className=" flex flex-col gap-4 mt-3 justify-center items-center">
                  <CardTitle className=" font-semibold text-center">
                    UPLOAD STUDENT PHOTO{' '}
                  </CardTitle>
                  <FormField
                    name="profile_image"
                    rules={{ required: 'profile image  is required' }}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder="chose student photo"
                            {...field}
                            onChange={(e) => {
                              handelimage(e);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-center gap-6">
                    <button
                      type="submit"
                      className="bg-orange-500 p-2 h-12 w-28"
                    >
                      {loading ? 'Submitting...' : 'Submit'}{' '}
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 p-2 h-12 w-28"
                      onClick={() => {
                        form.reset();
                        setimage(profileimg);
                        setimageform(null);
                      }}
                    >
                      reset
                    </button>
                  </div>
                </div>
              </CardContent>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTeacher;

import { toast } from '@/hooks/use-toast';
import { adminApi } from '@/services/adminapi';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const GetSubject = () => {
    const [data,setdata]=useState();
    const form = useForm({
        defaultValues:{
              subject_name:'',
             className:'',
             days:'',
             time:'',
             teacher_name:''
        }
    })
    const {getSubject} = adminApi()
    const submit= async(data)=>{
        const res = await getSubject(data)
        if(res.data.success){
            setdata(res.data.data)
            toast({
                title: 'Success',
                description: 'Subject fetch Successfully'
            })
        }else{
            toast({
                title: 'Error',
                description:res.data.message,
                variant:"destructive"
            })
        }
    }
  return (
    <>
      <Card className="mx-20 my-20">
        <CardTitle className="m-4 "><h2>Subjects</h2></CardTitle>
<CardContent>
    <Form{...form}>
        <form 
        onSubmit={form.handleSubmit(submit)}
        className='m-4'
        >
            <CardDescription >
                <div className='grid  grid-cols-2 sm:grid-cols-3 gap-4'><FormField
                name="className"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel> Class</FormLabel>
                       
                    <FormControl>
<Input
type="text"
placeholder="Enter Class....."
{...field}
/>
                    </FormControl>
                    <FormMessage/>
                    </FormItem>

                    
                )}
                
                />
                <FormField
                name="subject_name"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Subject Name
                        </FormLabel>
                        <FormControl>
                            <Input
                            type="text"
                            placeholder="Enter Subject Name"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
               />
             <div className='my-7'>  <Button
               type='submit'
               >Submit</Button></div></div>
            </CardDescription>
        </form>
    </Form>

    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Time</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>teacher_name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.length > 0 && 
            data.map((item)=>(
                <TableRow key ={item._id}>
                    <TableCell>{item.subject_name}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.days}</TableCell>
                    <TableCell>{item.teacher_name}</TableCell>

                </TableRow>
            ))
            } 
        </TableBody>
    </Table>
</CardContent>
      </Card>
    </>
  )
}

export default GetSubject

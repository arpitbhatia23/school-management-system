import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import {  Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { adminApi } from '@/services/adminapi'
import { toast } from '@/hooks/use-toast'
import Selectcomp from './Select'

const AddSubject = () => {
    const [loading,setloading]=useState(false);
    const [teacher,setteacher]=useState()
    const {getallteacher}=adminApi()
    const fetchallteachers=async()=>{
        const res=await getallteacher()
        const teachersData = res.data.data.map((teacher) => ({
            id: teacher._id,
            name: teacher.name,
          }));
        setteacher(teachersData)    }
    useEffect(()=>{
fetchallteachers()
    },[])
  const form = useForm({
    defaultValues:{
        subject_name:'',
        class:'',
        days:"",
        teacher_id:""

    }
  })
const {addSubject} = adminApi() 
console.log(teacher)
const onSubmit= async (data)=>{
    setloading(true);
    const res = await addSubject(data)
    setloading(false)
    console.log(res)
    if(res?.data?.success){
        toast({
            title:"subjct added ",
            description:res.data?.message })
    }else{
        toast({
            variant:'destructive',
            title:"something went wrong",
            description:res.data?.message
        })
    }
}


  return (
    <>
    <Card className="m-20">
        <CardContent>
            <CardTitle className="p-4">add new subject</CardTitle>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <FormField
                        name="subject_name"
                        rules={{required:"subject is required"}}
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Subect Name</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    placeholder="Enter Subject name...."
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                        name="class"
                        rules={{required:"class is required"}}
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Class</FormLabel>
                                <FormControl>
                                    <Input
                                    type="text"
                                    placeholder="Enter class ...."
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                       name="days"
                       rules={{required:"days are required"}}
                       control={form.control}
                       render={({field})=>(
                        <FormItem>
                            <FormLabel>Days</FormLabel>
                            <FormControl>
                                <Input
                                type="text"
                                placeholder="Days are rquired"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                       )}
                        />
                        <FormField
                        name="teacher_id"
                        rules={{required:"teacher id is required"}}
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Teacher Id</FormLabel>
                                <FormControl>
                                   <Selectcomp selectLable={"select teacher"} selectvalue={"teachers"} field={field} selectItems={teacher}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <div>
                            <button
                            type="submit">
                            {loading ? 'Submitting...' : 'Submit'}{' '}

                            </button>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </CardContent>
    </Card>
      
    </>
  )
}

export default AddSubject

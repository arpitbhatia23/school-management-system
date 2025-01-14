import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Form } from 'react-router-dom'
import { FormControl, FormField, FormLabel } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { teacherapi } from '@/services/teacherapi'
import { toast } from '@/hooks/use-toast'

const AddResult = () => {
    const [loading,setloading] =useState(false)
    const form = useForm({
        defaultValues:{
            student_id:'',
            name:'',
            roll_no:'',
            examtype:'',
            pdf:''

        }
    })
    const {result} = teacherapi()
    const onSubmit = async(data)=>{
        setloading(true)
        const res = await result(data);
        setloading(false)
        console.log(res)
            if(res?.data?.success){
                toast({
                    title: 'Result Added',
                    description: 'Result Added Successfully',
                })
            }else{
                toast({
                    title: 'Error',
                    variant:'destructive',
                    description: res.data?.message,
                })
            }

        
}
  return (
    <>
      <Card className="m-20">
        <CardTitle>Add Result</CardTitle>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardDescription></CardDescription>
                    <FormField
                    name="student_id"
                    control={form.control}
                    rules={{required:"id is required"}}
                    render={({field})=>(
                        <>
                        <FormLabel>ID</FormLabel>
                        <Input
                        type="text"
                    placeholder="Enter ID..."
                    {...field}
                        /></>
                    )}
                    />
                    <FormField
                    name="name"
                    control={form.control}
                    rules={{required:"name is required"}}
                    render={({field})=>(
                        <>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
<Input
type="text"
placeholder="Enter name..."
{...field}
/>
                        </FormControl>
                        </>
                    )}
                    />
                    <FormField
                    name="roll_no"
                    rules={{required:"roll_no is required"}}
                    control={form.control}
                    render={({field})=>(
                        <FormLabel>Roll No.
                            <FormControl>
                                <Input
                                type="text"
                                {...field}
                                />
                            </FormControl>
                        </FormLabel>
                    )}
                    />

                    <FormField
                    name="examtype"
                    control={form.control}
                    rules={{required:"exam_type is required"}}
                    render={({field})=>(
                         <>
                        <FormLabel>Exam Type</FormLabel>
<FormControl>
    <Input
    type="text"
    {...field}
    />
</FormControl>
                        </>
                        )}
                    />
                    {/* <div className=" m-auto flex justify-center items-center gap-4 ">
                  <button type="submit" className="bg-orange-500 w-40 h-10 ">
                    {loading ? 'Submitting...' : 'Submit'}{' '}
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 w-40 h-10"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Reset
                  </button>
                </div> */}

                </form>
            </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default AddResult

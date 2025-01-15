import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { teacherapi } from '@/services/teacherapi'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Addassignments = () => {
    const [loading,setLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            title:'',
            class_name:'',
            due_date:'',
            subject:'',
        }
    })

    const {addAssignment} = teacherapi();
const onSubmit = async(data)=>{
  setLoading(true)
  const res = await addAssignment(data)
  setLoading(false)
  if(res.data?.success){
    toast({
      title:'assignment added',
      description:res.data?.message
    })
  }else{
    toast({
      varian:'destructive'
      ,title:"something went wrong"
      ,description:res.data?.message
    })
  }

}

  return (
    <>
      <Card>
        <CardTitle>Add Assignment</CardTitle>
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
<FormField
                    name="title"
                    rules={{required:'title is required'}}
                    control={form.control}
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                          type="text"
                          placeholder="Enter title..."/>
                          {...field}
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <FormField
                    name="class_name"
                    rules={{required:"Class is required"}}
                    control={form.control}
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input
                          type="text"
                          placeholder="Enter Class.."
{...field}
/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <FormField
                    name="due_date"
                    rules={{required:"due date is required"}}
                    control={form.control}
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input
                          type="text"
                          placeholder="Enter date"
                          {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <FormField
                    name="subject"
                    control={form.control}
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                          type="text"
                          placeholder="Enter Subject.."
                          {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <div>
                      <button
                      type="submit"
                      > {loading?'submitting':'Submit'}</button>
                    </div>
                            </CardContent>

                </form>
            </Form>
      </Card>
    </>
  )
}

export default Addassignments

import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { teacherapi } from '@/services/teacherapi'
import { Input } from '../ui/input'
import { toast } from '@/hooks/use-toast'
import GetAssignment from './GetAssignment'
import { useSelector } from 'react-redux'

const Addassignments = () => {
  const userData = useSelector(state=>state.auth.userData)
console.log(userData)
    const [loading,setLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            title:'',
            class_name: userData.profile.class_incharge,
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
    <GetAssignment/>
      <Card className='m-20'>
        <CardTitle className="flex justify-center my-2"><h2>Add Assignment</h2></CardTitle>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid grid-cols-4 gap-4">
<FormField
                    name="title"
                    rules={{required:'title is required'}}
                    control={form.control}
                    render={({ field })=>(
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                          type="text"
                          placeholder="Enter title..."
                          {...field}/>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                    />
                    <FormField
                    name="class_name"
                    control={form.control}
                    render={({ field })=>(
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <FormControl>
                          <Input
                          readOnly
                          value={userData.profile.class_incharge}
                          
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
                    render={({ field })=>(
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
                    render={({ field })=>(
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
                  
                            </CardContent>
                            <div className=' flex justify-center'>
                      <button
                      className='bg-green-700 p-1 w-28 text-white m-1'
                      type="submit"
                      > {loading?'submitting':'Submit'}</button>
                    </div>

                </form>
            </Form>
      </Card>
    </>
  )
}

export default Addassignments

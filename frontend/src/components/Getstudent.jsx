import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { adminApi } from '@/services/adminapi'
import { Button } from './ui/button'
import DataTable from './DataTable'

const Getstudent = () => {
    const form=useForm({defaultValues:{
        className:"",
        name:"",
    }})
const [data,setdata]=useState([])
const {students}=adminApi()
    const onsumbit=async(data)=>{
        console.log(data)
     const res= await students(data)
     console.log(res.data)
     setdata(res?.data?.data)
    }
console.log(data)
 const newdata = data?.map((item) => {
     const {name,gender}=item
     const {roll_no,className,address,nationality}=item.profile
     const{father_name,parents_contact,parents_email}=item.parents_Detail
     return {name,gender,roll_no,className,parents_email,father_name,parents_contact,address,nationality}
 });
  return (
    <div>
        <Card  className='m-2 sm:m-20 py-10'>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onsumbit)}>
                <CardContent className="grid grid-cols-3 gap-x-16 items-center">

                    <FormField
                    name="name"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input type="text"  placeholder="enter the name of student " {...field} />
                        </FormControl>
                    </FormItem>

  )}
                    />

                <FormField
                    name="className"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        
                        <FormControl>
                            <Input type="text" {...field} placeholder="enter the class of students"/>
                        </FormControl>
                    </FormItem>

                    )}
                    />
                    
                    <Button type="sbumit" className="my-10">
                        submit
                    </Button>
                    </CardContent>

                </form>

             </Form>
             <CardContent>
                <DataTable data={newdata} tablecaption='Students data'/>
             </CardContent>

        </Card>
      
    </div>
  )
}

export default Getstudent

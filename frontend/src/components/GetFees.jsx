import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardTitle } from './ui/card'
import { Form,FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { adminApi } from '@/services/adminapi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { toast } from '@/hooks/use-toast'

const GetFees = () => {
    const form = useForm({
        defaultValues:{
            className:"",
            name:'',
            rollno:""
        }
    })
    const [data,setdata] = useState([])
    const {getFees} = adminApi()
    const onsubmit= async(data)=>{
        console.log(data)
        const res = await getFees(data)
        if(res?.data?.success){
            setdata(res.data.data)
            toast({
                title: 'Success',
                description: res.data?.message,
                status: 'success',
            })
           
            }else{
                toast({
                    title: 'Error',
                    description: res.data?.message,
                    status: 'error',
                    variant:"destructive"
                })
                
            }
        
    }
  return (
    <>
    <Card className="m-20">
        <Form {...form}>
            <form
            onsubmit={form.handleSubmit(onsubmit)}
            >
                <CardContent>
                    <FormField
                    name="name"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                type="text"
                                placeholder='Enter your Name'
                                {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    <FormField
name="className"
control={form.control}
render={({field})=>(
    <FormItem>
        <FormControl>
            <Input
            type="text"
            placeholder="Enter class..... "
            {...field}
            />
        </FormControl>
    </FormItem>
)}
                    />
                    <FormField
                    name="rollno"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                type="text"
                                placeholder="Enter rollno"
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )
                    }/>
                    <Button type="submit">
                        Submit
                    </Button>
                </CardContent>
            </form>
        </Form>
        <CardContent>
       
               <Table>
                <TableHeader>
                    <TableRow>  
                        <TableHead>
                            Name
                        </TableHead>
                        <TableHead>
                            Class
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {data.length > 0 && data.map(
                            (item)=>(
                                <>
                                <TableCell >
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    {item.className}
                                </TableCell>
                                <TableCell>
                                    {item.rollno}
                                    </TableCell>
                                    <TableCell>
                                        {item.amount}
                                    </TableCell>
                                    <TableCell>
                                        {item.status}
                                    </TableCell>
                                    <TableCell>
                                        {item.payment_method}
                                    </TableCell>
                                    </>
                            )
                        )}
                    </TableRow>
                </TableBody>
               </Table>
            
        </CardContent>
    </Card>
      
    </>
  )
}

export default GetFees

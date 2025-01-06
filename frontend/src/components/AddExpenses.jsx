import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import { Form } from 'react-router-dom'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import Selectcomp from './Select'

const AddExpenses = () => {
    const form = useForm({
        defaultValues:{
            name:"",
            expense_type:'',
            status:'',
            amount:'',
            due_date:'',
            email:"",
            phone:""
        }
    })
  return (
    <>
    <Card>
      <CardContent>
        <CardTitle>add new expense</CardTitle>
<Form>
    <CardContent>
        <FormField
        name="name"
    rules={{required:"name is required"}}
    control={form.control}
    render={({field})=>(
        <FormItem>
            <FormLabel>Name</FormLabel>
  <FormControl>
        <Input
        type="text"
        placeholder="Enter your name"
        {...field}
        />
        </FormControl>
        <FormMessage/>
        </FormItem>
      
    )}
        />
        <FormField
        name="expense_type"
        rules={{requird:"expense type is required"}}
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>expense type</FormLabel>
                <FormControl>
                    <Input
                    type="text"
                    placeholder="enter expense type"
                    {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
        <FormField
        type="status"
        rules={{required:"status is required"}}
        control={form.control}
        render={({field})=>(
            <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                   <Selectcomp/>
                </FormControl>
            </FormItem>
        )}
        />
    </CardContent>
</Form>
      </CardContent>
      </Card>
    </>
  )
}

export default AddExpenses

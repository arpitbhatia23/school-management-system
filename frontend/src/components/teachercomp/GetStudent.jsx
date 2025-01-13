import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Form, FormControl, FormField } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import PaginationComponent from '../paginationcomp'
import { teacherapi } from '@/services/teacherapi'

const GetStudent = () => {
    const [data,setdata]= useState()
    const form = useForm({
        defaultValues: {
            class:"",
            name:"",
            roll_no:'',
            phone_no:'',
            address:'',
            gender:'',
            DOB:'',

        }
    })
    const {getStudents} = teacherapi()
    const fetchData = async (data)=>{
        const res = await getStudents(data);
        if(res.data.data){
            setdata(res.data.data)
        toast ({
            title: "Student Data",
            message: "Student Data Fetched Successfully",
            type: "success",
            duration: 3000,
        })
    }else{
        toast ({
            title: "Error",
            description:res.data.message})}
         } 
    const [currentpages,setcurrentpages]=useState(1)
    const rows = 10
    const totalpages = Math.ceil(data?.length/rows)
    const pagination = data?.slice ((currentpages-1)*rows,currentpages*rows)
    const handlepagination=(newpage)=>{
        setcurrentpages(newpage)
    }
    useEffect(()=>{fetchData()},[])
  return (
    <>
      <Card className='m-20'>
      <div className='flex justify-center my-4'>
              <CardTitle  > <h3 className='text-orange-600'>Students</h3></CardTitle>
        </div>
        <CardContent>
           
    
               
<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Sr.no</TableHead>
            <TableHead>Name </TableHead>
            <TableHead>Roll No</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Address</TableHead>
             </TableRow>
    </TableHeader>
    <TableBody>
        {pagination?.length > 0 &&
        pagination.map((item,index)=>(
            <TableRow key ={item._id}>
                <TableCell>{index+1}</TableCell>
<TableCell>{item.name}</TableCell>
<TableCell>{item.roll_no}</TableCell>
<TableCell>{item.gender}</TableCell>
<TableCell>{item.DOB}</TableCell>
<TableCell>{item.phone_no}</TableCell>
<TableCell>{item.address}</TableCell>

            </TableRow>))}
    </TableBody>
</Table>
{
    data?.length>0&&

<PaginationComponent totalPages={totalpages} currentPage={currentpages} onPageChange={handlepagination}/>
}
        </CardContent>
      </Card>
    </>
  )
}

export default GetStudent

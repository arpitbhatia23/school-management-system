import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { teacherapi } from '@/services/teacherapi'
import { toast } from '@/hooks/use-toast'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import PaginationComponent from '../paginationcomp'

const GetAssignment = () => {
    const [data,setdata] = useState()
    const {getAssignment} = teacherapi()
    const fetchData = async(data)=>{
        const res = await getAssignment(data)
        console.log(res)
        if(res.data.data){
            setdata(res.data.data)
            toast({
                title:'assignment get successfully',
                description:res.data?.message,
                        })
        }else{
            toast({
                title:'error',
                description:res.data?.message,
            })
        }
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
<CardTitle>All Assignment</CardTitle>
<CardContent>
<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Sr.no</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Subject</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
    {pagination?.length > 0 &&
        pagination.map((item,index)=>(
        <TableRow key={item._id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.class_name}</TableCell>
            <TableCell>{item.due_date}</TableCell>
            <TableCell>{item.subject}</TableCell>

        </TableRow>))}
    </TableBody>
</Table>
{
    data?.length > 0 &&

<PaginationComponent totalPages={totalpages} currentPage={currentpages} onPageChange={handlepagination}/>
}

</CardContent>
    </Card>
      
    </>
  )
}

export default GetAssignment

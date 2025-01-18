import { studentapi } from '@/services/student'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'

const Getsubject = () => {
    const {getsubject} =studentapi()
    const [data,setdata]=useState()
    const fetchsubject=async()=>{
        const res=await getsubject()
        console.log(res.data)
        if(res.data.success){
            setdata(res.data.data)

        }

    }
    
    useEffect(()=>{
        fetchsubject()        
        },[])
    console.log(data)
  return (
    <div>
        <Card>
            <CardContent className="flex justify-center items-center">
                <CardDescription>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                </CardDescription>

            </CardContent>
        </Card>
      
    </div>
  )
}

export default Getsubject

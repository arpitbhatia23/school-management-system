import React, { useEffect, useState } from 'react';
import { Card, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { studentapi } from '@/services/student';
import { useSelector } from 'react-redux';
import { toast } from '@/hooks/use-toast';

const StDatesheet = () => {
  const { getExam } = studentapi();
  const [data, setdata] = useState();
  const userData = useSelector((state)=>state.auth.userData)
  const fetchData = async(data)=>{
    const res = await getExam(data);
    console.log(res.data)
    if(res.data.data){
      setdata(res.data.data)
      toast({
        title:'datesheet fetched successfully',
        description:res.data?.message,
        status: 'success',
      })
    }else{
      toast({
        title: 'Error',
        description:res.data?.messsage,
        variant:'destructive'
      })
    }
  }
  useEffect(()=>{
    fetchData()
},[])

  return (
    <>
      <Card className="m-20 px-6">
        <CardTitle className='mx-6 my-4 text-orange-600'>Datesheet</CardTitle>
        <div className='flex justify-center'>
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Sr.no</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Date(yy-mm-dd)</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Datesheet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.map((item,index)=>(
              <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{item.exam_title}</TableCell>
              <TableCell>{item.exam_date}</TableCell>
              <TableCell>{item.class_name}</TableCell>
              <TableCell>{item.exam_discription}</TableCell>
              <TableCell><a href={item.file} target='_blank' download={item.file} className='text-blue-600'>View Datesheet </a></TableCell>

               </TableRow>
            ))}
            
          </TableBody>
        </Table>
        </div>
      </Card>
    </>
  );
};

export default StDatesheet;

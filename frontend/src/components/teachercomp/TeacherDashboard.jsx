import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle,CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import { Calendar, Download, User } from 'lucide-react'
import Notification from '../Notification'
import { chartConfig } from '@/utils/chatconfig';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
 
} from '@/components/ui/chart';
import { teacherapi } from '@/services/teacherapi'
import { Button } from '../ui/button'
import { link } from 'fs'
function calculateAttendancePercentage(daysPresent, totalWorkingDays) {
  if (totalWorkingDays === 0) return 0; // Avoid division by zero
  return Math.floor( (daysPresent / totalWorkingDays) * 100);
}

// Example usage


const TeacherDashboard = () => {
  const [weeklyatendance,setweeklyatendance]=useState([])
  const {getweeklyattendance,totalstudent,idCard}=teacherapi()
 const [student,setstudent]=useState()
 const currentDate = new Date();
 const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-indexed
 const currentYear = currentDate.getFullYear();

 // Find attendance for the current month
 const currentMonthAttendance = weeklyatendance.find(
     (record) => record._id.month === currentMonth && record._id.year === currentYear

 );

 console.log(currentMonthAttendance)
  const gettotalstudent=async()=>{
    const res=await totalstudent()
    if(res.data.success){
      setstudent(res?.data?.data)
    }
  }
  const genid=async()=>{
    const res=await idCard()
  }
  const getattendace=async()=>{
    const res= await getweeklyattendance()

    setweeklyatendance(res.data.data)

  }
  console.log(student)
  useEffect(()=>{
    getattendace()
    gettotalstudent()
  },[])
  const stats = [
    {
      label: 'Students',
      value:  student?.[0]?.count,
      bgcolor: 'bg-orange-500',
      icon: User,
    },
    {
      label: 'Attendance',
      value:  calculateAttendancePercentage(currentMonthAttendance?.present ,22) +"%",
      bgcolor: 'bg-green-500',
      icon: User,
    },
    {
      label: 'Download id card',
      bgcolor: 'bg-green-500',
      link:"",
      icon: Download,
    }
    
  ];
  const attendanceData = weeklyatendance.map((item) => ({
    month: ` ${new Date(item._id.year, item._id.month - 1, 1).toLocaleString("default",{month:"short"})}`,
    present: item.present || 0,
    absent: item.absent || 0,
    leave: item.leave || 0,
  }));
  
 

  
  
  
  
  return (
    <div>
      <Card className="m-20">
          <CardTitle className="m-4">
            Teacher Dashboard
        </CardTitle>

        <CardContent className=" grid  grid-cols-1 lg:grid-cols-3 gap-x-24  gap-4 mt-4 ">
          {stats.map((stat, index) => (
                      <CardContent
                        key={index}
                        className={`flex justify-center gap-x-6 bg-slate-600 rounded-md py-2 items-center ${stat.bgcolor}`}
                      >
                        <stat.icon />
                        <div className="flex flex-col items-center">
                          <CardTitle>{stat?.label}</CardTitle>
                          <Separator />
                          <CardDescription className="font-se mibold text-white">
                            {stat?.value}
                          </CardDescription>
                        </div>
                        
                      </CardContent>
                    ))}
        </CardContent>
       <CardContent className="grid grid-cols-1 gap-4">
        <CardContent>
     <ChartContainer config={chartConfig}>
            <BarChart data={attendanceData} width={600} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="present" fill="#007BFF" radius={4} />
<Bar dataKey="absent" fill="#D9534F" radius={4} />
<Bar dataKey="leave" fill="#5CB85C" radius={4} />

            </BarChart>
          </ChartContainer>
          </CardContent>
         

       </CardContent>
       <CardContent>
       <Notification/>
       </CardContent>
      </Card>
    </div>
  )
}

export default TeacherDashboard

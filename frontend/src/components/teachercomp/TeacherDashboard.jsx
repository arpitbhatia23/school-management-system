import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle,CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import { Calendar, User } from 'lucide-react'
import Notification from '../Notification'
import { chartConfig } from '@/utils/chatconfig';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
 
} from '@/components/ui/chart';
import { teacherapi } from '@/services/teacherapi'
const TeacherDashboard = () => {
  const [weeklyatendance,setweeklyatendance]=useState([])
  const {getweeklyattendance}=teacherapi()
  const getattendace=async()=>{
    console.log("hi")
    const res= await getweeklyattendance()
    console.log("hi 2")

    console.log("res",res?.data?.data)
    setweeklyatendance(res.data.data)

  }
  useEffect(()=>{
    getattendace()
  },[])
  console.log("weekly",weeklyatendance)
  const stats = [
    {
      label: 'Students',
      value:  0,
      bgcolor: 'bg-orange-500',
      icon: User,
    },
    {
      label: 'Attendance',
      value:  0,
      bgcolor: 'bg-green-500',
      icon: User,
    },
    {
      label: 'Assigmenent',
      value:  0,
      bgcolor: 'bg-blue-500',
      icon: Calendar ,
    },
    
  ];
  const attendanceData = weeklyatendance.map((item) => ({
    month: ` ${new Date(item._id.year, item._id.month - 1, 1).toLocaleString("default",{month:"short"})}`,
    present: item.present || 0,
    absent: item.absent || 0,
    leave: item.leave || 0,
  }));
  

  const assignmentData = [
    { subject: "science", totalAssignments: 5 },
    { subject: "math", totalAssignments: 7 },
    { subject: "history", totalAssignments: 3 },
    { subject: "hindi", totalAssignments: 5 },
    { subject: "english", totalAssignments: 6 },
    { subject: "cs", totalAssignments: 2 }

  ];
  
  
  
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
                          <CardTitle>{stat.label}</CardTitle>
                          <Separator />
                          <CardDescription className="font-se mibold text-white">
                            {stat.value}
                          </CardDescription>
                        </div>
                      </CardContent>
                    ))}
        </CardContent>
       <CardContent className="grid grid-cols-2 gap-4">
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
          <CardContent>
     <ChartContainer config={chartConfig}>
            <BarChart data={assignmentData} width={600} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="subject"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="totalAssignments" fill="var(--color-mobile)" radius={4} />
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

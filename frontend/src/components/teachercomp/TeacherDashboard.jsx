import React from 'react'
import { Card, CardContent, CardTitle,CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import { Calendar, User } from 'lucide-react'

const TeacherDashboard = () => {
  const stats = [
    {
      label: 'Students',
      value:  0,
      bgcolor: 'bg-orange-500',
      icon: User,
    },
    {
      label: 'Teacher',
      value:  0,
      bgcolor: 'bg-green-500',
      icon: User,
    },
    {
      label: 'Earning',
      value:  0,
      bgcolor: 'bg-blue-500',
      icon: Calendar ,
    },
    
  ];
  return (
    <div>
      <Card className="m-20">
          <CardTitle className="m-4">
            Teacher Dashboard
        </CardTitle>

        <CardContent className="shadow-sm shadow-black rounded-md gird grid-cols-3 ">
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
       

      </Card>
    </div>
  )
}

export default TeacherDashboard

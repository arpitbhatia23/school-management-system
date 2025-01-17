import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '../ui/card';
import { Separator } from '../ui/separator';
import { Calendar, Download, User } from 'lucide-react';
import Notification from '../Notification';
import { chartConfig } from '@/utils/chatconfig';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { teacherapi } from '@/services/teacherapi';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '../ui/button';

function calculateAttendancePercentage(daysPresent, totalWorkingDays) {
  if (totalWorkingDays === 0) return 0; // Avoid division by zero
  return Math.floor((daysPresent / totalWorkingDays) * 100);
}

// Example usage

const TeacherDashboard = () => {
  const [weeklyatendance, setweeklyatendance] = useState([]);
  const { getweeklyattendance, totalstudent, idCard } = teacherapi();
  const [student, setstudent] = useState();
  const [genidcard, setgenidcard] = useState();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-indexed
  const currentYear = currentDate.getFullYear();
  const userData = useSelector((state) => state.auth.userData);
  // Find attendance for the current month
  const currentMonthAttendance = weeklyatendance.find(
    (record) =>
      record._id.month === currentMonth && record._id.year === currentYear,
  );

  console.log(currentMonthAttendance);
  const gettotalstudent = async () => {
    const res = await totalstudent();
    if (res.data.success) {
      setstudent(res?.data?.data);
    }
  };
  const genid = async () => {
    const res = await idCard();
    if (res.data.success) {
      setgenidcard(res.data.data);
    }
  };
  const getattendace = async () => {
    const res = await getweeklyattendance();

    setweeklyatendance(res.data.data);
  };
  console.log(student);
  useEffect(() => {
    getattendace();
    gettotalstudent();
    genid();
  }, []);
  const stats = [
    {
      label: 'Students',
      value: student?.[0]?.count,
      bgcolor: 'bg-orange-500',
      icon: User,
    },
    {
      label: 'Attendance',
      value:
        calculateAttendancePercentage(currentMonthAttendance?.present, 22) +
        '%',
      bgcolor: 'bg-green-500',
      icon: User,
    },
    {
      label: 'Download id card',
      bgcolor: 'bg-green-500',
      link: genidcard,
      icon: Download,
    },
  ];
  console.log(genidcard);
  const attendanceData = weeklyatendance.map((item) => ({
    month: ` ${new Date(item._id.year, item._id.month - 1, 1).toLocaleString('default', { month: 'short' })}`,
    present: item.present || 0,
    absent: item.absent || 0,
    leave: item.leave || 0,
  }));

  const handeDownload = async () => {
    try {
      const res = await axios.get(genidcard, {
        responseType: 'blob', // Ensure we get a Blob response
      });

      // Create a URL for the Blob
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${userData.name}.pdf`); // Set the download attribute
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object and remove the link
      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      console.log('Download initiated successfully.');
    } catch (error) {
      console.error('Something went wrong while downloading the file:', error);
    }
  };

  return (
    <div>
      <Card className="m-20">
        <CardTitle className="m-4">Teacher Dashboard</CardTitle>

        <CardContent className=" grid  grid-cols-1 lg:grid-cols-3 gap-x-24  gap-4 mt-4 ">
          {stats.map((stat, index) => (
            <CardContent
              key={index}
              className={`flex justify-center gap-x-6 bg-slate-600 rounded-md py-2 items-center ${stat.bgcolor}`}
              onClick={stat.link ? handeDownload : undefined}
            >
              <stat.icon />
              <div className="flex flex-col items-center">
                <CardTitle>{stat?.label}</CardTitle>

                <CardDescription className="font-semibold text-white">
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
          <Notification />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;

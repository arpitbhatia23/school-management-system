import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { User } from 'lucide-react';
import { Separator } from './ui/separator';

import { adminApi } from '@/services/adminapi';
import EarningChart from './EarningChart.jsx';
import Studentschart from './Studentschart';
import Notification from './Notification';
import Expense from './Expense';

const AdminDashboard = () => {
  const [student, setstudent] = useState();

  

  const { totalstudent } = adminApi();

  const fetchtotalstudent = async () => {
    const res = await totalstudent();
    console.log(res?.data?.data);
    setstudent(res?.data?.data);
  };
  // Fetch chart colors from CSS variables

  useEffect(() => {
    fetchtotalstudent();
  }, []);

  

  const totalstudentsdata = student?.reduce((acc, cur) => acc + cur.count, 0);

 
  const stats = [
    { label: 'Student', value: totalstudentsdata },
    { label: 'Teacher', value: '12,000' },
    { label: 'Parents', value: '8,000' },
    { label: 'Earnings', value: '$120,000' },
  ];

  return (
    <div>
      <Card className="m-2 sm:m-20 p-10">
        <CardTitle>Admin Dashboard</CardTitle>

        {/* Stats Section */}
        <CardContent className="grid  grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {stats.map((stat, index) => (
            <CardContent
              key={index}
              className="flex justify-evenly gap-x-8 bg-slate-600 rounded-lg py-2 items-center"
            >
              <User />
              <div className="flex flex-col">
                <span>{stat.label}</span>
                <Separator />
                <span>{stat.value}</span>
              </div>
            </CardContent>
          ))}
        </CardContent>

        {/* Chart Section */}
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <EarningChart />
           <Expense/>
        </CardContent>
        {/* third section */}
        <CardContent className="grid  grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Studentschart students={student} />
          <Notification/>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

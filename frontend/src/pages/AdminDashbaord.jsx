import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '../components/ui/card';
import { User } from 'lucide-react';
import { Separator } from '../components/ui/separator';

import { adminApi } from '@/services/adminapi';
import EarningChart from '../components/EarningChart.jsx';
import Studentschart from '../components/Studentschart';
import Notification from '../components/Notification';
import Expense from '../components/Expense';
import { DollarSign } from 'lucide-react';
const AdminDashboard = () => {
  const [student, setstudent] = useState([]);
  const [expense, setsexpense] = useState([]);
  const [fees, setFees] = useState([]);
  const [totalTeacher, setTotalTeacher] = useState([]);

  const { totalstudent, totalexpense, totalteacher, totalfees } = adminApi();

  const fetchFees = async () => {
    const res = await totalfees();
    setFees(res?.data?.data || []);
  };

  const fetchtotalstudent = async () => {
    const res = await totalstudent();
    setstudent(res?.data?.data);
  };

  const fetchexpense = async () => {
    const res = await totalexpense();
    setsexpense(res?.data?.data);
  };
  // Fetch chart colors from CSS variables
  const fetchtotalteacher = async () => {
    const res = await totalteacher();
    setTotalTeacher(res?.data?.data);
  };
  useEffect(() => {
    fetchtotalstudent();
    fetchexpense();
    fetchFees();
    fetchtotalteacher();
  }, []);

  const totalexpensestats = expense?.reduce(
    (acc, cur) => acc + cur.totalAmount,
    0,
  );
  const totalearningstat = fees?.reduce((acc, cur) => acc + cur.totalAmount, 0);
  const totalstudentsstat = student?.reduce((acc, cur) => acc + cur.count, 0);
  const totalteacherstat = totalTeacher?.reduce(
    (acc, cur) => acc + cur.count,
    0,
  );
  const stats = [
    {
      label: 'Students',
      value: totalstudentsstat,
      bgcolor: 'bg-orange-500',
      icon: User,
    },
    {
      label: 'Teacher',
      value: totalteacherstat,
      bgcolor: 'bg-green-500',
      icon: User,
    },
    {
      label: 'Earning',
      value: totalearningstat,
      bgcolor: 'bg-blue-500',
      icon: DollarSign,
    },
    {
      label: 'Expnese',
      value: totalexpensestats,
      bgcolor: 'bg-red-500',
      icon: DollarSign,
    },
  ];

  return (
    <div>
      <Card className="m-2 sm:m-20 p-10">
        <CardTitle>Admin Dashboard</CardTitle>

        {/* Stats Section */}
        <CardContent className="grid  grid-cols-2 lg:grid-cols-4 gap-x-24  gap-4 mt-4">
          {stats.map((stat, index) => (
            <CardContent
              key={index}
              className={`flex justify-center gap-x-6 bg-slate-600 rounded-md py-2 items-center ${stat.bgcolor}`}
            >
              <stat.icon />
              <div className="flex flex-col items-center">
                <CardTitle>{stat.label}</CardTitle>
                <Separator />
                <CardDescription className="font-semibold text-white">
                  {stat.value}
                </CardDescription>
              </div>
            </CardContent>
          ))}
        </CardContent>

        {/* Chart Section */}
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 ">
          <EarningChart expense={expense} fees={fees} />
          <Expense expense={expense} />
        </CardContent>
        {/* third section */}
        <CardContent className="grid  grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Studentschart students={student} />
          <Notification />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

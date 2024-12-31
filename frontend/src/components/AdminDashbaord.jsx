import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { User } from 'lucide-react';
import { Separator } from './ui/separator';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import {
  Label,
  LineChart,
  Line,
  Pie,
  PieChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from 'recharts';
import { adminApi } from '@/services/adminapi';

const AdminDashboard = () => {
  const { getnotification } = adminApi();
  const fetchnotgication = async () => {
    const res = await getnotification();
    console.log(res.data);
    setnotifaction(res.data.data)
  };

  useEffect(() => {
    fetchnotgication();
  }, []);

  const [notification, setnotifaction] = useState([
    {
      title: 'System Update',
      description: 'A new system update is available.',
      date: '2024-12-30',
      time: '10:30 AM',
    },
    {
      title: 'Meeting Reminder',
      description: 'Team meeting scheduled for today.',
      date: '2024-12-30',
      time: '11:00 AM',
    },
    {
      title: 'Password Expiry',
      description: 'Your password will expire in 3 days.',
      date: '2024-12-30',
      time: '12:00 PM',
    },
    {
      title: 'New Message',
      description: 'You have a new message from HR.',
      date: '2024-12-30',
      time: '1:15 PM',
    },
  ]);

  // useEffect(async()=>{
  //    const res=await getnotification()
  //    console.log(res.data)
  //      setnotifaction(res?.data)
  // },[])

  const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))',
    },
  };

  const stats = [
    { label: 'Student', value: '60,000' },
    { label: 'Teacher', value: '12,000' },
    { label: 'Parents', value: '8,000' },
    { label: 'Earnings', value: '$120,000' },
  ];

  return (
    <div>
      <Card className="m-2 sm:m-20 p-10">
        <CardTitle>Admin Dashboard</CardTitle>

        {/* Stats Section */}
        <CardContent className="grid grid-cols-4 gap-6 mt-4">
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
        <CardContent className="grid grid-cols-2 gap-6 mt-6">
          <CardContent className="shadow-md shadow-black p-6 rounded-lg">
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardContent className="shadow-md shadow-black p-6 rounded-lg">
            {/* Add content for the second card if needed */}
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </CardContent>
        {/* third section */}
        <CardContent className="grid grid-cols-2 gap-6 mt-6">
          {/* notifaction */}
          <CardContent className="shadow-md shadow-black rounded-lg  ">
            <div className="h-72 overflow-y-scroll p-2 scrollbar-hide">
              <CardTitle>Notifaction</CardTitle>

              {notification.map((item, index) => (
                <CardContent key={index} className="mb-4">
                  <CardTitle className="p-2">{item.title}</CardTitle>
                  <CardDescription className="flex gap-2 justify-between ">
                    
                    <span>{item.description||item.message}</span> <span>{item.date|| new Date(item.createdAt).toLocaleDateString()}</span>
                  </CardDescription>
                </CardContent>
              ))}
            </div>
          </CardContent>

          <CardContent className="shadow-md shadow-black rounded-lg">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={[
                    {
                      name: 'Desktop',
                      value: chartData.reduce(
                        (sum, item) => sum + item.desktop,
                        0,
                      ),
                    },
                    {
                      name: 'Mobile',
                      value: chartData.reduce(
                        (sum, item) => sum + item.mobile,
                        0,
                      ),
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  fill="var(--chart-1)"
                  stroke="var(--chart-2)"
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        const totalVisitors = chartData.reduce(
                          (sum, item) => sum + item.desktop + item.mobile,
                          0,
                        );

                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

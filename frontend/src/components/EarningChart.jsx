import React, { useEffect } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis } from 'recharts';
import { chartConfig } from '@/utils/chatconfig';
import { adminApi } from '@/services/adminapi';
import { useState } from 'react';
const EarningChart = () => {
  const [fees,setfees]=useState()
  // const chartData = [
  //   { name: 'John', amount: 5000, date: '2024-01-01' },
  //   { name: 'Jane', amount: 4500, date: '2024-01-03' },
  //   { name: 'Doe', amount: 3000, date: '2024-01-05' },
  //   { name: 'Smith', amount: 7000, date: '2024-01-05' },
  // ];

  const chartData =fees?.map((item)=>{
    return{
       month:item?._id?.month ,
       amount:item?.totalAmount
    }
  })
  console.log(fees)
  const { totalfees } = adminApi();
  const fetchfee = async () => {
    const res = await totalfees();
    console.log(res.data);
    setfees(res?.data?.data)
  };
  useEffect(() => {
    fetchfee();
  }, []);

  return (
    <div>
      <Card>
        <CardContent className="shadow-md shadow-black p-6 rounded-lg">
          <CardTitle className ="font-semibold text-center">TOTAL EARNING</CardTitle>

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
                tickMargin={4}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="amount"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              {/* <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                /> */}
            </LineChart>
          </ChartContainer>
        </CardContent>
        </Card>
    </div>
  );
};

export default EarningChart;

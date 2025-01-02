import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis } from 'recharts';
import { chartConfig } from '@/utils/chatconfig';
import { adminApi } from '@/services/adminapi';

const EarningChart = ({ expense, fees }) => {
  // const { totalfees } = adminApi();
  //   // Fetch fees data from API
  //   const fetchFees = async () => {
  //     const res = await totalfees();
  //           setFees(res?.data?.data || []);
  //   };

  //   useEffect(() => {
  //     fetchFees();
  //   }, []);

  // Ensure expense is always an array, fallback to an empty array if undefined
  const expenseData = Array.isArray(expense) ? expense : [];
  // Map data for the chart: earnings (fees) and expenses
  const feesChartData = fees?.map((item) => ({
    month: item?._id?.month || 'Unknown',
    earning: item?.totalAmount || 0,
    type: 'fees',
  }));

  const expenseChartData = expenseData?.map((item) => ({
    month: item?._id?.month || 'Unknown',
    expense: item?.totalAmount || 0,
    type: 'expense',
  }));

  // Combine both data sets into a single chart data array
  const combinedChartData = [...feesChartData, ...expenseChartData];

  const earningsData = combinedChartData.filter((item) => item.type === 'fees');
  const expensesData = combinedChartData.filter(
    (item) => item.type === 'expense',
  );

  // Convert data into the desired format
  const convertedData = [];

  for (let i = 1; i <= 12; i++) {
    const earnings =
      earningsData.find((item) => item.month === i)?.earning || 0;
    const expense = expensesData.find((item) => item.month === i)?.expense || 0;

    convertedData.push({
      month: new Date(0, i - 1).toLocaleString('default', { month: 'short' }), // Convert month number to month name
      expense: expense,
      earnings: earnings,
    });
  }

  return (
    <div>
      <Card>
        <CardContent className="shadow-md shadow-black p-6 rounded-lg">
          <CardTitle className="font-semibold text-center">
            TOTAL EARNINGS & EXPENSES
          </CardTitle>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={convertedData}
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
              />
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />

              {/* Line for Earnings */}
              <Line
                dataKey="earnings"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={true}
                name="Earnings"
                hide={false}
              />

              {/* Line for Expenses */}
              <Line
                dataKey="expense"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={true}
                name="Expenses"
                hide={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningChart;

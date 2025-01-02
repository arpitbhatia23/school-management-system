import React from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { chartConfig } from '@/utils/chatconfig';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const Expense = ({ expense }) => {
  // Map the `expense` prop to create chart data
  const chartData = expense?.map((item) => ({
    month:
      new Date(0, item?._id?.month - 1).toLocaleString('default', {
        month: 'short',
      }) || 'Unknown',
    amount: item?.totalAmount || 0,
  }));

  return (
    <div>
      <Card>
        <CardContent className="shadow-md shadow-black p-6 rounded-lg">
          <CardTitle className="font-semibold text-center">
            TOTAL EXPENSES
          </CardTitle>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} width={600} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="amount" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expense;

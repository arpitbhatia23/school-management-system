import React, { useState } from 'react'
import { Card,CardContent, CardTitle } from './ui/card'
import { chartConfig } from '@/utils/chatconfig';
import {
    
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
  } from 'recharts';
  import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from '@/components/ui/chart';
const Expense = () => {
    const [expense,setexpense]=useState([ 
        { month: 'January', desktop: 186, mobile: 80 },
        { month: 'February', desktop: 305, mobile: 200 },
        { month: 'March', desktop: 237, mobile: 120 },
        { month: 'April', desktop: 73, mobile: 190 },
        { month: 'May', desktop: 209, mobile: 130 },
        { month: 'June', desktop: 214, mobile: 140 },])
        console.log(expense)
  return (
    <div>
<Card>
      <CardContent className="shadow-md shadow-black p-6 rounded-lg">
        <CardTitle className ="font-semibold text-center">TOTAL EXPENSES</CardTitle>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={expense}>
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
          </Card>
    </div>
  )
}

export default Expense

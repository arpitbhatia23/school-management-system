import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Pie, PieChart, Label, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { chartConfig } from '@/utils/chatconfig';
const StudentsChart = ({ students }) => {
  // Data for the chart
  const chartData = [
    {
      gender: students?.[0]?._id,
      count: students?.[0]?.count || 0,
      fill: 'var(--color-male)',
    },
    {
      gender: students?.[1]?._id,
      count: students?.[1]?.count || 0,
      fill: 'var(--color-female)',
    },
  ];

  // Calculate total students
  const totalStudents = chartData.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div>
      <Card>
        <CardContent className="shadow-md shadow-black rounded-lg flex-1 pb-0">
          <h2 className="text-center text-xl font-bold mb-2">
            Students Distribution
          </h2>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square  max-h-[251px]"
          >
            <ResponsiveContainer>
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="gender"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                              {totalStudents}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              students
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsChart;

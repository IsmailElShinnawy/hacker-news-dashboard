'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const CustomBarChart = ({
  response,
}: {
  response: Array<{ keyword: string; frequency: number }>;
}) => {
  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={response}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <CartesianGrid vertical={false} />
        <Bar dataKey="frequency" fill="var(--color-chart-2)" />
        <XAxis dataKey="keyword" />
        <YAxis />
      </BarChart>
    </ChartContainer>
  );
};

export default CustomBarChart;

"use client";

import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { getMonthlyData } from "@/lib/data/chart-data";

export function Overview() {
  const data = getMonthlyData();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
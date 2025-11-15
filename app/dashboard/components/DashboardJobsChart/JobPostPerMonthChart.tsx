"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DailyJobData = {
  date: string;
  totalJobs: number;
};

interface JobsPerDayChartProps {
  month?: number;
  year?: number;
}

export default function JobsPerDayChart({ month, year }: JobsPerDayChartProps) {
  const { data, isLoading, error } = useQuery<DailyJobData[]>({
    queryKey: ["jobsPerDay", month, year], 
    queryFn: async () => {
      const res = await api.get("/dashboard/job/per/month", {
        params: { month, year },
      });
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load jobs per day.</p>;
  if (!data || data.length === 0) return <p>No jobs found for this month.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-gray-600 font-semibold mb-4">
        Jobs Posted (1–30)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalJobs" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

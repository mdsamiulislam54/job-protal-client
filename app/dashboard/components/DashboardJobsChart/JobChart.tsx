"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import Loading from "@/components/Loading/Loading";

const DashboardJobChart = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job-chart"],
    queryFn: async () => {
      const res = await api.get("/dashboard/job/chart");
      return res.data.data;
    }
  });

  if (isLoading) return <Loading/>;
  if (isError) return <p>Failed to load chart</p>;

  return (
    <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-5">Jobs by Title</h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalJobs" fill="#9d5cff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardJobChart;

"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Loading from "@/components/Loading/Loading";

const COLORS = ["#0088FE", "#9d5cff", "#FFBB28", "#FF8042", "#A28DD0"];

type ChartDataItem = {
  [key: string]: string | number;
  totalJobs: number;
};

interface PieChartCardProps {
  title: string;
  data: ChartDataItem[];
  dataKey: string;
  nameKey: string;
}

const PieChartCard = ({ title, data, dataKey, nameKey }: PieChartCardProps) => (
  <div className="bg-white  dark:bg-background-dark dark:border border-gray-600 p-4 rounded-xl w-full mx-auto shadow-lg ">
    <h2 className="text-gray-600 dark:text-gray-100 font-semibold mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

interface DashboardChartsData {
  experience: ChartDataItem[];
  jobType: ChartDataItem[];
  salaryRange: ChartDataItem[];
}

export default function DashboardCharts() {
  const { data, isLoading, error } = useQuery<DashboardChartsData>({
    queryKey: ["JobCharts"],
    queryFn: async () => {
      const res = await api.get("/dashboard/job/type/experience");
      return res.data.data;
    },
  });

  if (isLoading) return <Loading/>;
  if (error) return <p>Failed to load chart data.</p>;
  if (!data) return <p>No data available.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-10 space-y-4">
      {/* Pie Charts */}
      <PieChartCard
        title="Jobs by Experience Level"
        data={data.experience}
        dataKey="totalJobs"
        nameKey="experienceLevel"
      />
      <PieChartCard
        title="Jobs by Job Type"
        data={data.jobType}
        dataKey="totalJobs"
        nameKey="jobType"
      />
      <PieChartCard
        title="Salary Range Distribution"
        data={data.salaryRange}
        dataKey="totalJobs"
        nameKey="salaryRange"
      />
    </div>
  );
}

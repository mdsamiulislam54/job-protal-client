"use client"

import api from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query"


import { LayoutGrid, UserCheck, Building2, ListChecks } from "lucide-react"
import DashboardJobChart from "../DashboardJobsChart/JobChart";
import DashboardChartsPie from "../DashboardJobsChart/JobsTypeAndExp";

const DashboardHome = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ["dashboard-card"],
        queryFn: async () => {
            const res = await api.get("/dashboard/card");
            console.log(res)
            return res.data;
        }
    });

    // Loading State
    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    // Error State
    if (error) {
        return <p className="text-center py-10 text-red-500">Failed to load data!</p>;
    }

    // Dynamic stats data mapping
    const stats = [
        {
            title: "Total Jobs",
            value: data?.totalJobs,
            icon: <LayoutGrid className="w-9 h-9" />,
            color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700"
        },
        {
            title: "Active Users",
            value: data?.totalUser,
            icon: <UserCheck className="w-9 h-9" />,
            color: "bg-gradient-to-br from-green-100 to-green-200 text-green-700"
        },
        {
            title: "Employers",
            value: data?.totalEmployee,
            icon: <Building2 className="w-9 h-9" />,
            color: "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700"
        },
        {
            title: "Total Applications",
            value: data?.totalApplication,
            icon: <ListChecks className="w-9 h-9" />,
            color: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700"
        },
    ];

    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">

                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white dark:bg-gray-900 
          p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 
          hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                    >
                        <div>
                            <h2 className="text-gray-500 text-sm">{item.title}</h2>
                            <p className="text-3xl font-bold mt-1">{item.value}</p>
                        </div>

                        <div className={`${item.color} p-4 rounded-2xl shadow-inner`}>
                            {item.icon}
                        </div>
                    </div>
                ))}

            </div>

            <div className="w-full">
                {/* <div className="w-full">
                    <DashboardChartsPie />
                </div> */}
                <div className="">
                    <DashboardJobChart />
                </div>

            </div>
        </>
    );
};

export default DashboardHome;

"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api/axios"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from "@/components/Loading/Loading"

const Latest_Application_table = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["latestApplicationsDashboard"],
        queryFn: async () => {
            const res = await api.get("/dashboard/latest/application",);
            console.log(res.data)
            return res.data
        },
        staleTime: 0, 
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    if (isLoading) return <Loading />
    if (isError) return <p className="text-red-500">Error loading applications</p>

    const applications = data.application || []

    return (
        <div className="overflow-x-auto  border border-gray-200 dark:border-gray-600 p-4">
            <h1 className="syne text-2xl mb-4">Latest 10 Job Application</h1>
            <Table>
                <TableCaption>Latest Job Applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applicant Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app: any) => (
                        <TableRow key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                            <TableCell>{app.name}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>{app.title}</TableCell>
                            <TableCell>
                                {new Date(app.appliedDate).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${app.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : app.status === "Accepted"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {app.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Latest_Application_table

'use client'

import Loading from "@/components/Loading/Loading"
import { useAuth } from "@/hook/UserHook/useAuth"
import api from "@/lib/api/axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { EmployeeJobTypeTable } from "@/types/employeeTable"
import Pagination from "@/components/Pagination/Pagination"
import { CardContent } from "@/components/ui/card"
import { Label } from "@radix-ui/react-dropdown-menu"
import { X } from "lucide-react"
import { MdUpdate } from "react-icons/md"
import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
const Myjobs = () => {
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortedData, setSortedData] = useState('all')
    const { data: jobs, isError, isLoading, refetch } = useQuery({
        queryKey: ['employee-posted jobs', user?.email, currentPage, sortedData],
        queryFn: async () => {
            if (!user?.email) return []
            const res = await api.get(`/employee/posted/job/${user.email}?page=${currentPage}&limit=${10}&sort=${sortedData}`);
            setTotal(res.data?.total)
            return res.data.jobs || []
        },
        enabled: !!user?.email
    })

    if (isLoading) return <Loading />
    if (isError) return <p className="text-red-500 text-center mt-5">Failed to load jobs</p>

    const handleCancelApplication = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No",
        })

        if (result.isConfirmed) {
            try {
                await api.delete(`/application/${id}`)
                toast.success("Your application has been cancelled.")

                // refetch user application data
                refetch()
            } catch (error: any) {
                handleAxiosError(error)
            }
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-background-dark py-10 scroll-smooth">

            <div className="flex justify-between custom-container w-full mb-10 bg-background dark:bg-background-dark dark:border border-gray-500 rounded-md py-3">
                <Label className="text-sm font-semibold  flex items-center gap-1">
                    Sort By Status
                </Label>
                <CardContent className=" space-y-2 flex gap-4 items-center  ">

                    <Select

                        onValueChange={(val) => setSortedData(val)}

                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select salary range" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-background-dark bg-background">

                            <SelectItem value='all'>Sorted By All</SelectItem>
                            <SelectItem value='latest'>Latest Posted Jobs</SelectItem>
                            <SelectItem value='old'>Old Posted Jobs</SelectItem>
                            <SelectItem value='pending'>Pending</SelectItem>
                            <SelectItem value='rejected'>Reject</SelectItem>
                            <SelectItem value='accepted'>Accepts</SelectItem>

                        </SelectContent>
                    </Select>


                </CardContent>
            </div>
            <div className="custom-container overflow-x-auto bg-background dark:bg-background-dark dark:border border-gray-700 p-4 min-h-screen rounded-md">
                <Table className="min-w-full shadow ">
                    <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
                        Your Posted Jobs List
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Logo</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Category</TableHead>

                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Posted Date</TableHead>
                            <TableHead className="text-center">Deadline</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    No jobs found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs?.map((job: EmployeeJobTypeTable) => (
                                <TableRow key={job._id} className="">


                                    <TableCell>
                                        <Image src={job.companyLogo || ''} width={50} height={50} alt={job.title} />
                                    </TableCell>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.category}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-sm ${job.status === 'Pending'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            : job.status === 'Rejected'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                : job.status === 'Hired'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{job.postedDate}</TableCell>
                                    <TableCell>{job.deadline}</TableCell>
                                    <TableCell>
                                        ৳ {
                                            job.salaryRange.min
                                        } - ৳ {job.salaryRange.max}
                                    </TableCell>


                                    <TableCell className="flex justify-center gap-2">
                                        <Button className="bg-red-600 hover:bg-red-400"><MdUpdate /></Button>
                                        <Button
                                            onClick={() => handleCancelApplication(job._id)}
                                            className="bg-red-600 hover:bg-red-400"><X /></Button>

                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={total} />
        </div >
    )
}

export default Myjobs
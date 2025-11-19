"use client"
import Swal from "sweetalert2"
import { useAuth } from "@/hook/UserHook/useAuth"
import api from "@/lib/api/axios"
import { useQuery } from "@tanstack/react-query"
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
import { ApplicationType } from "@/types/applicationType"
import { Button } from "@/components/ui/button"
import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError"
import { toast } from "react-toastify"
import { useState } from "react"
import Pagination from "@/components/Pagination/Pagination"

const PendingApplication = () => {
   
    const [currentPage , setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const { data: applications, isError, isLoading, refetch } = useQuery({
        queryKey: ['pending-application',  currentPage],
        queryFn: async () => {
            const res = await api.get(`/dashboard/pending/application?page=${currentPage}&limit=${10}`);
            setTotal(res?.data?.total)
            return res?.data?.pendingApplication || []
        },
       
    })

    if (isLoading) return <Loading />
    if (isError) return <p className="text-red-500 text-center mt-5">Failed to load pending applications</p>



    const handleApplicationAction = async (id: string, action: "accept" | "reject") => {
        const confirmText =
            action === "accept"
                ? "Do you want to accept this application?"
                : "Do you want to reject this application?";

        const result = await Swal.fire({
            title: "Are you sure?",
            text: confirmText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText:
                action === "accept" ? "Yes, accept it!" : "Yes, reject it!",
            cancelButtonText: "No",
        });

        if (result.isConfirmed) {
            try {

                await api.patch(
                    `/application/${id}?${action === "accept" ? "accept=true" : "reject=true"}`
                );

                toast.success(
                    action === "accept"
                        ? "Application has been accepted."
                        : "Application has been rejected."
                );

                refetch(); 
            } catch (error: any) {
                handleAxiosError(error);
            }
        }
    };

  

    return (
        <div className="py-10 m-6">

                <div className="custom-container overflow-x-auto bg-background dark:bg-background-dark dark:border border-gray-700 p-4 rounded-md">
                <Table className="min-w-full shadow ">
                    <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
                        Your Application List
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Candidate Name</TableHead>
                            <TableHead>Candidate Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Applied Date</TableHead>
                            <TableHead className="text-center">Resume</TableHead>
                            <TableHead className="text-center">GitHub</TableHead>
                            <TableHead className="text-center">LinkedIn</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    No applications found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            applications?.map((app: ApplicationType) => (
                                <TableRow key={app._id} className="">
                                    <TableCell className="font-medium">{app.title}</TableCell>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-sm ${app.status === 'Pending'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            : app.status === 'Rejected'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                : app.status === 'Hired'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{app.appliedDate}</TableCell>
                                    <TableCell className="text-center">
                                        {app.resume ? (
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                View
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {app.github ? (
                                            <a href={app.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                GitHub
                                            </a>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {app.linkedin ? (
                                            <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                LinkedIn
                                            </a>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell className="flex justify-center gap-2">
                                        <Button
                                            onClick={() => handleApplicationAction(app._id, "accept")}>
                                            Accept</Button>
                                        <Button className="bg-red-600 hover:bg-red-400"
                                            onClick={() => handleApplicationAction(app._id, "reject")}

                                        >Reject</Button>

                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={total}/>
                 </div>
        </div >
    )
}

export default PendingApplication

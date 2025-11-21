"use client";

import api from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectValue,
} from "@/components/ui/select";

import Loading from "@/components/Loading/Loading";
import Pagination from "@/components/Pagination/Pagination";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError";
import Swal from "sweetalert2";

const Manage_Jobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sort, setSort] = useState("latest");

    const { data: jobs, refetch, isLoading } = useQuery({
        queryKey: ["all-jobs", currentPage, sort],
        queryFn: async () => {
            const res = await api.get(
                `/dashboard/manage/jobs?page=${currentPage}&limit=10&sort=${sort}`
            );
            setTotalPage(res?.data?.totalPages);
            return res?.data?.jobs;
        },
    });


    const handleAccept = async (id: string, action: "accept" | "reject") => {
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
                    `/dashboard/application/status/${id}?${action === "accept" ? "accept=true" : "reject=true"}`
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



    const handleDelete = async (id: string) => {
        await api.delete(`/dashboard/delete/job/${id}`);
        refetch();
    };
console.log(sort)
    return (
        <div className=" dark:border border-gray-600 rounded-xl m-6 max-sm:m-2">
            <CardHeader className="flex flex-row items-center justify-between my-5">
                <CardTitle className="text-xl font-bold">Manage All Jobs</CardTitle>

                {/*  Sort Filter (ShadCN) */}
                <Select value={sort} onValueChange={(value) => setSort(value)} >
                    <SelectTrigger  className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-background dark:bg-background-dark">
                        <SelectGroup>
                            <SelectLabel>Sort Options</SelectLabel>

                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="old">Old</SelectItem>
                            <SelectItem value="lowPrice">Low Salary</SelectItem>
                            <SelectItem value="highPrice">High Salary</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="accept">Accepted</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loading />
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto rounded-lg">
                        <Table>
                            <TableCaption>All Job Listings</TableCaption>

                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[100px]">Logo</TableHead>
                                    <TableHead className="min-w-[200px]">Title</TableHead>
                                    <TableHead>Salary</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {jobs?.map((job: any) => (
                                    <TableRow key={job._id}>
                                        <TableCell>
                                            <img
                                                src={job.logo}
                                                alt="logo"
                                                className="w-10 h-10 rounded-md object-cover"
                                            />
                                        </TableCell>

                                        <TableCell>{job.title}</TableCell>

                                        <TableCell>{job.salaryRange}</TableCell>

                                        <TableCell>{job.location}</TableCell>

                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${job.status === "pending"
                                                        ? "bg-yellow-200 text-yellow-700"
                                                        : "bg-green-200 text-green-700"
                                                    }`}
                                            >
                                                {job.status}
                                            </span>
                                        </TableCell>

                                        <TableCell className="flex gap-2">
                                            <Button
                                                size="sm"

                                                onClick={() => handleAccept(job._id, 'accept')}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                size="sm"

                                                onClick={() => handleAccept(job._id, 'reject')}
                                            >
                                                Reject
                                            </Button>

                                            <Button
                                                size="sm"

                                                onClick={() => handleDelete(job._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination (Optional) */}
                        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
                    </div>
                )}
            </CardContent>
        </div>
    );
};

export default Manage_Jobs;

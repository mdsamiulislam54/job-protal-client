"use client"
import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Dock, X } from "lucide-react"
import Loading from "@/components/Loading/Loading"
import Link from "next/link"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError"
import Pagination from "@/components/Pagination/Pagination"
const ApplicationTable = () => {
  const [currentPage , setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("all")
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["latestApplications", currentPage, sortBy],
    queryFn: async () => {
      const response = await api.get(`/dashboard/latest/application?page=${currentPage}&limit=${5}&sort=${sortBy}`,)
      return response.data
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <Loading />
  if (isError) return <p className="text-red-500">Error loading applications</p>

  const applications = data.application || [];
  const total = data.totalPage || 10

  console.log(total)

  const handleApplicationAction = async (id: string, action: "accept" | "reject" | "delete") => {
    // Confirm message
    let confirmText = ""
    let confirmButtonText = ""

    switch (action) {
      case "accept":
        confirmText = "Do you want to accept this application?"
        confirmButtonText = "Yes, accept it!"
        break
      case "reject":
        confirmText = "Do you want to reject this application?"
        confirmButtonText = "Yes, reject it!"
        break
      case "delete":
        confirmText = "Do you want to delete this application?"
        confirmButtonText = "Yes, delete it!"
        break
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: confirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "No",
    })

    if (result.isConfirmed) {
      try {
        if (action === "delete") {
          // DELETE request
          await api.delete(`/application/${id}?delete="true"`)
          toast.success("Application has been deleted.")
        } else {
          // PATCH request for accept/reject
          await api.patch(
            `/application/${id}?${action === "accept" ? "accept=true" : "reject=true"}`
          )
          toast.success(
            action === "accept"
              ? "Application has been accepted."
              : "Application has been rejected."
          )
        }

        // Refresh data
        refetch()
      } catch (error: any) {
        handleAxiosError(error)
      }
    }
  }


  return (
    <div className="m-6 ">

      {/* Sort Dropdown */}
      <div className="flex justify-end items-center gap-3 mb-6 ">
        <p>Sorted By</p>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)} >
          <SelectTrigger className="w-52">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-background dark:bg-background-dark">

            <SelectItem value="all">All</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="older">Older</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>

          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600 p-2  ">
        <Table>
          <TableCaption>All Job Applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app: any) => (
              <TableRow key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.contactNumber}</TableCell>
                <TableCell>{app.title}</TableCell>
                <TableCell>{app.companyName}</TableCell>
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
                <TableCell className=" space-y-4">
                  <Link href={app.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Linkedin size={16} />
                  </Link>
                  <Link href={app.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Github size={16} />
                  </Link>
                  <Link href={app.resume} target="_blank" rel="noopener noreferrer">
                    <Dock />
                  </Link>
                </TableCell>
                <TableCell className="flex gap-2">
                  {app.status === "pending" ? (
                    <>
                      <Button
                        onClick={() => handleApplicationAction(app._id, "accept")}>
                        Accept</Button>
                      <Button className="bg-red-600 hover:bg-red-400"
                        onClick={() => handleApplicationAction(app._id, "reject")}

                      >Reject</Button>
                    </>
                  ) : (
                    <Button className="bg-red-600 hover:bg-red-400"
                      onClick={() => handleApplicationAction(app._id, "reject")}

                    >Reject</Button>
                  )}
                  <Button className="bg-red-600 hover:bg-red-400"
                    onClick={() => handleApplicationAction(app._id, "delete")}

                  ><X /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

       <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={total}/>

    </div>
  )
}

export default ApplicationTable

"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
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

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import Loading from "@/components/Loading/Loading";

const ManageUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const { data: users, refetch, isLoading } = useQuery({
    queryKey: ["all-users", currentPage],
    queryFn: async () => {
      const res = await api.get(`/dashboard/get-user?page=${currentPage}&limit=${10}`);
      setTotalPage(res?.data?.total)
      return res?.data?.user;
    },
  });

  // ======== Delete User ===========
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/dashboard/delete-user/${id}`);
        toast.success("User deleted successfully");
        refetch();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  // ======== Change Role ===========
  const handleChangeRole = async (id: string, role: string) => {
    const roles = ["user", "admin", "employee"];

    // next role decide (if you want rotation)
    const nextRoleIndex = (roles.indexOf(role) + 1) % roles.length;
    const newRole = roles[nextRoleIndex];

    try {
      await api.patch(`/dashboard/change/role/${id}`, { role: newRole });
      toast.success(`Role changed to ${newRole}`);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-5 border lg:m-6 m-2 mt-10 dark:border border-gray-600 rounded-2xl">
      <h1 className="text-2xl font-bold mb-5">Manage Users</h1>

      <Table>
        <TableCaption>All registered users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </TableCell>

              <TableCell className="font-medium">{user.name}</TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                {user.role?.map((r: string) => (
                  <span
                    key={r}
                    className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 mr-1"
                  >
                    {r}
                  </span>
                ))}
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button

                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>

                <Button

                  size="sm"
                  onClick={() => handleChangeRole(user._id, user.role[0])}
                >
                  Change Role
                </Button>

                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default ManageUser;

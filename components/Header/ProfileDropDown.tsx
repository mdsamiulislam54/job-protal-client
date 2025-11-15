"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { useAuth } from "@/hook/UserHook/useAuth"
import {
  User,
  Settings,
  PlusCircle,
  FileText,
  Briefcase,
  LayoutDashboard,
  LogOut
} from "lucide-react"
import { MdApproval } from "react-icons/md"

const ProfileDropDown = () => {
  const { user } = useAuth();

  return (
    <ul className="space-y-4 syne  p-2">
      {/* ----- User Role ----- */}
      {user?.role?.includes("user") && (
        <>
          {/* <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <User size={18} />
            <Link href="/profile">My Profile</Link>
          </li> */}
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <MdApproval size={18} />
            <Link href="/user/application">My Application</Link>
          </li>
        </>
      )}

      {/* ----- Employee Role ----- */}
      {user?.role?.includes("employee") && (
        <>
          {/* <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <Settings size={18} />
            <Link href="/settings">View Profile</Link>
          </li> */}
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <PlusCircle size={18} />
            <Link href="/job-post">Post New Job</Link>
          </li>
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <FileText size={18} />
            <Link href="/employee/applications">Application List</Link>
          </li>
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <Briefcase size={18} />
            <Link href="/employee/my_applications">My Jobs Post</Link>
          </li>
        </>
      )}

      {/* ----- Admin Role ----- */}
      {user?.role?.includes("admin") && (
        <>
          <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            <LayoutDashboard size={18} />
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </>
      )}

      {/* ----- Logout ----- */}
      <li className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors cursor-pointer">
        <LogOut size={18} />
        <button onClick={() => signOut()} className="cursor-pointer">Logout</button>
      </li>
    </ul>
  )
}

export default ProfileDropDown

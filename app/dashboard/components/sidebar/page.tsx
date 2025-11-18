'use client'

import { useAuth } from '@/hook/UserHook/useAuth'
import Image from 'next/image';
import Link from 'next/link'
import { Home, FileText, Clock, Users, UserCheck, BarChart } from "lucide-react";

const SideBar = () => {
  const { user } = useAuth();

  // -------------------------
  // Menu Items in Array
  // -------------------------
  const menuItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Manage Application",
      href: "/dashboard/application",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Pending Application",
      href: "/dashboard/application/pending",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: "Manage All User",
      href: "/dashboard/manage-user",
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "Manage All Employee",
      href: "/dashboard/employee",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      label: "Application Report",
      href: "/dashboard/report",
      icon: <BarChart className="w-4 h-4" />,
    },
  ];

  return (
    <div className='flex flex-col justify-center items-center p-4 '>
      <div className='w-full flex justify-center items-center my-5'>
        <Image
          src={user?.image || ''}
          alt='profile images'
          width={100}
          height={100}
          className='rounded-md border-primary border-2'
        />
      </div>

      <ul className="space-y-5 mt-10">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link href={item.href} className="flex items-center gap-2 hover:text-primary transition  ">
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar

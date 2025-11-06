"use client"

import Link from "next/link"
import {
    User,
    UserPlus,
    Users,
    UserCog,
    Settings,
    LogOut,
    UserCircle,
    FileText,
    Briefcase,
    ShieldCheck,
} from "lucide-react"

const ProfileDropDown = () => {
    return (
        <ul className="space-y-8 syne">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <User className="text-accent" size={18} />
                <Link href="/profile">My Profile</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <UserCircle className="text-accent" size={18} />
                <Link href="/account">Account Info</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <UserPlus className="text-accent" size={18} />
                <Link href="/add-employee">Add Employee</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <Users className="text-accent" size={18} />
                <Link href="/employees">All Employees</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <UserCog className="text-accent" size={18} />
                <Link href="/manage-profile">Manage Profile</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <Briefcase className="text-accent" size={18} />
                <Link href="/projects">My Projects</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <FileText className="text-accent" size={18} />
                <Link href="/documents">Documents</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <ShieldCheck className="text-accent" size={18} />
                <Link href="/security">Security</Link>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                <Settings className="text-accent" size={18} />
                <Link href="/settings">Settings</Link>
            </li>
            <li className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
                <LogOut className="text-accent" size={18} />
                <Link href="/logout">Logout</Link>
            </li>
        </ul>
    )
}

export default ProfileDropDown

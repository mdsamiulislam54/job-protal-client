"use client"
import "../(main)/globals.css"

import SideBar from "./components/sidebar/page";
import Navbar from "./components/navbar/page";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppProviders from "./providers/appProviders";
import MobileSidebar from "./components/MobileSidebar/MobileSidebar";

export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <html lang="en" suppressHydrationWarning>

            <body className=" hero-gradient  min-h-screen relative" >

                <AppProviders>

                    {/* Desktop sidebar */}
                    <aside className={`lg:block hidden fixed inset-0 w-[238px] h-full shadow-lg dark:border-r border-gray-600`}>
                        <SideBar />
                    </aside>


                    {/* Mobile Sidebar*/}
                    <AnimatePresence>
                        {isOpen && <MobileSidebar />}
                    </AnimatePresence>

                    <main className="lg:ml-60 ">
                        <Navbar isOpen={isOpen} onToggle={handleToggle} />
                        {children}
                    </main>
                </AppProviders>
            </body>
        </html>
    );
}
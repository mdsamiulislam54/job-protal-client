"use client";

import { motion } from "framer-motion";
import SideBar from "../sidebar/page";


export default function MobileSidebar() {
    return (
        <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 w-[238px] h-full shadow-lg 
      bg-background dark:bg-background-dark z-[999] lg:hidden"
        >
            <SideBar />
        </motion.aside>
    );
}

"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Logo from "../Logo/Logo"
import Newsletter from "../NewsLetter/NewsLetter"

const Footer = () => {
    return (
        <footer className="bg-background  dark:bg-background-dark border-t-2 border-gray-200 dark:border-t-gray-700 pt-16 pb-5">

            <div className="custom-container grid grid-cols-1 md:grid-cols-4 gap-10 syne  relative">
               
                   
               
                {/* About Section */}
                <div className="space-y-5 max-sm:mt-8 max-md:flex flex-col justify-center items-center">
                    <Logo />
                    <p className="max-md:text-center">
                        Your go-to platform to find the perfect job in Bangladesh. Stay updated with the latest opportunities and career tips.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="max-md:flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 max-md:flex gap-8">
                        <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
                        <li><Link href="/jobs" className="hover:text-primary transition">Jobs</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Resources */}
                <div className="max-md:flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold mb-4">Resources</h3>
                    <ul className="space-y-2 max-md:flex gap-8">
                        <li><Link href="/" className="hover:text-primary transition">FAQ</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Blog</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Support</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="max-md:flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <div className=" space-y-2 max-md:flex gap-8 flex-wrap">
                        <p className="flex items-center gap-2">
                            <Mail size={18} className="text-primary" /> info@jobportal.com
                        </p>
                        <p className="flex items-center gap-2 font-sans">
                            <Phone size={18} className="text-primary" /> +880 1234 567890
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin size={18} className="text-primary" /> Dhaka, Bangladesh
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-400 dark:border-gray-800 mt-10 pt-6 text-center text-gray-400 dark:text-gray-200 text-sm">
                &copy; 2025 JobPortal. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer

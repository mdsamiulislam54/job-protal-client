"use client"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success(`Thank you ${formData.name}, your message has been submitted!`)
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <div className="min-h-screen py-16 ">
            <div className="custom-container ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left: Contact Info */}
                    <div className="space-y-6 bg-background dark:bg-background-dark shadow-lg dark:shadow-gray-700 lg:p-8 p-2">
                        <h2 className="text-3xl font-bold text-primary dark:text-white syne">Contact Us</h2>
                        <p className="text-gray-700 dark:text-gray-300 ">
                            Have questions or need assistance? Reach out to us and we’ll get back to you as soon as possible.
                        </p>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <p className="flex items-center gap-2">
                                <Mail size={20} /> info@jobportal.com
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone size={20} /> +880 1234 567890
                            </p>
                            <p className="flex items-center gap-2">
                                <MapPin size={20} /> Dhaka, Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Right: Feedback Form */}
                    <div className="bg-white dark:bg-background-dark shadow-lg rounded-2xl dark:shadow-gray-700 lg:p-8 p-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:text-white"
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full py-3 mt-2">Send Message</Button>
                        </form>
                    </div>
                </div>

                <div className="shadow p-2 dark:shadow-gray-700 my-10  ">

                    <iframe className="w-full h-[300px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3747017.388454255!2d87.70235500929483!3d23.489424702560214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e0!3m2!1sen!2sbd!4v1762592907299!5m2!1sen!2sbd"></iframe>

                </div>
            </div>
        </div>
    )
}

export default ContactPage

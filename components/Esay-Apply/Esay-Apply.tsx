'use client'

import { X } from "lucide-react"
import { Button } from "../ui/button"
import React, { useState, ChangeEvent } from "react"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "../ui/input"
import { useAuth } from "@/hook/UserHook/useAuth"

type EasyApplyProps = {
    onHandleIsOpen: () => void
    applicationId: string
    employeeEmail: string
}

const EasyApply: React.FC<EasyApplyProps> = ({ onHandleIsOpen, applicationId, employeeEmail }) => {
    const { user } = useAuth()

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        contactNumber: "",
        github: "",
        linkedin: "",
        resume: "",
        question: "",
        applicationId,
        employeeEmail
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleApply = () => {
        console.log(formData)
    }

    return (
        <div className=" bg-white/90 dark:bg-black dark:border-2 border-gray-500 shadow dark:shadow-gray-600 p-5 sm:w-[600px] w-full rounded-md syne">
            <div className="absolute top-4 right-4">
                <Button onClick={onHandleIsOpen}>
                    <X />
                </Button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <Label>
                            Name <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            name="name"
                            type="text"
                            className="border"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>
                            Email <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            className="border font-sans"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Contact Number */}
                <div>
                    <Label>
                        Contact Number <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        name="contactNumber"
                        type="text"
                        className="border font-sans"
                        placeholder="Enter your contact number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>

                {/* GitHub */}
                <div>
                    <Label>
                        GitHub Profile (If available) <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        name="github"
                        type="url"
                        className="border"
                        placeholder="Enter your GitHub profile link or N/A"
                        value={formData.github}
                        onChange={handleChange}
                    />
                </div>

                {/* LinkedIn */}
                <div>
                    <Label>
                        LinkedIn Profile (If available) <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        name="linkedin"
                        type="url"
                        className="border"
                        placeholder="Enter your LinkedIn profile link or N/A"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>

                {/* Resume */}
                <div>
                    <Label>
                        Resume / CV Drive Link <span className="text-red-400">*</span>
                    </Label>
                    <Input
                        name="resume"
                        type="url"
                        className="border"
                        placeholder="Enter your resume or drive link"
                        value={formData.resume}
                        onChange={handleChange}
                    />
                </div>

                {/* Question */}
                <div>
                    <Label>Any Question?</Label>
                    <Input
                        name="question"
                        type="text"
                        className="border"
                        placeholder="Write your question here..."
                        value={formData.question}
                        onChange={handleChange}
                    />
                </div>

                <Button type="button" onClick={handleApply}>
                    Apply
                </Button>
            </form>
        </div>
    )
}

export default EasyApply

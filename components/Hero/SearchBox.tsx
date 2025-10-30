"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Briefcase, Locate } from "lucide-react";
import { useState } from "react";
const SearchBox = () => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        location: "",
        category: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-4 gap-4 px-4 py-10 shadow-2xl bg-white/80  dark:shadow-gray-700 rounded-2xl dark:bg-background-dark backdrop-blur-md border border-secondary/20 md:mt-10 relative">
            <div className="absolute -top-5 left-12 -translate-x-1/2 bg-white dark:bg-background-dark  px-4 py-2  rounded-md font-bold shadow-md">
                <p>Find Job</p>
            </div>
            <div className="relative">
                <Input type="text" placeholder="Job Title, keyword" className="pl-7 " onChange={(e) => setFormData(
                    { ...formData, jobTitle: e.target.value }
                )} />
                <Briefcase size={20} className="absolute top-1/2 -translate-y-1/2 left-1 text-[--color-primary]" />
            </div>
            <div className="relative">
                <Input type="text" placeholder="Location" className="pl-7" onChange={(e)=> setFormData({
                    ...formData, location:e.target.value
                })} />
                <Locate size={20} className="absolute top-1/2 -translate-y-1/2 left-1 text-[--color-primary]" />
            </div>
            <div>
                <Select onValueChange={(value) => setFormData({
                    ...formData, category: value
                })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-background-dark rounded-md shadow-md border border-secondary/20">
                        <SelectItem value="it" className="hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ">IT & Communication</SelectItem>
                        <SelectItem value="finance" className="hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ">Finance & Banking</SelectItem>
                        <SelectItem value="education" className="hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ">Education & Training</SelectItem>
                        <SelectItem value="healthcare" className="hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ">Healthcare</SelectItem>
                        <SelectItem value="marketing" className="hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ">Marketing & Sales</SelectItem>
                    </SelectContent>

                </Select>
            </div>
            <div className="w-full">
                <Button className="w-full h-10 bg-primary hover:bg-ascent hover:text-white transition-all duration-300 syne font-bold text-white hover:text-texts cursor-pointer transition-all duration-200">
                    Search
                </Button>
            </div>
        </form>
    )
}

export default SearchBox
"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

const Aside = () => {
    return (
        <aside className=" p-4 space-y-2 ">
            {/*  Search Box */}
            <Card className="shadow-none border-none">
                <CardContent className="p-4 space-y-2">
                    <Label htmlFor="search" className="text-sm font-semibold ">Search Job</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input id="search" placeholder="Search by Job title..." className="pl-10" />
                    </div>
                </CardContent>
                {/*  Location Select */}
                <CardContent className="p-4 space-y-2">
                    <Label className="text-sm font-semibold  flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Location
                    </Label>
                    <Select >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select location" className="" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-background-dark bg-background">
                            <SelectItem value="dhaka">Dhaka</SelectItem>
                            <SelectItem value="chattogram">Chattogram</SelectItem>
                            <SelectItem value="rajshahi">Rajshahi</SelectItem>
                            <SelectItem value="khulna">Khulna</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                {/*  Salary Range */}
                <CardContent className="p-4 space-y-2">
                    <Label className="text-sm font-semibold  flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> Salary Range
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Min" type="number" />
                        <Input placeholder="Max" type="number" />
                    </div>
                </CardContent>
                {/*  Category List */}
                <CardContent className="p-4 space-y-3">
                    <Label className="text-xl syne font-semibold ">Job Categories</Label>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-primary cursor-pointer transition">Frontend Developer</li>
                        <li className="hover:text-primary cursor-pointer transition">Backend Developer</li>
                        <li className="hover:text-primary cursor-pointer transition">Full Stack Developer</li>
                        <li className="hover:text-primary cursor-pointer transition">UI/UX Designer</li>
                        <li className="hover:text-primary cursor-pointer transition">Mobile App Developer</li>
                        <li className="hover:text-primary cursor-pointer transition">DevOps Engineer</li>
                    </ul>
                </CardContent>
            </Card>


            <Button className="w-full">
                Reset Filter
            </Button>
        </aside>
    )
}

export default Aside

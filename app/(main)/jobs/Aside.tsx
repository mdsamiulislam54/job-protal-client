"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

type FilterType = {
    search: string;
    location: string;
    category: string;
    min: number;
    max: number;
    job_type:string
}

type AsideProps = {
    uniqueCategory: string[]
    uniqueLocation: string[]
    onUpdateFilter: (value: FilterType | ((prev: FilterType) => FilterType)) => void

}

const Aside: React.FC<AsideProps> = ({ onUpdateFilter, uniqueCategory, uniqueLocation }) => {


    const salaryRanges = [
        "5000-15000",
        "15000-25000",
        "25000-40000",
        "40000-60000",
    ]

    return (
        <aside className="  space-y-2 pb-4 ">
            {/*  Search Box */}
            <Card className="shadow-none border-none">
                <CardContent className="p-4 space-y-2">
                    <Label htmlFor="search" className="text-sm font-semibold ">Search Job</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                            id="search"
                            placeholder="Search by Job title..."
                            className="pl-10"
                            onChange={(e) => onUpdateFilter((prev) => ({
                                ...prev,
                                search: e.target.value
                            }))}
                        />
                    </div>
                </CardContent>
                {/*  Location Select */}
                <CardContent className="p-4 space-y-2">
                    <Label className="text-sm font-semibold  flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Location
                    </Label>
                    <Select

                        onValueChange={(val) => onUpdateFilter((prev) => ({
                            ...prev,
                            location: val
                        }))}
                    >
                        <SelectTrigger

                            className="w-full">
                            <SelectValue

                                placeholder="Select location" className="" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-background-dark bg-background">

                            {
                                uniqueLocation?.map((locate) => <SelectItem key={locate} value={locate}>{locate}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </CardContent>
                {/*  Salary Range */}
                <CardContent className="p-4 space-y-2">
                    <Label className="text-sm font-semibold  flex items-center gap-1">
                        ৳ Salary Range
                    </Label>
                    <Select

                        onValueChange={(val) => {
                            const [min, max] = val.split("-").map(Number)
                            onUpdateFilter((prev) => ({
                                ...prev,
                                min: min,
                                max: max,
                            }))

                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select salary range" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-background-dark bg-background">
                            {salaryRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                    ৳ {range}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>


                </CardContent>
                {/* job type */}
                <CardContent className="p-4 space-y-2">
                    <Label className="text-sm font-semibold  flex items-center gap-1">
                        Job Type
                    </Label>
                    <Select

                        onValueChange={(val) => {
                           
                            onUpdateFilter((prev) => ({
                                ...prev,
                               job_type:val
                            }))

                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select salary range" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-background-dark bg-background">
                           
                                <SelectItem  value='all'>All</SelectItem>
                                <SelectItem  value='part-time'>Part - Time</SelectItem>
                                <SelectItem  value='full-time'>Full - Time</SelectItem>
                                <SelectItem  value='remote'>Remote</SelectItem>
                          
                        </SelectContent>
                    </Select>


                </CardContent>
                {/*  Category List */}
                <CardContent className="p-4 space-y-3">
                    <Label className="text-xl syne font-semibold ">Job Categories</Label>
                    <ul className="space-y-2 text-sm">
                        {
                            uniqueCategory.map((cat) => <li
                                onClick={() => onUpdateFilter((prev) => ({
                                    ...prev,
                                    category: cat
                                }))}
                                key={cat}
                                className="hover:text-primary cursor-pointer transition">{cat}</li>)
                        }


                    </ul>
                </CardContent>
            </Card>


            <Button
                className="w-full mx-auto ml-1"
                onClick={() => {
                    onUpdateFilter((prev) => ({
                        ...prev,
                        search: "",
                        location: "",
                        min: 0,
                        max: 0,
                        category: "",
                    }));
                }}
            >
                Reset Filter
            </Button>



        </aside>
    )
}

export default Aside

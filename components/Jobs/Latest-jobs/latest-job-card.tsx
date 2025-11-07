"use client"
import { Button } from '@/components/ui/button'
import { JobFormType } from '@/types/jobTypes'
import { Clock8, LucideLocate, MapPin, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { format } from "date-fns";
import { TbJewishStarFilled } from "react-icons/tb";

type JobsType = {
    job: JobFormType
}
const LatestJobCard: React.FC<JobsType> = ({ job }) => {
    const { _id, salaryRange, title, logo, postedDate, deadline, jobType, location } = job
    return (
        <div className='flex justify-between items-center shadow-lg rounded-box p-4 cursor-pointer bg-background dark:bg-gray-900 '>
            <div className='flex items-center gap-4'>
                <div>
                    <Image src={logo} alt={title} width={100} height={100} className='p-4 dark:bg-gray-800 bg-gray-100  rounded-2xl' />
                </div>
                <div>
                    <h4 className='text-xl font-medium tracking-wide '>{title}</h4>
                    <div className='flex items-center gap-5'>
                        <p className='flex items-center gap-2 text-sm syne '> <MapPin size={14} /> {location}</p>
                        <p className='syne text-sm flex items-center gap-4'> <Clock8 size={14} /> {jobType}</p>
                    </div>
                    <p>{salaryRange}</p>
                </div>
            </div>
            <div>
                <div className="icon flex items-center gap-10">
                    <p className='p-2 bg-gray-100 dark:bg-gray-800 rounded-box text-primary'>
                        <TbJewishStarFilled size={25} />
                    </p>
                    <div>
                        <Button children="Apply" />
                        <p className='text-sm mt-2'>DeadLine: {format(new Date(deadline), 'dd MMM yyyy')} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCard
"use client"
import { Button } from '@/components/ui/button'
import { JobFormType } from '@/types/jobTypes'
import { Apple, Clock8, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { format } from "date-fns";
import { TbJewishStarFilled } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";

type JobsType = {
    job: JobFormType
}

const LatestJobCard: React.FC<JobsType> = ({ job }) => {
    const { salaryRange, title, logo, deadline, jobType, location } = job

    return (
        <div className='flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md hover:shadow-lg rounded-box py-6 px-4 cursor-pointer bg-background dark:bg-background-dark dark:border border-gray-700 dark:shadow-gray-800  rounded-md transition-all duration-300'>

            {/* Left Section */}
            <div className='flex items-center gap-4 w-full sm:w-2/3'>
                <div className='shrink-0'>
                    <Image
                        src={logo || "https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"}
                        alt={title}
                        width={100}
                        height={100}
                        className='p-4 dark:bg-gray-800 bg-gray-100 rounded-2xl object-contain'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg sm:text-xl font-medium tracking-wide'>{title}</h4>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm text-muted-foreground'>
                        <p className='flex items-center gap-2'><MapPin size={14} /> {location}</p>
                        <p className='flex items-center gap-2'><Clock8 size={14} /> {jobType}</p>
                    </div>
                    <p className='text-sm sm:text-base text-primary font-semibold'>{salaryRange}</p>
                </div>
            </div>

            {/* Right Section */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto justify-between sm:justify-end'>
                <div className='flex justify-end sm:justify-center'>
                    <p className='p-2 bg-gray-100 dark:bg-gray-800 rounded-box text-primary'>
                        <TbJewishStarFilled size={25} />
                    </p>
                </div>

                <div className='flex sm:flex-col flex-col-reverse items-start sm:items-end gap-2 sm:gap-3 mt-3 sm:mt-0'>
                    <Button className='w-full sm:w-auto'>Apply</Button>
                    <p className='text-xs sm:text-sm'><span className='font-medium'>Deadline:</span> {format(new Date(deadline), 'dd MMM yyyy')}</p>
                    <button className='flex items-center shadow dark:shadow-gray-600 gap-2 p-1 text-sm sm:text-base syne rounded-box cursor-pointer hover:text-primary transition-all duration-300'>
                        Details <MdArrowOutward />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCard

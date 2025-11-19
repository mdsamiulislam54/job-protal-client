"use client"
import { Briefcase, Globe2, Building2, Users } from "lucide-react";
import SearchBox from './SearchBox';
import { useSession } from 'next-auth/react';

const Hero = () => {
    const {data:session} = useSession()
    const stats = [
        {
            icon: <Briefcase size={40} className="text-[--color-primary]" />,
            count: "250+",
            label: "New Jobs",
        },
        {
            icon: <Globe2 size={40} className="text-[--color-primary]" />,
            count: "25+",
            label: "Countries",
        },
        {
            icon: <Building2 size={40} className="text-[--color-primary]" />,
            count: "150+",
            label: "Companies",
        },
        {
            icon: <Users size={40} className="text-[--color-primary]" />,
            count: "2580+",
            label: "Active Employees",
        },
    ];

  

    return (
        <div className=' min-h-screen  flex flex-col justify-center items-center hero-gradient  max-sm:pt-30 max-lg:pb-20 md:pt-40   
        '
        >
            <div className="custom-container md:space-y-10 space-y-14 flex flex-col justify-center items-center">
             <div>
                   <p className='text-center syne text-sm sm:text-md font-bold mb-4'>Discover Jobs, Careers, and New Opportunities</p>
                <h1 className="lg:text-5xl md:text-3xl text-2xl  font-extrabold text-center">
                    The Simplest Way to Land Your Dream Job
                </h1>
             </div>

                <div className=" justify-center gap-10 mt-10 grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-4">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-4  dark:shadow-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-2 rounded-full bg-[--color-ascent]/10">
                                {item.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-[--color-text] dark:text-[--color-text-dark]">
                                    {item.count}
                                </h2>
                                <p className="font-bold syne text-sm text-[--color-secondary]">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

              <div className='w-full'>
                  <SearchBox/>
              </div>
            </div>

        </div>
    )
}

export default Hero


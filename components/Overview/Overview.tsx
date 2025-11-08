"use client"
import CountUp from "react-countup"
import { BriefcaseBusiness, Users2, FileText, Building2 } from "lucide-react"

const Overview = () => {
    const overviewCard = [
        {
            title: "Jobs",
            total: 1200,
            icon: <BriefcaseBusiness className="text-primary w-8 h-8" />,
        },
        {
            title: "Members",
            total: 22000,
            icon: <Users2 className="text-primary w-8 h-8" />,
        },
        {
            title: "Resume",
            total: 18000,
            icon: <FileText className="text-primary w-8 h-8" />,
        },
        {
            title: "Company",
            total: 2000,
            icon: <Building2 className="text-primary w-8 h-8" />,
        },
    ]

    return (
        <div className="py-16 bg-primary dark:bg-primary/20 mb-10">
            <div className="custom-container">

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {overviewCard.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center bg-background dark:bg-background-dark shadow-md hover:shadow-lg rounded-2xl py-8 transition-all duration-300"
                        >
                            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                                <CountUp end={item.total} duration={5} separator="," />
                            </h3>
                            <p className="text-xl syne tracking-wide mt-1">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Overview

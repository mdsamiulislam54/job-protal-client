"use client"
import { BiSolidMessageAltError } from "react-icons/bi";

const NoticeCard = () => {
  return (
    <div className="w-full mt-10  mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-4 syne">
        <BiSolidMessageAltError color="red" size={40}/> Important Notice
      </h3>
      <p className="text-sm text-red-600 dark:text-gray-400 leading-relaxed">
        Please be cautious while applying for jobs. Do not share any personal or financial
        information with anyone before verifying the company's authenticity. This job portal
        never asks for payment or sensitive data from applicants.
      </p>
    </div>
  )
}

export default NoticeCard

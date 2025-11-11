"use client"
import { use, useState } from 'react'
import Loading from "@/components/Loading/Loading"
import { Button } from "@/components/ui/button"
import api from "@/lib/api/axios"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { toast } from "react-toastify"
import { format } from "date-fns"
import NoticeCard from '@/components/NoticeCard/NoticeCard'
import EasyApply from '@/components/Esay-Apply/Esay-Apply'

const JobDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [isOpen, setOpen] = useState(false)

  const {
    data: job,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["job-details", id],
    queryFn: async () => {
      const res = await api.get(`/job/${id}`)
      return res?.data?.job
    },
  })

  if (isLoading) return <Loading />

  if (isError) {
    toast.error("Failed to load job details")
    return (
      <p className="text-center text-red-500 dark:text-red-400 py-10">
        Something went wrong
      </p>
    )
  }

  if (!job) return null

  const {
    title,
    category,
    companyName,
    location,
    jobType,
    experienceLevel,
    WorkingHours,
    salaryRange,
    skills,
    postedDate,
    deadline,
    aboutTheJob,
    JobDescription,
    Responsibilities,
    requirements,
    benefits,
    companyLogo,
    contactEmail,
    contactMessage,
    _id
  } = job

  const handleIsOpen = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto shadow-lg rounded-2xl p-8 md:p-10 space-y-10 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4 ">
            {companyLogo && (
              <Image
                src={companyLogo}
                alt={category || "company logo"}
                width={80}
                height={80}
                className="rounded-xl border dark:border-gray-700 p-2"
              />
            )}
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{title}</h1>
              <p className="text-gray-500 dark:text-gray-300 font-medium">{companyName}</p>
              <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">
                Posted on {format(new Date(postedDate), "dd MMM yyyy")}
              </p>
            </div>
          </div>
          {/* apply section -- & deadline */}
          <div className="flex flex-col items-end gap-2">
            <Button onClick={handleIsOpen} className="w-full sm:w-auto">Easy Apply</Button>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Deadline: {format(new Date(deadline), "dd MMM yyyy")}
            </p>
          </div>
        </div>

        {/* Job Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <p><span className="font-semibold">Category:</span> {category}</p>
          <p><span className="font-semibold">Location:</span> {location}</p>
          <p><span className="font-semibold">Job Type:</span> {jobType}</p>
          <p><span className="font-semibold">Experience:</span> {experienceLevel}</p>
          <p><span className="font-semibold">Working Hours:</span> {WorkingHours}</p>
          <p><span className="font-semibold">Salary Range:</span> ৳ {salaryRange.min} - ৳ {salaryRange.max}</p>
        </div>

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">About Us</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{aboutTheJob}</p>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Job Description</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {JobDescription}
          </p>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 grid lg:grid-cols-2">
            {requirements?.map((req: string) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Skills :</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 flex flex-wrap gap-4">
            {skills?.map((req: string) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Responsibilities */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 grid lg:grid-cols-2">
            {Responsibilities?.map((res: string) => (
              <li key={res}>{res}</li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 grid lg:grid-cols-2">
              {benefits.map((ben: string) => (
                <li key={ben}>{ben}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            <span className="font-medium">Email:</span> {contactEmail}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            <span className="font-medium">Message:</span> {contactMessage} — Send Your CV/Resume to {contactEmail} / Easy Apply
          </p>
        </div>
      </div>
      <NoticeCard />

      {
        isOpen && <div className='fixed inset-0 bg-black/70  flex justify-center items-center z-999'>
            <EasyApply onHandleIsOpen={handleIsOpen} applicationId={_id} employeeEmail={contactEmail} title={title} companyName={companyName}/>
        </div>
      }
    </div>
  )
}

export default JobDetails

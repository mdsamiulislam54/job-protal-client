"use client"

import Image from "next/image"
import AboutUsImag from '@/media/aboutus.svg'

const AboutPage = () => {
  return (
    <div className="min-h-screen py-16 ">
      <div className="custom-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src={AboutUsImag}
              alt="About Us"
              className="w-full max-w-md"
              width={400}
              height={400}
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6 syne">
            <h2 className="text-3xl  syne font-bold text-primary dark:text-white">
              About JobPortal
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              JobPortal is a leading online platform dedicated to connecting talented job seekers with top employers across Bangladesh. Our mission is to streamline the job search process, provide valuable career guidance, and create meaningful opportunities for both fresh graduates and experienced professionals. Since our inception, we have been committed to delivering reliable, up-to-date, and user-friendly solutions for anyone seeking to advance their career.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Up-to-date job listings across multiple industries.</li>
              <li>User-friendly interface to make job search simple and effective.</li>
              <li>Resources and tips to help candidates prepare for interviews.</li>
              <li>Reliable platform for both fresh graduates and experienced professionals.</li>
              <li>Secure and professional communication between employers and job seekers.</li>
              <li>Support for resume uploads and career guidance.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Our goal is to provide a seamless and trustworthy experience for everyone seeking new career opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

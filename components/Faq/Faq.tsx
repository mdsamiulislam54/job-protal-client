"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// ✅ Job Portal Related FAQ Data
const jobPortalFAQ = [
  {
    question: "What is a Job Portal?",
    answer:
      "A job portal is an online platform that connects job seekers with employers. It allows users to search and apply for jobs, and helps companies post and manage job listings.",
  },
  {
    question: "How can I apply for a job through the portal?",
    answer:
      "To apply for a job, you need to create an account, complete your profile, upload your resume, and then click the 'Apply' button on your desired job listing.",
  },
  {
    question: "Can employers manage applications on the portal?",
    answer:
      "Yes, employers can view, shortlist, and manage all received applications directly from their dashboard. They can also contact candidates through the portal.",
  },
  {
    question: "Is there any fee to use the job portal?",
    answer:
      "Most job portals offer free registration for job seekers. However, some premium features like resume boosting or priority listings may require payment.",
  },
  {
    question: "How often are job listings updated?",
    answer:
      "Job listings are updated daily by employers and administrators to ensure users always get access to the latest opportunities.",
  },
]

const Faq = () => {
  return (
    <section className="py-16 ">
      <div className="custom-container syne">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="">
          {jobPortalFAQ.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className=" text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default Faq

"use client"
import { testimonialsData } from "@/lib/utils"
import Image from "next/image"
import { TbStarFilled } from "react-icons/tb"
import { motion } from "framer-motion"

const Testimonial = () => {
  return (
    <div className="py-16 ">
      <div className="custom-container">
        <h2 className="text-3xl font-bold text-center mb-10 ">
          What Our Users Say
        </h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex m-4 gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20, 
              repeat: Infinity,
            }}
          >
            {[...testimonialsData, ...testimonialsData].map((feedback, index) => (
              <div
                key={index}
                className="w-[400px] h-[350px] bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 flex-shrink-0"
              >
                <div className="flex justify-center items-center mb-2">
                  <Image
                    src={feedback.image}
                    width={70}
                    height={70}
                    alt={feedback.name}
                    className="rounded-full border-primary border-2"
                  />
                </div>

                <p className="text-gray-600 dark:text-gray-300 italic mb-4 text-center">
                  "{feedback.text}"
                </p>

                <div className="flex items-center gap-1 mb-2 justify-center">
                  {Array.from({ length: feedback.star }).map((_, i) => (
                    <TbStarFilled key={i} className="text-yellow-400" />
                  ))}
                </div>

                <p className="font-semibold text-primary text-center">{feedback.location}</p>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">{feedback.date}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial

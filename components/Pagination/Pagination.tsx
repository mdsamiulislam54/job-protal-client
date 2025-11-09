"use client"

import { Button } from "@/components/ui/button"
import React from "react"

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-6">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-primary text-white hover:bg-primary/90 transition-all rounded-xl px-4"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-xl px-4 ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-primary hover:text-white"
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-primary text-white hover:bg-primary/90 transition-all rounded-xl px-4"
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination

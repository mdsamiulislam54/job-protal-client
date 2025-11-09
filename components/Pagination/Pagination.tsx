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
  if (totalPages <= 1) return null

  const generatePages = () => {
    const pages: (number | string)[] = []

    // Always show first page
    if (currentPage > 3) pages.push(1)

    // Add left ellipsis
    if (currentPage > 4) pages.push("...")

    // Pages around current
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(i)
      }
    }

    // Add right ellipsis
    if (currentPage < totalPages - 3) pages.push("...")

    // Always show last page
    if (currentPage < totalPages - 2) pages.push(totalPages)

    return pages
  }

  const pages = generatePages()

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
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1 text-gray-500 select-none">
              ...
            </span>
          ) : (
            <Button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`rounded-xl px-4 ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-primary hover:text-white"
              }`}
            >
              {page}
            </Button>
          )
        )}
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

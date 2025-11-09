"use client"
import JobBanner from '@/components/Jobs/job/job-banner'
import Aside from './Aside'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api/axios'
import Pagination from '@/components/Pagination/Pagination'
import LatestJobCard from '@/components/Jobs/Latest-jobs/latest-job-card'
import { JobFormType } from '@/types/jobTypes'
import Loading from '@/components/Loading/Loading'

const JobPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState({
    search: '',
    location: '',
    category: '',
    min: 0,
    max: 0
  })
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-jobs", currentPage, filterData],

    queryFn: async () => {
      const query = encodeURIComponent(JSON.stringify(filterData));
      const res = await api.get(`/all-jobs?page=${currentPage}&limit=${5}&filter=${query}`, {
       headers: { 'Cache-Control': 'no-cache' }
      });
      return res?.data
    },
    staleTime: 0,
    
    refetchOnWindowFocus: false,

  })

  const totalPage = data?.total || 1;
  const jobs = data?.jobsData || [];
  const uniqueCategory = data?.uniqueCategory || []
  const uniqueLocation = data?.uniqueLocation || []

  console.log(data)

  return (
    <div className='min-h-screen '>
      <JobBanner />
      <div className="custom-container my-10">
        <div className='grid grid-cols-12 gap-10'>
          <div className='md:col-span-4 min-h-screen'>
            <Aside uniqueCategory={uniqueCategory} uniqueLocation={uniqueLocation} onUpdateFilter={setFilterData} />
          </div>
          <div className='md:col-span-8 min-h-screen'>

            <div className='grid grid-cols-1 gap-4'>

              {isLoading && <Loading />}
              {error && (
                <p className="text-red-500 font-semibold text-center">
                  {(error as any)?.message || "Something went wrong!"}
                </p>
              )}
              {


                jobs.map((job: JobFormType) => <LatestJobCard key={job._id} job={job} />)


              }
            </div>

          </div>
        </div>
      </div>
      {!isLoading && !error && totalPage > 0 && (
        <Pagination onPageChange={setCurrentPage} currentPage={currentPage} totalPages={totalPage} />
      )}
    </div>
  )
}

export default JobPage
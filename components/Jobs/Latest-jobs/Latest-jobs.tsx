'use client'
import { Button } from '@/components/ui/button'
import api from '@/lib/api/axios'
import { useQuery } from '@tanstack/react-query'
import LatestJobCard from './latest-job-card'
import { JobFormType } from '@/types/jobTypes'
import Loading from '@/components/Loading/Loading'

const LatestJobs = () => {

    const { data: jobs,  isError, isLoading } = useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            const res = await api.get('/job')
            return res?.data?.jobs ?? []
        },
    })

    if (isLoading) return <Loading />
    if (isError) return <p className="text-red-500">Error loading applications</p>

    return (
        <div className='py-16 bg-gray-50 dark:bg-background-dark'>
            <div className="custom-container">
                <div className='flex justify-between items-center mb-20'>
                    <div >
                        <h3 className='text-3xl max-sm:text-xl font-bold syne mb-2'>Latest Jobs</h3>
                        <span className='font-bold tracking-wider'>100+</span>
                    </div>
                    <div>
                        <Button children="See All Jobs" />
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-10'>
                    {
                        jobs?.map((job: JobFormType) => <LatestJobCard key={job._id} job={job} />)
                    }


                </div>
            </div>
        </div>
    )
}

export default LatestJobs
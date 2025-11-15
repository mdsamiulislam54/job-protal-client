import React from 'react'

import DashboardCharts from '../components/DashboardJobsChart/JobsTypeAndExp'
import DashboardJobChart from '../components/DashboardJobsChart/JobChart'
import JobsPerDayChart from '../components/DashboardJobsChart/JobPostPerMonthChart'

const Report = () => {
    return (
        <div className='px-4 '>
            <div className='space-y-4'>

                <DashboardCharts />
                <JobsPerDayChart />
                <DashboardJobChart />
            </div>
        </div>
    )
}

export default Report
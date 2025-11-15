'use client'
import Link from 'next/link'

const SideBar = () => {
  return (
    <div className='flex flex-col p-4'>
        <Link href={'/dashboard'}>Home</Link>
        <Link href={'/dashboard/application'}>Application</Link>
        <Link href={'/dashboard/analyst'}>Analyst</Link>
    </div>
  )
}

export default SideBar
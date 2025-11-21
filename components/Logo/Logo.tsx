"use client"
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href={'/'} className='syne lg:text-2xl md:text-xl sm:text-lg font-bold '>
            
            <span className='p-1 bg-primary rounded-tr-3xl rounded-bl-3xl text-text-dark
            '>Next</span>
            <span>Hire</span>
        </Link>
    )
}

export default Logo
'use client'
import { ModeToggle } from '@/components/ToggleMode/ToggleMode'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hook/UserHook/useAuth'
import { BellRing, Home, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    const {user} = useAuth()
    return (
        <div className='w-full p-4 shadow dark:border-b border-gray-700'>
            <div className='flex justify-between'>

                <CardContent className=" space-y-2">

                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                            id="search"
                            placeholder="Search by Job title..."
                            className="pl-10"
                        // onChange={(e) => onUpdateFilter((prev) => ({
                        //     ...prev,
                        //     search: e.target.value
                        // }))}
                        />
                    </div>
                </CardContent>

                <div className='flex items-center gap-4'>
                     <Link href={'/'} className='p-2 bg-primary rounded-md text-white'>
                        <Home  className='' size={20}/>
                    </Link>
                    <ModeToggle />
                    <div className='p-2 bg-primary rounded-md text-white'>
                        <BellRing  className='' size={20}/>
                    </div>
                    <div>
                        <Image src={user?.image || ''} alt='profile images' width={45} height={45} className='rounded-full border-primary border'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
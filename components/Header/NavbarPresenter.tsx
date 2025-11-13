"use client"
import { NavItem } from '@/types/navItem'
import Logo from '../Logo/Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ModeToggle } from '../ToggleMode/ToggleMode';
import { Menu, X } from 'lucide-react';
import MobileNavbar from './MobileNavbar';
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import ProfileDropDown from './ProfileDropDown';


type Props = {
    navItem: NavItem[];
    scrollY: number;
    isOpen: boolean;
    pathName: string;
    handleOpenMenu: () => void;
    isDropDownMenu: boolean
    handleDropDownMenu: () => void
}

export const NavbarPresenter = ({ scrollY, navItem, isOpen, pathName, handleOpenMenu, isDropDownMenu, handleDropDownMenu }: Props) => {
    const { data: session } = useSession()
    return (
        <>
            <nav className={`py-4 z-100 
        ${scrollY > 0 ? "fixed-nav bg-background dark:bg-background-dark relative shadow " : pathName === '/' ? " bg-transparent  absolute inset-0 w-full" : "shadow-md dark:shadow-gray-800 bg-background-light dark:bg-background-dark  "}
        
        `}>
                <div className="px-4  flex justify-between items-center ">
                    <div>
                        <Logo />
                    </div>
                    <div className='lg:flex hidden items-center gap-4  '>
                        {
                            navItem.map((item) => {

                                return (
                                    <Link href={item.href} key={item.href} className='
                                flex  items-center gap-2 font-bold tracking-wide
                                '>
                                        {item.icon ? <item.icon size={20} className="inline text-primary" /> : null}
                                        <span>
                                            {item.name}
                                        </span>
                                    </Link>
                                )
                            })
                        }
                    </div>

                    <div className='flex items-center gap-2'>
                        <ModeToggle />
                        {
                            !session?.user ? (
                                <div className='flex gap-2'>
                                    <Link href="/auth/login" >
                                        <Button children="Login" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne hidden lg:block ' />
                                    </Link>
                                    <Link href={'/auth/register'}>
                                        <Button children="Registration" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne hidden lg:block ' />
                                    </Link>
                                </div>
                            ) : (

                                <button onClick={handleDropDownMenu} >
                                    <Image src={session.user.image || ''} width={100} height={100} alt={session.user.name as string} className='w-10 h-10 rounded-full border-2 border-dotted border-primary flex justify-center items-center cursor-pointer' />
                                </button>

                            )


                        }
                        <Button size="icon" onClick={handleOpenMenu} className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne  font-bold flex lg:hidden '>
                            {isOpen ? <X /> : <Menu />}
                        </Button>

                    </div>
                </div>


            </nav>
            {/* Responsive   menu */}
            <AnimatePresence>
                {
                    isOpen ? (
                        <MobileNavbar navItem={navItem} handleOpenMenu={handleOpenMenu} isOpen={isOpen} />
                    ) : (
                        null
                    )
                }
            </AnimatePresence>

            {/* Profile DropDown menu */}
            <AnimatePresence>
                {
                    isDropDownMenu ? (
                        <motion.div
                            initial={{ x: '100%', scale: 0.9 }}
                            animate={{ x: 0, scale: 1 }}
                            exit={{ x: '100%', scale: 0.9 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className='fixed top-[72px] shadow-2xl right-0 w-2/12  z-999 bg-background dark:bg-background-dark dark:border-l-2 border-gray-700 p-4 '>
                            {/* <div className='w-full flex justify-end p-4'>
                                <Button onClick={handleDropDownMenu}><X /></Button>
                            </div> */}
                            <ProfileDropDown />
                        </motion.div>
                    ) : (
                        null
                    )
                }
            </AnimatePresence>
        </>
    )
}

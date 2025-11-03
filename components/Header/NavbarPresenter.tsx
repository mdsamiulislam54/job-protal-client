"use client"
import { NavItem } from '@/types/navItem'
import Logo from '../Logo/Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ModeToggle } from '../ToggleMode/ToggleMode';
import { Menu, X } from 'lucide-react';
import MobileNavbar from './MobileNavbar';
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    navItem: NavItem[];
    scrollY: number;
    isOpen: boolean;
    pathName: string;
    handleOpenMenu: () => void;
}

export const NavbarPresenter = ({ scrollY, navItem, isOpen, pathName, handleOpenMenu }: Props) => {

    return (
        <nav className={`py-4 
        ${scrollY > 0 ? "fixed-nav bg-background dark:bg-background-dark" : pathName === '/' ? "bg-Primary  absolute top-0 w-full" : "shadow-md dark:shadow-gray-800 bg-background-light dark:bg-background-dark  "}
        
        `}>
            <div className="custom-container  flex justify-between items-center ">
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
                    <Link href="/auth/login" >
                        <Button children="Login" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne hidden lg:block ' />
                    </Link>
                    <Link href={'/auth/register'}>
                        <Button children="Registration" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne hidden lg:block ' />
                    </Link>
                    <Button size="icon" onClick={handleOpenMenu} className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne  font-bold flex lg:hidden '>
                        {isOpen ? <X /> : <Menu />}
                    </Button>

                </div>
            </div>
            <AnimatePresence>
                {
                    isOpen ? (
                        <MobileNavbar navItem={navItem} handleOpenMenu={handleOpenMenu} />
                    ) : (
                        null
                    )
                }
            </AnimatePresence>

        </nav>
    )
}

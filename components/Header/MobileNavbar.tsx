
import { NavItem } from '@/types/navItem'
import Link from 'next/link';
import Logo from '../Logo/Logo';
import { Button } from '../ui/button';
import {motion} from "framer-motion";
type Props = {
    navItem: NavItem[];
    handleOpenMenu: () => void;
}
const MobileNavbar = ({ navItem, handleOpenMenu }: Props) => {
    return (
        <motion.div
        initial={{ x: '-100%', scale: 0.9 }}
        animate={{ x: 0, scale: 1 }}
        exit={{ x: '-100%', scale: 0.9 }}
        transition={{ type: 'tween', duration: 0.3 }}
        
        className='fixed top-0 left-0 w-[50%] sm:w-[30%] z-100 hero-gradient shadow h-full block lg:hidden'>
            <div className='p-4 flex flex-col gap-6 mt-10'>

                <Logo />
                {
                    navItem.map((item) => {
                        return (
                            <Link href={item.href}
                                onClick={handleOpenMenu}
                                key={item.href} className='
                            flex  items-center gap-2 font-bold tracking-wide

                            '>
                                {item.icon ? <item.icon size={20} className="inline text-primary" /> : null}
                                <span>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    }
                    )
                }

               <div className='flex flex-col gap-4 mt-4'>
                 <Button children="Login" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne ' />
                <Button children="Registration" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne ' />
               </div>
            </div>
        </motion.div>
    )
}

export default MobileNavbar
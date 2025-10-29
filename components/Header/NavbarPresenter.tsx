import { NavItem } from '@/types/navItem'
import Logo from '../Logo/Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ModeToggle } from '../ToggleMode/ToggleMode';
type Props = {
    navItem: NavItem[];
    scrollY: number;
    isOpen: boolean;
    pathName: string
}

export const NavbarPresenter = ({ scrollY, navItem, isOpen, pathName }: Props) => {
    console.log(scrollY)
    return (
        <nav className={`py-4 
        ${scrollY > 0 ? "fixed-nav bg-primary" : pathName === '/' ? "bg-Primary  absolute top-0 w-full" : ""}
        
        `}>
            <div className="custom-container  flex justify-between items-center ">
                <div>
                    <Logo />
                </div>
                <div className='flex items-center gap-4'>
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
                    <Button children="Login" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne '/>
                    <Button children="Registration" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne ' />
                </div>
            </div>
        </nav>
    )
}

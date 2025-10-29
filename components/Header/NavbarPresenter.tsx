import { NavItem } from '@/types/navItem'
import Logo from '../Logo/Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ModeToggle } from '../ToggleMode/ToggleMode';
type Props = {
    navItem: NavItem[];
    scrollY: number;
    isOpen: boolean
}

export const NavbarPresenter = ({ scrollY, navItem, isOpen }: Props) => {
    return (
        <nav className='py-2'>
            <div className="custom-container  flex justify-between items-center">
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
                                  {item.icon ? <item.icon size={20} className="inline" /> : null}
                                  <span>
                                    {item.name}
                                  </span>
                                </Link>
                            )
                        })
                    }
                </div>

                <div>
                    <ModeToggle/>
                    <Button children="Login"/>
                    <Button children="Registration"/>
                </div>
            </div>
        </nav>
    )
}

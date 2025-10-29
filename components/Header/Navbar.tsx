"use client"

import { Home, Briefcase, Building2, Info, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavbarPresenter } from "./NavbarPresenter";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const pathName  = usePathname()
  useEffect(() => {

    const handleScrollY = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScrollY);
    return () => window.removeEventListener('scroll', handleScrollY);
  }, [])

  const navItem = [
    { name: "Home", href: "/", icon: Home },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Companies", href: "/companies", icon: Building2 },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

const handleOpenMenu = () => {
  setIsOpen(!isOpen);
}

  return (
    <div>
      <NavbarPresenter
        navItem={navItem}
        scrollY= {scrollY}
        isOpen = {isOpen}
        handleOpenMenu={handleOpenMenu}
        pathName={pathName}
      />
    </div>
  )
}

export default Navbar
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  size="icon" className='text-white cursor-pointer hover:bg-ascent hover:text-text transition-all duration-200 syne ' >
          <Sun className="h-[1.2rem] w-[1.2rem] text-text-dark scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-none dark:bg-linear-to-r from-primary/20 to-black">
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-primary syne text-md font-bold hover:text-text-dark cursor-pointer flex justify-center transition-all duration-200">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-primary syne text-md font-bold hover:text-text-dark cursor-pointer flex justify-center transition-all duration-200">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-primary syne text-md font-bold hover:text-text-dark cursor-pointer flex justify-center transition-all duration-200">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

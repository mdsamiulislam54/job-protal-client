"use client"
import Logo from "@/components/Logo/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
import Link from "next/link"
import api from "@/lib/api/axios"
import { toast } from "react-toastify"

import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError"



const RegisterPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    photoUrl: '',
    email: '',
    password: ''

  })


 


  const handleRegister = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const form = e.target
    try {
      const res = await api.post(`/create-user`, formData);
      if (res.status === 200) {
        toast.success("Your Registration Successfully!")
        setFormData({
          role: '',
          name: '',
          photoUrl: '',
          email: '',
          password: ''
        })
        
      }
    } catch (error) {
      handleAxiosError(error)
    }



  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <form onSubmit={handleRegister} className="  shadow-lg dark:shadow-purple-900 p-4 sm:w-[500px] w-full rounded-lg">
        <div className="space-y-7">
          <div className="flex flex-col justify-center items-center gap-2">
            <Logo />
            <h1 className="text-xl font-bold syne">Register</h1>


          </div>
          {/* whats is your role user or employee */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">

              <div className="flex gap-4 items-center syne ">
                <span className="font-medium syne">Register as</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="user"
                    className="cursor-pointer w-5 h-5 "
                    onChange={() => setFormData({ ...formData, role: 'user' })}
                  />
                  <label className="cursor-pointer">User</label>
                </div>
                <div className="flex items-center gap-2">
                  <Input

                    type="radio"
                    name="role"
                    value="employee"
                    className="cursor-pointer w-5 h-5 "
                    onChange={() => setFormData({ ...formData, role: 'employee' })}
                  />
                  <label className="cursor-pointer">Employee</label>
                </div>
              </div>
            </div>
          </div>
          {/* name */}
          <Input type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} placeholder="Enter Your Name.." />
          {/* photo url  */}
          <Input type="text" onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} value={formData.photoUrl} placeholder="Enter Your Photo URL.." />
          {/* email */}
          <Input type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} placeholder="Enter Your Email.." />

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} placeholder="Enter Your Password.." />

            {/* password show */}
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </span>
          </div>
          {/* login button */}
          <Button type="submit" className="w-full text-white cursor-pointer text-md">Register</Button>

          {/* login with google button  */}
          <Button type="button" className="w-full text-white cursor-pointer bg-black"><FcGoogle /> Login with Google</Button>

          <p className="flex justify-center">
            Already have an account? <Link href="/auth/login" className="text-blue-600 dark:text-primary ml-2 underline  cursor-pointer">Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
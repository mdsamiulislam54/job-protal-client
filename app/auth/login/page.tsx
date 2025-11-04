"use client"
import Logo from "@/components/Logo/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
import Link from "next/link"
import { sign } from "crypto"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import { handleAxiosError } from "@/lib/handleAxiosError/handleAxiosError"
import { useRouter, useSearchParams } from "next/navigation"


const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || '/'
    // handle credential
    const handleCredential = (type: string) => {
        if (type === 'user') {
            setFormData((prev) => {
                return {
                    ...prev,
                    email: 'samiulm5332@gmail.com',
                    password: 'Samiul1234'
                }
            })
        } else if (type === 'employee') {
            setFormData((prev) => {
                return {
                    ...prev,
                    email: 'employee@gmail.com',
                    password: 'Employee1234'
                }
            })
        } else if (type === 'admin') {
            setFormData((prev) => {
                return {
                    ...prev,
                    email: 'admin@gmail.com',
                    password: 'Admin1234'
                }
            })
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (res?.error) {
            handleAxiosError(res.error);
        } else {
            toast.success("Login Successfully!", {
                onClose: () => {
                    router.push(callbackUrl || '/')
                }
            });


        }
    };


    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <form onSubmit={handleLogin} className="  shadow-lg dark:shadow-purple-900 p-4 sm:w-[500px] w-full rounded-lg">
                <div className="space-y-7">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Logo />
                        <h1 className="text-xl font-bold syne">Login</h1>
                        {/* login credential */}
                        <div className="flex  gap-2 syne text-white *:cursor-pointer">
                            <Button type="button" onClick={() => handleCredential("user")}>User</Button>
                            <Button type="button" onClick={() => handleCredential("employee")}>Employee</Button>
                            <Button type="button" onClick={() => handleCredential("admin")}>Admin</Button>
                        </div>
                    </div>
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
                    <Button type="submit" className="w-full text-white cursor-pointer">Login</Button>
                    {/* login with google button  */}
                    <Button type="button" className="w-full text-white cursor-pointer bg-black"><FcGoogle /> Login with Google</Button>

                    <p className="flex justify-center">
                        Don't have an account? <Link href={'/auth/register'} className="text-blue-600 dark:text-primary ml-2 underline cursor-pointer">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
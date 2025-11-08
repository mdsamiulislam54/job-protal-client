"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import { Input } from "../ui/input"

const Newsletter = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            toast.success(`Thank you for subscribing with ${email}!`)
            setEmail("")
        }
    }

    return (
        <section className="my-16 py-16 bg-primary dark:bg-primary/20 text-white ">
            <div className="custom-container text-center">
                <h2 className="text-3xl font-bold mb-4 ">
                    Subscribe to our Newsletter
                </h2>
                <p className="mb-8 text-gray-100 dark:text-gray-300">
                    Get the latest job updates and career tips delivered straight to your inbox.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto"
                >
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button type="submit" className="px-6 py-5 bg-white text-black">
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default Newsletter

"use client"

import { Suspense } from "react"
import LoginPages from '@/components/LoginPage/LoginPage'
const LoginPage = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPages />
        </Suspense>
    )
}

export default LoginPage
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest) {
    const token = await getToken({req, secret:process.env.NEXT_AUTH_SECRET});
    const {pathname} = req.nextUrl
    if(!token){
        const redirectUrl = new URL('/auth/login', req.url);
        redirectUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(redirectUrl)
    }
    
    return NextResponse.next()
}

export const config ={
    matcher:["/about",'/job/:path*', '/user/:path*','/employee/:path*']
}
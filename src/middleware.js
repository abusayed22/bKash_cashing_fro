import { NextResponse } from "next/server";




export async function middleware(req) {
    const token = req.cookies.get('accessToken'); 
    
    if(!token) {
        return NextResponse.redirect(new URL('/auth/login',req.url))
    } else {
        return NextResponse.next()
    }
}

// Apply middleware only to certain paths (Optional: improves performance)
export const config = {
    matcher: ['/dashboard/:path*', '/clientAdd/:path*', '/clientList/:path*','/history/:path*','/receivedMoney/:path*','/sendMoney/:path*',],
};


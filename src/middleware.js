'use server'
import { NextResponse } from 'next/server';



export async function middleware(req) {
   console.log('middleware start')
    const token = req.cookies.get('accessToken'); 
    

    if(!token) {
        return NextResponse.redirect(new URL('/auth/login',req.url))
    };
    console.log('middleware end')
    NextResponse.next()
}

// Apply middleware only to certain paths (Optional: improves performance)
export const config = {
    matcher: ['/dashboard/:path*', '/clientAdd/:path*', '/clientList/:path*','/history/:path*','/receivedMoney/:path*','/sendMoney/:path*',],
};
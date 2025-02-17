"use server"

import prisma from "@/src/lib/globalPrisma";
import { CreateToken } from "@/src/utility/tokenHelper";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt';




// login routing point 
export const isLogin = async (email, password) => {
    try {
        
        const existUser = await prisma.admin.findUnique({
            where: {
                email:email
            }
        });

       if(!existUser){
        return {status: 401,message: "User Not Exist!."}
       }

        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch){
            return {status: 401,message: "Incorrect Password"}
        }

        if(existUser){
            const token = await CreateToken(existUser.email, existUser.id)
            const cookieStore = await cookies()
            cookieStore.set('accessToken', token)
            return {status: 200,message:'Login Successfully.'}
        } else {
            return {status: 404,message:'User No Exist!.'}
        }
    } catch (error) {
        return {status: 500,message:`Something wrong!: ${error}`}
    }
}





// Check if access token is expired and refresh it if necessary
async function fetchWithRefresh(url, options = {}) {
    const token = localStorage.getItem('accessToken'); // Or from cookies
    console.log(token)


    if (!token) {
        throw new Error('No access token available');
    }

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            // If token is expired, try refreshing it
            const refreshRes = await fetch(`${PATH}/auth/refresh-token`, {
                method: 'POST',
            });

            if (refreshRes.ok) {
                const { accessToken } = await refreshRes.json();
                localStorage.setItem('accessToken', accessToken);

                // Retry the original request with the new token
                return fetchWithRefresh(url, options);
            } else {
                throw new Error('Unable to refresh token');
            }
        }

        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Authentication error');
    }
}
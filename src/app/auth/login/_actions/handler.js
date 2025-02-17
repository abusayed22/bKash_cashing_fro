"use server"

import prisma from "@/src/lib/globalPrisma";
import { CreateToken } from "@/src/utility/tokenHelper";
import { cookies } from "next/headers";




// login routing point 
export const isLogin = async (email, password) => {
    try {
        const isUser = await prisma.admin.findUnique({
            where: {
                email: email,
                password: password
            }
        });
        

        const countUser = await prisma.admin.count({
            where: {
                email: email
            }
        })
        

        if (countUser > 0) {
            const token = await CreateToken(isUser.email, isUser.id)
            const cookieStore = await cookies()
            cookieStore.set('accessToken', token)
            console.log('token seted')
        }
        return true
    } catch (error) {
        console.error(error)
        return false
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
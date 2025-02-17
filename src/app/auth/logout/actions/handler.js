'use server';
import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { TokenDecoded } from "@/src/utility/tokenHelper";
import { deleteCookie, getCookie } from "cookies-next";
import { cookies } from "next/headers";


export const LogoutAction = async () => {
    try {
        const cookie = await cookies();
        const token = cookie.get('accessToken');
        const decoded = await TokenDecoded(token?.value);
        const {email,id} = decoded || {};

        // Update token to empty
        const updatedAdmin = await prisma.admin.update({
            where: {
                id: parseInt(id),
                email: email
            },
            data: {
                token: ''
            }
        });

        cookie.delete('accessToken', {
            path: '/', 
            secure: true,
            sameSite: 'strict'
        });

        return { message: 'Logged out successfully' };
    } catch (error) {
        console.error("Error updating admin:", error);  
        return { error: error.message };
    }
};
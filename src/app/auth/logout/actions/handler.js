'use server';
import { MAIN_PATH } from "@/src/utility/enviroment";
import { TokenDecoded } from "@/src/utility/tokenHelper";
import { deleteCookie, getCookie } from "cookies-next";


export const LogoutAction = async () => {
    try {
        

    } catch (error) {
        console.error('Error during logout:', error);
    }
};
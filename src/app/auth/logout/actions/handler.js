'use client';
import { MAIN_PATH } from "@/src/utility/enviroment";
import { TokenDecoded } from "@/src/utility/tokenHelper";
import { deleteCookie, getCookie } from "cookies-next";


export const LogoutAction = async () => {
    try {
        // const {} = TokenDecoded();
        const token = getCookie('accessToken');
        // console.log(token);

        const decodedToken = await TokenDecoded(token);
        const { id, email } = decodedToken;
        const response = await fetch(`${MAIN_PATH}/auth/logout?id=${id}&email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json()


        if (response.status === 200) {
            deleteCookie('accessToken');
            alert('Logout Successfully.')
            window.location.reload()
        } else {
            const errorData = await response.json();
            console.error('Logout failed:', errorData.message);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
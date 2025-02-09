'use server';


import { PATH } from "@/src/utility/enviroment";
// import { getCookie } from "cookies-next";
import { cookies } from "next/headers";



export const ClientAdd = async (dataObj) => {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken');
        // console.log(token)
        const response = await fetch(`${PATH}/client`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify(dataObj)
        })
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
    }
}
'use server'
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";


export const SendMoneyAdd = async (dataObj) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken');
        // console.log(token)

        const response = await fetch(`${MAIN_PATH}/sendmoney`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                "Accept": "application/json", // Ensure proper headers
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify(dataObj),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error submitting data');
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

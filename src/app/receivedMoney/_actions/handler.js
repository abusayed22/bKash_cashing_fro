'use server'
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";




export async function ReceivedMoneyAdd(dataObj) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken');
        const response = await fetch(`${MAIN_PATH}/receivedmoney`, {
            cache: 'no-cache',
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
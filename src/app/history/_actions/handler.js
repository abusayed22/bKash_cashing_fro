'use server'
import { MAIN_PATH } from "@/src/utility/enviroment";
// import { getCookie } from "cookies-next";
import { cookies } from 'next/headers'



// get all clients list DATA 
export const GetAllHistories = async (page, limit) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    // console.log(token)
    const response = await fetch(`${MAIN_PATH}/history?page=${page}&limit=${limit}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Accept": "application/json", // Ensure proper headers
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}
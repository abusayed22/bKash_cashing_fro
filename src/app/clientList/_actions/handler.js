'use server'

import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";



export const PatchClients = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    console.log('token ', token)
    const response = await fetch(`${MAIN_PATH}/client`, {
      method: "PATCH",
      cache: "no-store", // You may not need "no-store" unless it's necessary
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token.value}`
      },
    });
    console.log('res',response)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('json',data)
    return data;
  } catch (error) {
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}


// get all clients list DATA 
export const GetAllClients = async (page, limit) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    // console.log('token ', token)
    const response = await fetch(`${MAIN_PATH}/client?page=${page}&limit=${limit}`, {
      method: "GET",
      cache: "no-store", // You may not need "no-store" unless it's necessary
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
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
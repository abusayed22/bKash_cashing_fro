'use server'

import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";
// import { getCookie } from 'cookies-next';


export const GetDashboardData = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    // const token = getCookie('accessToken');
    const response = await fetch(`${MAIN_PATH}/dashboard`, {
      method: "GET",
      cache: "no-store", // You may not need "no-store" unless it's necessary
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token?.value}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Dashboard data fetching error:', error)
  }
}
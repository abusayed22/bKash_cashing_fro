import { Path } from "@/utility/enviroment";



export const GetDashboardData = async () => {
    try {
        const response = await fetch(`${Path}/dashboard`, {
              method: "GET",
              cache: "no-store", // You may not need "no-store" unless it's necessary
              headers: {
                "Accept": "application/json", // Ensure proper headers
                "Content-Type": "application/json",
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
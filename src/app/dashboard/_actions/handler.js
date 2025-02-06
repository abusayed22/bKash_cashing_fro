import { PATH } from "@/utility/enviroment";



export const GetDashboardData = async () => {
    try {
        const response = await fetch(`${PATH}/dashboard`, {
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
        
    }
}
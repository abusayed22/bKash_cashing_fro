import { Path } from "@/src/utility/enviroment";



// get all clients list DATA 
export const GetAllHistories = async (page, limit) => {
    console.log(limit)
  try {
    const response = await fetch(`${Path}/history?page=${page}&limit=${limit}`, {
      method: "GET",
      cache: "no-store",
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
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}
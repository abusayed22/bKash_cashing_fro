import { PATH } from "@/utility/enviroment";


// client list with id and user name
export const PatchClients = async () => {
  try {
    const response = await fetch(`${PATH}/client`, {
      method: "PATCH",
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
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}


// get all clients list DATA 
export const GetAllClients = async (page, limit) => {
  try {
    const response = await fetch(`${PATH}/client?page=${page}&limit=${limit}`, {
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
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}
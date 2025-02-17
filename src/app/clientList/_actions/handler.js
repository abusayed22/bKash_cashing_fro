'use server'

import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";



export const PatchClients = async () => {
  try {
    const clientData = await prisma.client.findMany();
    return clientData;
  } catch (error) {
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}


// get all clients list DATA 
export const GetAllClients = async (page, limit) => {
      try {
        const skip = (page - 1) * limit;
        // Fetch client data
        const clientsData = await prisma.client.findMany({
          where: {
            NOT: {
              fullname: null,
            },
          },
          skip: skip,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        });

        // Optionally, get the total count of clients to calculate total pages
        const totalClients = clientsData.length;
        const totalPages = Math.ceil(totalClients / limit); // Calculate total pages

        return {
          status: "ok",
          data: clientsData,
          pagination: {
            totalClients,
            totalPages,
            currentPage: page,
            limit,
          },
        };
      } catch (error) {
        return NextResponse.json({
          status: 500,
          error: "Failed to fetch clients. Internal server error.",
        });
      }
}
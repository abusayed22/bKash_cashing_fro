'use server'
import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
// import { getCookie } from "cookies-next";
import { cookies } from 'next/headers'



// get all clients list DATA 
export const GetAllHistories = async (page, limit) => {
  try {
   

        // Calculate offset (skip)
        const skip = (page - 1) * limit;
        const transactionHistories = await prisma.history.findMany({
            // where:{
            //     NOT: {
            //         clientid:null
            //     }
            // },
            skip: skip,
            take: limit,
            include: {
                client: {
                    select: {
                        id: true,
                        fullname: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Optionally, get the total count of clients to calculate total pages
        const totalHistory = await prisma.history.count({
            // where: {
            //   NOT: {
            //     clientid: null,
            //   },
            // },

        });

        const totalPages = Math.ceil(totalHistory / limit);
        console.log(transactionHistories)

        return {
            status: "ok", data: transactionHistories, pagination: {
                // totalClients,
                totalPages,
                currentPage: page,
                limit,
            },
          };

  } catch (error) {
    console.log("Error fetching clients:", error.message);
    return null; // Return null in case of failure
  }
}
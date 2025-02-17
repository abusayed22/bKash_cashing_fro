'use server'
import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";




export async function ReceivedMoneyAdd(dataObj) {
    try {
        
        // Create the Receivedmoney entry first
    const newReceivedMoney = await prisma.receivedmoney.create({
        data: {
          clientid: parseInt(dataObj.clientid),
          number: dataObj.number || '',
          amount: parseFloat(dataObj.amount),
          method: dataObj.method,
          note: dataObj.note || null,
        },
      });
  
      // Now create the history entry related to the new Receivedmoney record
      const newHistory = await prisma.history.create({
        data: {
          clientid: parseInt(dataObj.clientid),
          amount: parseFloat(dataObj.amount),
          note: dataObj.note || null,
          status: 'Received', 
          number: dataObj.number || '',
          method: dataObj.method || '',
        },
      });
  
  
      return { status: 201, message: "Received Money Added Successfully." }
    } catch (error) {
        return { status: 500, message: `Something Wrong!: ${error}`}
    }
}
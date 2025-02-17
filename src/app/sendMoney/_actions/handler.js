'use server'
import prisma from "@/src/lib/globalPrisma";

export const SendMoneyAdd = async (dataObj) => {
    try {
        const [newSend, newHistory] = await prisma.$transaction([
             prisma.sendmoney.create({
              data: {
                clientid: parseInt(dataObj.clientid),
                number:dataObj.number || '', 
                amount: parseFloat(dataObj.amount),
                method: dataObj.method,
                note: dataObj.note || null,
              },
            }),
            prisma.history.create({
              data: {
                clientid: parseInt(dataObj.clientid),
                amount: parseFloat(dataObj.amount),
                note: dataObj.note || null,
                status: 'Send', // Customize the status
                number: dataObj.number || '', // Add the number if available
                method: dataObj.method || '',
              },
            }),
          ]);
          console.log(newHistory)

          return {status:201,message:"Send Added Successfully."}

    } catch (error) {
        return {status:201,message:"Send Added Not Successfully!."}
    }
}

'use server'

import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export const getDashboard = async (req,res) => {
  try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0)
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);


      // Helper function to handle aggregate and return 0 if no data is found
      const getTotalAmount = async (model, whereConditions) => {
          const result = await prisma[model].aggregate({
              _sum: { amount: true },
              where: whereConditions
          });
          return result._sum.amount ;  // Return 0 if result is null or undefined
        }

        const todayTotalSend = await getTotalAmount('sendmoney',{
            createdAt: { gte: todayStart, lte: todayEnd }
        })

       //  today total send 
    //    const todayTotalSendAmount = await prisma.sendmoney.aggregate({
    //     where:{
    //         createdAt: { gte: todayStart, lte: todayEnd }
    //     },
    //     _sum:{amount:true}
    //   })
    //   const todayTotalSend = todayTotalSendAmount._sum.amount
    


      //  today total Received 
      const todayTotalReceived = await getTotalAmount('receivedmoney', {
          createdAt: { gte: todayStart, lte: todayEnd }
      })


      //  today total bKash send amount 
      const todayTotalSendbkash = await getTotalAmount('history', {
          createdAt: { gte: todayStart, lte: todayEnd }, method: 'b', status: 'Send'
      })
      
      //  today total Bank Received amount 
      const todayTotalReceivedbkash = await getTotalAmount('history', {
          createdAt: { gte: todayStart, lte: todayEnd }, method: 'bank', status: 'Received'
      })

      //  today total Bank send amount 
      const todayTotalSendBank = await getTotalAmount('history', {
          createdAt: { gte: todayStart, lte: todayEnd }, method: 'bank', status: 'Send'
      })

      //  today total Bank Received amount
      const todayTotalReceivedBank = await getTotalAmount('history', {
          createdAt: { gte: todayStart, lte: todayEnd }, method: 'bank', status: 'Received'
      })


      //  today total Nagad Send amount 
      const todayTotalSendNagad = await getTotalAmount('history', {
          createdAt: { gte: todayStart, lte: todayEnd }, method: 'n', status: 'Send'
      })

      //  today total Nagad Received amount
      const todayTotalReceivedNagad = await getTotalAmount('history', {
          createdAt: { gte: todayStart, lte: todayEnd }, method: 'n', status: 'Received'
      })

      console.log("tSend",todayTotalSend)
      console.log("tReceived",todayTotalReceived)
      console.log("sendBank",todayTotalSendBank)
      console.log("receivedBank",todayTotalReceivedBank)
      console.log("sendbKash",todayTotalSendbkash)
      console.log("receivedbKash",todayTotalReceivedbkash)
      console.log("sendNagad",todayTotalSendNagad)
      console.log("receivedNagad",todayTotalReceivedNagad)

      return  {
              send: todayTotalSend,
              received: todayTotalReceived,
              sendBank: todayTotalSendBank,
              receivedBank: todayTotalReceivedBank,
              sendbKash: todayTotalSendbkash,
              receivedbKash: todayTotalReceivedbkash,
              sendNagad: todayTotalSendNagad,
              receivedNagad: todayTotalReceivedNagad,
          }
  } catch (error) {
      console.log("Error fetching History:", error.message);
      return {
          status: 500,
          error: "Failed to fetch Dashboard data!",
      };
  }

}
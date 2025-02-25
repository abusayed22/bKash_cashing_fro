'use server'

import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export const getDashboard = async (req, res) => {
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
            return result._sum.amount ? result._sum.amount.toNumber() : 0; // Return 0 if result is null or undefined
        }

        // today total send
        const todayTotalSend = await getTotalAmount('sendmoney', {
            createdAt: { gte: todayStart, lte: todayEnd }
        })


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


        // ---------------------------------- total calculation  ---------------------------------------
        // today total send
        const totalSend = await getTotalAmount('sendmoney')


        //  today total Received 
        const totalReceived = await getTotalAmount('receivedmoney')


        //  today total bKash send amount TODO:
        const totalSendbkash = await getTotalAmount('history', {
            method: 'b', status: 'Send'
        })

        //  today total Bank Received amount 
        const totalReceivedbkash = await getTotalAmount('history', {
            method: 'bank', status: 'Received'
        })

        //  today total Bank send amount 
        const totalSendBank = await getTotalAmount('history', {
            method: 'bank', status: 'Send'
        });
        console.log(totalSendBank)

        //  today total Bank Received amount
        const totalReceivedBank = await getTotalAmount('history', {
            method: 'bank', status: 'Received'
        })


        //  today total Nagad Send amount 
        const totalSendNagad = await getTotalAmount('history', {
            method: 'n', status: 'Send'
        })

        //  today total Nagad Received amount
        const totalReceivedNagad = await getTotalAmount('history', {
            method: 'n', status: 'Received'
        })

        //   const totalData = {
        //     totalSend: totalSend,
        //     totalReceived:totalReceived,
        //     totalBkashSend:totalSendbkash,
        //     totalBkashReceived: totalReceivedbkash,
        //     totalBankSend:totalSendBank,
        //     totalBankReceived:totalReceivedBank,
        //     totalNagodSend:totalSendNagad,
        //     totalNagodReceived:totalReceivedNagad
        //   }

        return {
            send: todayTotalSend,
            received: todayTotalReceived,
            sendBank: todayTotalSendBank,
            receivedBank: todayTotalReceivedBank,
            sendbKash: todayTotalSendbkash,
            receivedbKash: todayTotalReceivedbkash,
            sendNagad: todayTotalSendNagad,
            receivedNagad: todayTotalReceivedNagad,
            // totalData: totalData,
            // total data
            totalSend: totalSend,
            totalReceived: totalReceived,
            totalBkashSend: totalSendbkash,
            totalBkashReceived: totalReceivedbkash,
            totalBankSend: totalSendBank,
            totalBankReceived: totalReceivedBank,
            totalNagodSend: totalSendNagad,
            totalNagodReceived: totalReceivedNagad

        }
    } catch (error) {
        console.log("Error fetching History:", error.message);
        return {
            status: 500,
            error: "Failed to fetch Dashboard data!",
        };
    }

}
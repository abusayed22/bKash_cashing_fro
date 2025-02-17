'use server';


import prisma from "@/src/lib/globalPrisma";
import { MAIN_PATH } from "@/src/utility/enviroment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



// export const ClientAdd = async (dataObj) => {
//     try {
//         const existUser = await prisma.client.count({
//             // where: {
//             //     fullname: dataObj?.name,
//             //     number: dataObj?.number,
//             // }
//             where: {
//                 fullname:dataObj?.name,
//                 number:dataObj?.number
//             }
//         });
//         console.log(existUser)
//         if (existUser > 0) {
//             return { status: 409, message: 'Client Already Exist!.' }
//         } else {
//             await prisma.client.create({
//                 data: {
//                     fullname: dataObj?.name,
//                     number: dataObj?.number,
//                     address: dataObj?.address
//                 }
//             })
//             return { status: 201, message: 'Client Added Successfully.' }
//         }
//     } catch (error) {
//         console.log("error", error)
//         return { status: 500, message: `Something wrong: ${error}` }
//     }
// }


export const ClientAdd = async (dataObj) => {
    try {
        // Validate if dataObj is not null or undefined
        if (!dataObj || !dataObj.name || !dataObj.number) {
            return { status: 400, message: 'Invalid input data. Name and number are required.' };
        }


        const existUser = await prisma.client.count({
            where: {
                fullname: dataObj?.name,
                number: dataObj?.number
            }
        });

        if (existUser > 0) {
            return { status: 409, message: 'Client Already Exist!' };
        } else {
            await prisma.client.create({
                data: {
                    fullname: dataObj?.name,
                    number: dataObj?.number,
                    address: dataObj?.address
                }
            });
            return { status: 201, message: 'Client Added Successfully.' };
        }
    } catch (error) {
        console.log("error", error);
        return { status: 500, message: `Something wrong: ${error.message}` };
    }
};
'use server';

import prisma from "@/src/lib/globalPrisma";
import { hashedPassword } from "@/src/lib/hashedPassword";
import { MAIN_PATH } from "@/src/utility/enviroment";




export const isRegister = async (fullName, email, password) => {
    try {
        const isExist = await prisma.admin.findMany({
            where: {
                email: email,
            }
        });

        if (isExist.length > 0) {
            return {status:400,message: "User Already Exist!. Please Login."}
        } else{
            const hashingPassword = await hashedPassword(password);
            console.log('hash',hashingPassword)
            const createUser = await prisma.admin.create({
                data: {
                    fullname: fullName,
                    email: email,
                    password: hashingPassword,
                    otp: ''
                }
            })
            if(createUser) {
                return {status:201, message:"User Register Successfully."}
            } else {
                return {status:201, message:"User Register Not Successfully. Try agin"}
            }
        }
    } catch (error) {
        return {status:500, message:"Something Wrong!. Try agin to Register"}
    }
}

import { NextResponse } from "next/server";
import prisma from "../lib/globalPrisma";





// login routing point 
export const isLogin = async (email, password) => {
    try {
        const isUser = await prisma.admin.findUnique({
            where: {
                email: email,
                password: password
            }
        });
        console.log(isUser)

        const countUser = await prisma.admin.count({
            where: {
                email: email
            }
        })

        if (countUser > 0) {
            const token = await CreateToken(isUser.email, isUser.id)
            const cookieStore = await cookies()
            cookieStore.set('accessToken', token)

            return true;
        }
        return true
    } catch (error) {
        return { message: 'failled' }
    }
}




// Register routing point
// export const isRegister = async (fullName, email, password) => {
//     try {
//         const isRegister = await prisma.admin.findMany({
//             where: {
//                 email: email,
//             }
//         });

//         if (isRegister.length === 0) {
//             const createdUser = await prisma.admin.create({
//                 data: {
//                     fullname: fullName,
//                     email: email,
//                     password: password,
//                     otp: '',
//                 }
//             })
//             if(createdUser){
//                 const token = await CreateToken(isUser.email, isUser.id)
//                 const cookieStore = await cookies()
//                 cookieStore.set('accessToken', token)
//             }
//             return {status:201, message: 'User Register Successfully' }
//         } else {
//             return {status:409, message: 'User Alerady Exist!' }
//         }
//     } catch (error) {
//         return {status:500, message: 'Action have a issue!' }
//     }
// }
export const isRegister = async (fullName, email, password) => {
    try {
        const isRegister = await prisma.admin.findMany({
            where: {
                email: email,
            }
        });

        if (!isRegister) {
            const createdUser = await prisma.admin.create({
                data: {
                    fullname: fullName,
                    email: email,
                    password: password,
                    otp: '',
                }
            })
            return { message: 'ok', createdUser }
        } else {
            return { message: 'failled' }
        }
    } catch (error) {

    }
}




// dashboard get data routing point







// if (isRegister.length === 0) {
//     console.log('ehl')
//     const createdUser = await prisma.admin.create({
//         data: {
//             fullname: fullName,
//             email: email,
//             password: password,
//             otp: '',
//         }
//     });
    
//     if(createdUser) {
//         const token = await CreateToken(isUser.email, isUser.id)
//         const cookieStore = await cookies()
//         cookieStore.set('accessToken', token)
        
//         return NextResponse.json({ status: 201,message: "User Login Successfully" })
//     }
    
// } else {
//     return { status: 409,message: "User Already Exist!" }
// }
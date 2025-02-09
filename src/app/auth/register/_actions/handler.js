// 'use server';

// import { MAIN_PATH } from "@/src/utility/enviroment";




export const RegisterPost = async(dataObj) => {
    try {
        const response = await fetch(`${process.env.MAIN_PATH}/auth/register`,{
            cache:'no-cache',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataObj)
        })
        // const data = await response.json();
        // console.log(data)
      return response
    } catch (error) {
        console.log(error.message)
    }
}
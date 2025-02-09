// 'use server';

import { PATH } from "@/src/utility/enviroment";




export const RegisterPost = async(dataObj) => {
    try {
        const response = await fetch(`${PATH}/auth/register`,{
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
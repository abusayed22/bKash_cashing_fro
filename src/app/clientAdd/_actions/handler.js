'use server';

import { Path } from "@/src/utility/enviroment";


export const ClientAdd = async(dataObj) => {
    try {
        const response = await fetch(`${Path}/client`,{
            cache:'no-cache',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataObj)
        })
        const data = await response.json();
        console.log(data)
      return data
    } catch (error) {
        console.log(error.message)
    }
}

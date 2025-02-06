'use server';

import { Path } from "@/utility/enviroment";

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


// export const AddCustomer = async (dataObj) => {
  
//     try {
//       // const cookiesStore = cookies();
//       // const token = cookiesStore.get("token")?.value;
//       const response = await fetch(`${Path}/customers`, {
//         cache: "no-store",
//             method: "POST",
//             headers: {
//               // "Accept": "application/json",
//               "Content-Type": "application/json",
//               // "Authorization": `Bearer ${token}`,
//             },
//             body:JSON.stringify(dataObj)
//       });
  
//       const data = await response.json();
//       return data
//     } catch (error) {
//       console.log(error.message);
//     }
// }
import { Path } from "@/utility/enviroment";



export const SendMoneyAdd = async (dataObj) => {
    try {
        const response = await fetch(`${Path}/sendmoney`, {
            cache:'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObj),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error submitting data');
        }
          return data
    } catch (error) {
        console.log(error)
    }
}

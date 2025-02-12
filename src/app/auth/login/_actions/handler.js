
import { MAIN_PATH } from "@/src/utility/enviroment";



export const LoginPost = async (dataObj) => {
    try {

        const response = await fetch(`${MAIN_PATH}/auth/login`, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        })
        const loginData = await response.json();
        const token = loginData?.data
        // const dashoard = data?.dashboard
        console.log(loginData)
       

        if (token) {
            // Set cookie with expiration of 1 hour
            const expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + 3600);  // Add 3600 seconds (1 hour)

            // Set cookie with a different SameSite attribute for testing
            document.cookie = `accessToken=${token}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=lax;`;
        }


        // Store dashboard data in sessionStorage
        // storeDashboardInSessionStorage(dashoard)

        return response
    } catch (error) {
        console.log(error.message)
    }
};



// export const storeDashboardInSessionStorage = (dashboardData) => {
//     // console.log(dashboardData)
//     const data = JSON.stringify(dashboardData);  // Convert object to JSON string
//     sessionStorage.setItem('dashboard', data);
// };




// Check if access token is expired and refresh it if necessary
async function fetchWithRefresh(url, options = {}) {
    const token = localStorage.getItem('accessToken'); // Or from cookies
    console.log(token)


    if (!token) {
        throw new Error('No access token available');
    }

    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 401) {
            // If token is expired, try refreshing it
            const refreshRes = await fetch(`${PATH}/auth/refresh-token`, {
                method: 'POST',
            });

            if (refreshRes.ok) {
                const { accessToken } = await refreshRes.json();
                localStorage.setItem('accessToken', accessToken);

                // Retry the original request with the new token
                return fetchWithRefresh(url, options);
            } else {
                throw new Error('Unable to refresh token');
            }
        }

        return res;
    } catch (error) {
        console.error(error);
        throw new Error('Authentication error');
    }
}
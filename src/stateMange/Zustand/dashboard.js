import { GetDashboardData } from "@/src/app/dashboard/_actions/handler";
import { create } from "zustand";
import {persist} from 'zustand/middleware'



export const useDashboard = create(
    // persist(
        (set) => ({
            dashboard: null,


            // fetch data from backend
            fetchDashboardData : async() => {
                try {
                    const dataObj = await GetDashboardData();
                    const data = dataObj?.data
                    console.log("Fetched Dashboard Data:", data);
                    if(data?.length > 0) {
                        set({dashboard:data})
                    } return null
                } catch (error) {
                    console.error("Error fetching Dashboard Data in Zustand State:", error); 
                }
            },

            // fetch dashboard data when login
            dashboardDataLogin : (data) => set({dashboard: data})
        })
    // )
)
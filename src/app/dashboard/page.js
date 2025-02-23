import React from "react"
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";
import { getDashboard } from "./_actions/handler";





const Page = async({ params }) => {


  const dashboardData = await getDashboard();
  console.log(dashboardData)
  return (
    <DashboardLayout>
      <div className="container max-w-md lg:max-w-full mx-auto">
        <DashboardCard data={dashboardData}/>
      </div>
    </DashboardLayout>
  )
};





export default Page;

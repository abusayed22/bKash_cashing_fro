import React from "react"
import { GetDashboardData } from "./_actions/handler";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";

const Page = async(props) => {

  console.log('data fetching start')
  const dashboardData = await GetDashboardData();
  console.log('data fetching end')
  return (
    <DashboardLayout>
      <div className="container max-w-md lg:max-w-full mx-auto">
        <DashboardCard data={dashboardData?.data}/>
      </div>
    </DashboardLayout>
  )
};

export default Page;

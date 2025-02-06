import React from "react"
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";
import { GetDashboardData } from "./_actions/handler";

const Page = async(props) => {

  const dashboardData = await GetDashboardData();
  return (
    <DashboardLayout>
      <div className="container max-w-md lg:max-w-full mx-auto">
        <DashboardCard data={dashboardData?.data}/>
      </div>
    </DashboardLayout>
  )
};

export default Page;

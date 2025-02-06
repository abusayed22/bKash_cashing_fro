import React from "react"
import { GetDashboardData } from "./_actions/handler";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";

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

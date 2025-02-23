import React from "react"
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";
import { getDashboard } from "./_actions/handler";


export async function getServerSideProps() {
  const response = await getDashboard()  // Call the API route where `getDashboard` is used

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const dashboardData = await response.json();

  return {
    props: { dashboardData },  // Pass data to the component
  };
}


const Page = async({dashboardData}) => {


  // const dashboardData = await getDashboard();
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

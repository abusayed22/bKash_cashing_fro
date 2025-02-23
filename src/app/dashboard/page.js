import React from "react"
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";
import { getDashboard } from "./_actions/handler";

const Page = async({ dashboardData }) => {


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




export async function getServerSideProps() {
  // Make the API call or fetch the data from your source
  const dashboardData = await getDashboard(); // Assuming getDashboard() returns the data you need

  return {
    props: { dashboardData },  // Pass the data as props to the page component
  };
}

export default Page;

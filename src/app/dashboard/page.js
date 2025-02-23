import React from "react"
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardCard from "./_components/DashboardCard";
import { getDashboard } from "./_actions/handler";


export async function getStaticProps() {
  const res = await getDashboard()
  const repo = await res.json()
  return { props: { repo } }
}

const Page = async({repo}) => {


  // const dashboardData = await getDashboard();
  console.log(repo)
  return (
    <DashboardLayout>
      <div className="container max-w-md lg:max-w-full mx-auto">
        <DashboardCard data={dashboardData}/>
      </div>
    </DashboardLayout>
  )
};

export default Page;

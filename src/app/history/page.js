import DashboardLayout from "@/src/layouts/DashboardLayout";
import React from "react"
import HistoryCard from "./_components/HistoryCard";

const Page = (props) => {
  return (
    <DashboardLayout>
        <div className="container max-w-md mx-auto">
          <HistoryCard />
        </div>
    </DashboardLayout>
  )
};

export default Page;

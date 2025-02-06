import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react"
import ReceivedMoneyForm from "./_components/ReceivedMoneyForm";

const Page = (props) => {
  return (
    <DashboardLayout>
      <div className="container max-w-md mx-auto">
        <ReceivedMoneyForm />
      </div>
    </DashboardLayout>
  )
};

export default Page;

import React from "react"
import SendMoneyForm from "./_components/SendMoneyForm";
import DashboardLayout from "@/src/layouts/DashboardLayout";

const Page = (props) => {
  return (
    <DashboardLayout>
      <div className="container max-w-md mx-auto">
        <SendMoneyForm />
      </div>
    </DashboardLayout>
  )
};

export default Page;

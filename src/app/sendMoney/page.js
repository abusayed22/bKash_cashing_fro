import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react"
import SendMoneyForm from "./_components/SendMoneyForm";

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

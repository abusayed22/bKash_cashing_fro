import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react"
import ClientAddForm from "./_components/ClientAddForm";

const Page = (props) => {
  
  return (
    <DashboardLayout>
      <div className="container max-w-md mx-auto">
        <ClientAddForm />
      </div>
    </DashboardLayout>
  )
};

export default Page;

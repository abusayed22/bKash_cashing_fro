import React from "react"
import ClientAddForm from "./_components/ClientAddForm";
import DashboardLayout from "@/src/layouts/DashboardLayout";

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

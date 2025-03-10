
import React from "react"
import DashboardLayout from "@/src/layouts/DashboardLayout";
import { CheckCircle, AlertCircle, FileText } from "lucide-react";
import ClientListSection from "./_components/ClientListSection";

const Page = (props) => {


  
  return (
    <DashboardLayout>
      <div className="container max-w-md mx-auto">
        {/* <div className="max-w-md mx-auto"> */}
          {/* Header */}
          {/* <h2 className="text-2xl font-bold mb-4">Today</h2>

          Date Selector
          <WeekDay /> */}

          

          <ClientListSection />
        {/* </div> */}
      </div>
    </DashboardLayout>
  )
};

export default Page;


// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
// import { cookies } from "next/headers"
// import AppSidebar from "./_components/AppSidebar";


const DashboardLayout = async({children}) => {
    // const cookieStore = await cookies()
    // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
   
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashboardLayout;

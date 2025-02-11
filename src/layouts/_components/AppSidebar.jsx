'use client'
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookUser, Calendar, HandCoins, Home, Inbox, LogOut, Search, Send, Settings, SquareStack, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogoutAction } from "@/src/app/auth/logout/actions/handler";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/src/components/ui/avatar";
import Image from "next/image";


const AppSidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      onClick: () => {
        sessionStorage.removeItem('dashboard');  // Clear dashboard data from sessionStorage
      }
    },
    {
      title: "Send Money",
      url: "/sendMoney",
      icon: Send,
      onClick: () => {
        sessionStorage.removeItem('dashboard');  // Clear dashboard data from sessionStorage
      }
    },
    {
      title: "Received Money",
      url: "/receivedMoney",
      icon: HandCoins,
      onClick: () => {
        sessionStorage.removeItem('dashboard');  // Clear dashboard data from sessionStorage
      }
    },
    {
      title: "History",
      url: "/history",
      icon: SquareStack,
    },
    {
      title: "Client",
      url: "/clientList",
      icon: UsersRound,
    },
    {
      title: "Client Add",
      url: "/clientAdd",
      icon: BookUser,
    },
    // {
    //   title: "Logout",
    //   url: "/auth/logout",
    //   icon: LogOut ,
    // },
  ];



  const handleLogout = async () => {
    await LogoutAction();
  };

  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <div className="flex justify-center py-2">
            <Image width={120} height={120} src="https://unityagro.com/images/icons/logo-01.png" />
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} onClick={item.onClick}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
};

export default AppSidebar;

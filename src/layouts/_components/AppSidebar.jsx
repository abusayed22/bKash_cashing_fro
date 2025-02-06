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
import { BookUser, Calendar, HandCoins, Home, Inbox, Search, Send, Settings, SquareStack, UsersRound } from "lucide-react";
const AppSidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false); // For toggling the sidebar visibility

  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Send Money",
      url: "/sendMoney",
      icon: Send ,
    },
    {
      title: "Received Money",
      url: "/receivedMoney",
      icon: HandCoins
    },
    {
      title: "History",
      url: "/history",
      icon: SquareStack ,
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
  ];


  
  return (
    <div>
      <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </div>
  )
};

export default AppSidebar;

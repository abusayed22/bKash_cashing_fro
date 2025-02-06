'use client'
import React from "react"
import { Card } from "@/components/ui/card";
import { ShoppingCart, Users, DollarSign, BarChart3, Send, HandCoins } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const dashboardStats = [
  {
    title: "Total Sales",
    value: "$25,430",
    icon: <DollarSign className="w-8 h-8 text-green-500" />,
    bgColor: "bg-green-100",
  },
  {
    title: "New Customers",
    value: "1,248",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    bgColor: "bg-blue-100",
  },
  {
    title: "Orders",
    value: "652",
    icon: <ShoppingCart className="w-8 h-8 text-purple-500" />,
    bgColor: "bg-purple-100",
  },
  {
    title: "Revenue",
    value: "$12,980",
    icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
    bgColor: "bg-orange-100",
  },
];


const DashboardCard = ({ data }) => {
  const { send, received, sendbKash, receivedbKash, sendNagad, receivedNagad } = data || {}

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {/* {dashboardStats.map((stat, index) => ( */}
        <Card
          // key={index}
          className="flex items-center justify-between bg-slate-200 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>{<Send size={40} />}</div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Send</p>
            <p className="text-2xl font-bold">{send ||0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between bg-lime-100 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>{<HandCoins size={40} />}</div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Received</p>
            <p className="text-2xl font-bold">{received ||0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <AvatarImage src="/icons/BKash-Logo.wine.png" />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total bKash Send</p>
            <p className="text-2xl font-bold">{sendbKash ||0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <AvatarImage src="/icons/BKash-Logo.wine.png" />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total bKash Received</p>
            <p className="text-2xl font-bold">{receivedbKash ||0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <AvatarImage src="/icons/Nagad-Logo.wine.png" />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Nagad Send</p>
            <p className="text-2xl font-bold">{sendNagad || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <AvatarImage src="/icons/Nagad-Logo.wine.png" />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Nagad Received</p>
            <p className="text-2xl font-bold">{receivedNagad ||0} ৳</p>
          </div>
        </Card>
        {/* ))} */}
      </div>
    </div>
  )
};

export default DashboardCard;

'use client'
import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card";
import { Send, HandCoins, CreditCard } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

// Get dashboard sessionStorage
const getDashboardFromSessionStorage = () => {
  const data = sessionStorage.getItem('dashboard');
  
  // Check if data exists and is a valid JSON string
  if (data) {
      try {
          return JSON.parse(data);  
      } catch (e) {
          console.error("Error parsing JSON from sessionStorage", e);
          return null;  
      }
  }
  return null; 
};


const DashboardCard = ({data}) => {
  console.log('dashboard loaded')
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const sessionData = getDashboardFromSessionStorage();
    console.log('dashboard loaded IN useEffect');

    // Check if session data is present and if it is different from the current data
    if (sessionData) {
      if (sessionData !== dashboard) {
        setDashboard(sessionData);  // Set session data to state if it differs
        setLoading(false);  // Set loading to false after data is fetched
      }
    } else {
      if (data?.data !== dashboard) {
        setDashboard(data?.data);  // Set data from prop to state if it differs
        setLoading(false);  // Set loading to false if no data is found
      }
    }
  }, [data, dashboard]);
  

  return (
    <div>

      {/* { */}
      {/* loading ? (
          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : ( */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {/* {dashboardStats.map((stat, index) => ( */}
        <Card
          // key={index}
          className="flex items-center justify-between bg-slate-200 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>{<Send size={32} />}</div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Send</p>
            <p className="text-2xl font-bold">{dashboard?.send } ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between bg-lime-100 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>{<HandCoins size={32} />}</div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Received</p>
            <p className="text-2xl font-bold">{dashboard?.received || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between p-6 shadow-md bg-blue-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            {/* <Avatar> */}
            <div className={`p-4 rounded-lg `}>{<CreditCard size={32} />}</div>
            {/* </Avatar> */}
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Bank Send</p>
            <p className="text-2xl font-bold">{dashboard?.sendBank || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between p-6 shadow-md bg-blue-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            {/* <Avatar> */}
            <div className={`p-4 rounded-lg `}>{<CreditCard size={32} />}</div>
            {/* </Avatar> */}
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Bank Received</p>
            <p className="text-2xl font-bold">{dashboard?.receivedBank || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/bkash.svg'} alt='bkash' />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total bKash Send</p>
            <p className="text-2xl font-bold">{dashboard?.sendbKash || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/bkash.svg'} alt='bkash' />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total bKash Received</p>
            <p className="text-2xl font-bold">{dashboard?.receivedbKash || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Nagad Send</p>
            <p className="text-2xl font-bold">{dashboard?.sendNagad || 0} ৳</p>
          </div>
        </Card>
        <Card
          // key={index}
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Icon */}
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
            </Avatar>
          </div>

          {/* Text Info */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Nagad Received</p>
            <p className="text-2xl font-bold">{dashboard?.receivedNagad || 0} ৳</p>
          </div>
        </Card>
        {/* ))} */}
      </div>
      {/* ) */}
      {/* } */}
    </div>
  )
};

export default DashboardCard;

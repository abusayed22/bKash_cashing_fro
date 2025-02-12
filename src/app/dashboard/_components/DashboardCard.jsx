'use client'
import React, { useEffect, useRef, useState } from "react"
import { Send, HandCoins, CreditCard } from "lucide-react";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Avatar } from "@/src/components/ui/avatar";

// Get dashboard sessionStorage
const getDashboardFromSessionStorage = () => {
  if (typeof window !== 'undefined') {  // Ensure code runs only in the browser
    const data = sessionStorage.getItem('dashboard');

    if (data) {
      try {
        return JSON.parse(data);  
      } catch (e) {
        console.error("Error parsing JSON from sessionStorage", e);
        return null;  
      }
    }
  }
  return null; 
};


  const DashboardCard = ({ data }) => {
    console.log(data)
    const {sendbKash,sendNagad,sendBank,send,receivedbKash,receivedNagad,receivedBank,received} = data.data || {};

    console.log('dashboard loaded')
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState(null);

    // Using useRef to track the first render and avoid setting state repeatedly
    const hasRendered = useRef(false);

    // Direct logic before rendering
    if (!hasRendered.current) {
      hasRendered.current = true;  // Mark the component as rendered

      const sessionData = getDashboardFromSessionStorage();

      if (sessionData) {
        setDashboard(sessionData);  // Set the data from session storage
        setLoading(false);  // Stop loading after setting session data
      } else if (data?.data) {
        setDashboard(data?.data);  // Set the data from props
        setLoading(false);  // Stop loading after setting data from props
      }
    }

    // useEffect(() => {
    //   const sessionData = getDashboardFromSessionStorage();

    //   if (sessionData) {
    //     setDashboard(sessionData);  // Set the data in state
    //     setLoading(false);  // Set loading to false after data is fetched
    //   } else {
    //     // setLoading(false);  // Set loading to false if no data is found
    //     setDashboard(data?.data)
    //     setLoading(false);  // Set loading to false if no data is found
    //   }
    // }, [dashboard]);





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
              <p className="text-2xl font-bold">{send} ৳</p>
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
              <p className="text-2xl font-bold">{received || 0} ৳</p>
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
              <p className="text-2xl font-bold">{sendBank || 0} ৳</p>
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
              <p className="text-2xl font-bold">{receivedBank || 0} ৳</p>
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
              <p className="text-2xl font-bold">{sendbKash || 0} ৳</p>
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
              <p className="text-2xl font-bold">{receivedbKash || 0} ৳</p>
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
                <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
              </Avatar>
            </div>
            {/* Text Info */}
            <div className="text-right">
              <p className="text-gray-500 text-sm">Today Total Nagad Received</p>
              <p className="text-2xl font-bold">{receivedNagad || 0} ৳</p>
            </div>
          </Card>
        </div>
      </div>
    )
  };

  export default DashboardCard;

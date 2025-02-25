'use client'
import React, { useEffect, useRef, useState } from "react"
import { Send, HandCoins, CreditCard } from "lucide-react";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Avatar } from "@/src/components/ui/avatar";
import { formatBangladeshiAmount } from "@/src/lib/numberFormat";



const DashboardCard = (data) => {
  const { sendbKash, sendNagad, sendBank, send, receivedbKash, receivedNagad, receivedBank, received, totalData,  totalSend, totalReceived, totalBkashSend, totalBkashReceived, totalBankSend, totalBankReceived, totalNagodSend, totalNagodReceived } = data?.data || {};
  // const { totalSend, totalReceived, totalBkashSend, totalBkashReceived, totalBankSend, totalBankReceived, totalNagodSend, totalNagodReceived } = totalData || {};
  // const [loading, setLoading] = useState(true);

  return (
    <div>
      {/* { */}
      {/* loading ? ( */}
      {/* <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : ( */}
      <p className="text-lg ml-3 p-1 text-slate-700 font-semiBold">Today Summary</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        <Card
          className="flex items-center justify-between bg-slate-200 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>{<Send size={32} />}</div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(send || 0)} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between bg-lime-100 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>{<HandCoins size={32} />}</div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(received || 0)} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-blue-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <div className={`p-4 rounded-lg `}>{<CreditCard size={32} />}</div>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Bank Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(sendBank || 0)} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-blue-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <div className={`p-4 rounded-lg `}>{<CreditCard size={32} />}</div>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Bank Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(receivedBank )|| 0} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/bkash.svg'} alt='bkash' />
            </Avatar>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total bKash Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(sendbKash )|| 0} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/bkash.svg'} alt='bkash' />
            </Avatar>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total bKash Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(receivedbKash || 0)} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
            </Avatar>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Nagad Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(sendNagad || 0)} </p>

          </div>
        </Card>
        <Card
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
            </Avatar>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Today Total Nagad Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(receivedNagad || 0)} </p>
          </div>
        </Card>
      </div>
      <hr />
      <p className="text-lg ml-3 p-1 text-slate-700 font-semiBold">Total Summary</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        <Card
          className="flex items-center justify-between bg-slate-200 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>{<Send size={32} />}</div>
          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalSend)} </p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between bg-lime-100 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>{<HandCoins size={32} />}</div>

          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalReceived) || 0}</p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-blue-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <div className={`p-4 rounded-lg `}>{<CreditCard size={32} />}</div>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total Bank Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalBankSend) || 0}</p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-blue-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <div className={`p-4 rounded-lg `}>{<CreditCard size={32} />}</div>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total Bank Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalBankReceived) || 0}</p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/bkash.svg'} alt='bkash' />
            </Avatar>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total bKash Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalBkashSend) || 0}</p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between p-6 shadow-md bg-red-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/bkash.svg'} alt='bkash' />
            </Avatar>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total bKash Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalBkashReceived) || 0}</p>
          </div>
        </Card>
        <Card
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
            </Avatar>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total Nagad Send</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalNagodSend) || 0}</p>

          </div>
        </Card>
        <Card
          className="flex items-center justify-between bg-orange-300 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className={`p-4 rounded-lg `}>
            <Avatar>
              <Image width={32} height={32} src={'/nagad.svg'} alt='nagad' />
            </Avatar>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm"> Total Nagad Received</p>
            <p className="text-2xl font-bold">{formatBangladeshiAmount(totalNagodReceived) || 0} </p>
          </div>
        </Card>
      </div>
    </div>
  )
};

export default DashboardCard;

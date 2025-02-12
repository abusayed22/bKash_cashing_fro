'use client'
import { Avatar,AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Card } from "@/src/components/ui/card";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";
import React from "react"

const ClientCard = ({ client, index }) => {
    return (
        <Card key={client.id} className="container mx-auto flex items-center justify-between p-4 bg-white shadow rounded-lg">
            {/* Left Side - Index & Client Info */}
            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 font-bold rounded-full">
                    {/* {index + 1}
                     */}
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h3 className="text-lg font-semibold capitalize">{client.fullname}</h3>
                    <p className="text-blue-500 text-sm">{client.number}</p>
                    <p className="text-gray-500 text-xs">{client.address}</p>
                </div>
            </div>

            {/* Right Side - Documents & Status */}
            <div className="flex items-center space-x-4">
                {/* Documents */}
                <div className="flex items-center space-x-1 text-gray-600">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm">{client.docs} docs</span>
                </div>

                {/* Status Icon */}
                {client.status === "visited" && <CheckCircle className="w-6 h-6 text-green-500" />}
                {client.status === "pending" && <AlertCircle className="w-6 h-6 text-red-500" />}
                {client.status === "not_visited" && <div className="w-6 h-6 bg-gray-300 rounded-full"></div>}
            </div>
        </Card>
    )
};

export default ClientCard;

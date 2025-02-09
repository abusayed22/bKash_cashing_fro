'use client'
import React, { useEffect, useState } from "react"
import ClientCard from "./ClientCard";
import { GetAllClients } from "../_actions/handler";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const ClientListSection = ({ }) => {
    const [clients, setClients] = useState([]);  // To store fetched clients data
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track errors
    const [pagination, setPagination] = useState({
        totalClients: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
    });

    const [today, setToday] = useState("");

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString(); // Format as needed (e.g., MM/DD/YYYY)
        setToday(formattedDate);
    }, []);


    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetAllClients(pagination.currentPage, pagination.limit); // Call your API endpoint
                if (res.status === "ok") {
                    setClients(res.data); // Set fetched clients data to state
                    setPagination(res.pagination)
                } else {
                    setError("Failed to fetch clients data");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
                console.error(err);
            } finally {
                setLoading(false); // Stop loading state once data is fetched
            }
        };

        fetchData();
    }, [pagination.currentPage]); // Empty dependency array ensures the effect runs only once on mount


    return (
        <div>
            {/* Visit Summary Card */}
            <Card className="p-4 bg-purple-600 text-white rounded-lg mb-4">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs">Total Clients</p>
                        <p className="text-lg font-bold">{pagination.totalClients}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xs">Today</p>
                        <p className="text-lg font-bold">
                            {today}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Client List */}
            {
                loading ? (
                    <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">Loading...</p>
                ) : (
                    <div className="space-y-4 container max-w-md mx-auto">
                        {/* Clients List */}
                        <div>
                            {clients.map((client) => (
                                <ClientCard key={client.id} client={client} />
                            ))}
                        </div>

                        {/* Pagination Controls using shadcn */}
                        {
                            clients?.length === 0 ? (
                                <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">No client!</p>
                            ) : (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })}
                                                disabled={pagination.currentPage === 1}
                                            />
                                        </PaginationItem>

                                        {Array.from({ length: pagination.totalPages }, (_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    isActive={pagination.currentPage === i + 1}
                                                    onClick={() => setPagination({ ...pagination, currentPage: i + 1 })}
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
                                                disabled={pagination.currentPage === pagination.totalPages}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
};

export default ClientListSection;

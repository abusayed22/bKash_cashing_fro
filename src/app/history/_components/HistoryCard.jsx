'use client'
import React, { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetAllHistories } from "../_actions/handler";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const HistoryCard = () => {
    const [histories, setHistory] = useState([]);
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track errors
    const [pagination, setPagination] = useState({
        totalClients: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
    });


    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetAllHistories(pagination?.currentPage, pagination?.limit); // Call your API endpoint
                console.log(res);
                if (res.status === "ok") {
                    setHistory(res?.data); // Set fetched clients data to state
                    setPagination(res?.pagination)
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
    }, [pagination?.currentPage]); // Empty dependency array ensures the effect runs only once on mount


    return (
        <div className="container">
            {
                loading ? (
                    <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">Loading...</p>
                ) : (
                    <Table>
                        <TableCaption>{histories?.length === 0 ? 'No History' : 'A list of your recent invoices.'}</TableCaption>
                        {histories?.length !== 0 && (
                            <>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {histories?.map(item => (
                                    <TableBody key={item?.id}>
                                        <TableRow>
                                            <TableCell className="font-medium capitalize">{item?.client.fullname}</TableCell>
                                            <TableCell className={item.status === 'Send' ? 'text-amber-400' : 'text-green-400'}>{item?.status}</TableCell>


                                            <TableCell>{item?.method === 'b' && (<Avatar>
                                                <AvatarImage src="/icons/BKash-Logo.wine.png" />
                                            </Avatar>)}{item?.method === 'n' && (<Avatar>
                                                <AvatarImage src="/icons/Nagad-Logo.wine.png" />
                                            </Avatar>)}</TableCell>
                                            <TableCell className="text-right"> ৳ {item?.amount}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))}
                            </>
                        )}
                    </Table>
                )
            }


            {/* Pagination Controls using shadcn */}
            {
                histories?.length !== 0 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPagination({ ...pagination, currentPage: pagination?.currentPage - 1 })}
                                    disabled={pagination?.currentPage === 1}
                                />
                            </PaginationItem>

                            {Array.from({ length: pagination?.totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={pagination?.currentPage === i + 1}
                                        onClick={() => setPagination({ ...pagination, currentPage: i + 1 })}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
                                    disabled={pagination?.currentPage === pagination?.totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )
            }
        </div>
    )
};

export default HistoryCard;

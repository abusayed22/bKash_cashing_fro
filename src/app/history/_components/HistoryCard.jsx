'use client'
import React, { useEffect, useState } from "react";

import { GetAllHistories } from "../_actions/handler";
import moment from "moment";
// import { formatDateTime } from "@/lib/moment";
import Image from "next/image";
import { formatDateTime } from "@/src/lib/moment";
import { CreditCard } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Avatar } from "@/src/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";

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

    console.log(pagination)

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
                                    <TableRow >
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {histories?.map(item => (
                                    <TableBody key={item?.id} className="h-[20px]">
                                        <TableRow className='!border'>
                                            <TableCell className=" py-1 px-4 font-medium capitalize">{item?.client.fullname}</TableCell>
                                            <TableCell className="py-1 px-4" ><p className={item.status === 'Send' ? 'text-amber-400 font-bold' : 'text-green-400 font-bold'}>{item?.status}</p> <p className='text-[8px] text-slate-600'>{formatDateTime(item?.createdAt)}</p></TableCell>


                                            <TableCell className="py-1">{item?.method === 'b' && (<Avatar>
                                                {/* <AvatarImage src="/icons/bkash.svg" /> */}
                                                <Image width={24} height={24} src={'/bkash.svg'} alt="bKash" />
                                                {/* <AvatarImage  src="/bkash.svg" /> */}
                                            </Avatar>)}{item?.method === 'n' && (<Avatar>
                                                {/* <AvatarImage  src="/nagad.svg" /> */}
                                                <Image width={24} height={24} src={'/nagad.svg'} alt="nagad"/>
                                            </Avatar>)}{item?.method === 'bank' && (<>
                                                {/* <AvatarImage  src="/nagad.svg" /> */}
                                                {/* <Image width={24} height={24} src={'/nagad.svg'} alt="nagad"/> */}
                                                <CreditCard color="rgb(198 213 248)"/>
                                            </>)}</TableCell>
                                            <TableCell className="text-right py-1 px-4"> ৳ {item?.amount}</TableCell>
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

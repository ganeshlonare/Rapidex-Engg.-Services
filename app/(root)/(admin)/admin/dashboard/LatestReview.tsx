'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IoStar } from "react-icons/io5";

import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import Image from "next/image"
import notFound from '@/public/assets/images/not-found.png'
const LatestReview = () => {
    const [latestReview, setLatestReview] = useState<any[]>([])
    const { data: getLatestReview, loading } = useFetch('/api/dashboard/admin/latest-review')

    useEffect(() => {
        if (getLatestReview && getLatestReview.success) {
            setLatestReview(getLatestReview.data)
        }
    }, [getLatestReview])

    if (loading) return <div className="h-full w-full flex justify-center items-center">Loading...</div>

    if (!latestReview || latestReview.length === 0) return <div className="h-full w-full flex justify-center items-center">
        <Image src={notFound.src} width={notFound.width} height={notFound.height} alt="not found" className="w-20" />
    </div>

    return (
        <Table className="table-auto w-full">
            <TableCaption className="text-lg font-semibold">Latest Review</TableCaption>
            <TableHeader className="bg-gray-200">
                <TableRow className="border-b">
                    <TableHead className="px-6 py-3">Product</TableHead>
                    <TableHead className="px-6 py-3">Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                {latestReview?.map((review) => (
                    <TableRow className="hover:bg-gray-100 border-b" key={review._id}>
                        <TableCell className="px-6 py-4">
                            <Avatar className="">
                                <AvatarImage className="" src={review?.product?.media[0]?.secure_url || imgPlaceholder.src} />
                            </Avatar>
                            <span className="line-clamp-1">{review?.product?.name || 'Not found'}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                            <div className="flex items-center">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <span key={i}>
                                        <IoStar className="text-yellow-500" />
                                    </span>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}

export default LatestReview
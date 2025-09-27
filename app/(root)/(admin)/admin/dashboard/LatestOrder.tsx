'use client'

import {
    Table,
    TableBody,

    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useFetch from "@/hooks/useFetch"
import Image from "next/image"
import notFound from '@/public/assets/images/not-found.png'
import { useEffect, useState } from "react"
import { statusBadge } from "@/lib/helperFunction"
const LatestOrder = () => {
    const [latestOrder, setLatestOrder] = useState<any[]>([])

    const { data, loading } = useFetch('/api/dashboard/admin/latest-order')

    useEffect(() => {
        if (data && data.success) {
            setLatestOrder(data.data)
        }
    }, [data])

    if (loading) return <div className="h-full w-full flex justify-center items-center">Loading...</div>

    if (!latestOrder || latestOrder.length === 0) return <div className="h-full w-full flex justify-center items-center">
        <Image src={notFound.src} width={notFound.width} height={notFound.height} alt="not found" className="w-20" />
    </div>

    return (
        <Table className="">

            <TableHeader className="">
                <TableRow className="">
                    <TableHead className="">Order Id</TableHead>
                    <TableHead className="">Payment Id</TableHead>
                    <TableHead className="">Total Item</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">

                {latestOrder?.map((order) => (
                    <TableRow className="" key={order._id}>
                        <TableCell className="">{order._id}</TableCell>
                        <TableCell className="">{order.payment_id}</TableCell>
                        <TableCell className="">{order.products.length}</TableCell>
                        <TableCell className="">{statusBadge(order.status)}</TableCell>
                        <TableCell className="">{order.totalAmount}</TableCell>

                    </TableRow>
                ))}

            </TableBody>
        </Table>

    )
}

export default LatestOrder
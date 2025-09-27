import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import adminLogo from '@/public/assets/images/admin-logo.png'
import { useSelector } from "react-redux"

import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { ADMIN_ORDER_SHOW, ADMIN_PRODUCT_ADD } from "@/routes/AdminPanelRoute";

const UserDropdown = () => {
    const auth = useSelector((store: any) => store.authStore.auth)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="">
                    <AvatarImage className="" src={adminLogo.src} />
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="me-5 w-44">
                <DropdownMenuLabel className="" inset={false}>
                    <p className="font-semibold">{auth?.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="" />
                <DropdownMenuItem asChild className="" inset={false}>
                    <Link href={ADMIN_PRODUCT_ADD} className="cursor-pointer">
                        <IoShirtOutline />
                        New Product
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="" inset={false}>
                    <Link href={ADMIN_ORDER_SHOW} className="cursor-pointer">
                        <MdOutlineShoppingBag />
                        Orders
                    </Link>
                </DropdownMenuItem>

                <LogoutButton />

            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserDropdown
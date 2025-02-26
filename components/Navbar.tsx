"use client";

import Link from "next/link";
// import { useReadCurateTokenBalanceOf } from "@/hooks/wagmi/contracts";
import { contract } from "@/constants/contract";
import { Search, User } from "lucide-react";
import Disconnect from "./magic/wallet-methods/Disconnect";
import { useMagicState } from "@/app/context/magic.provider";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    setPublicAddress(user as string);
  }, []);

  const [publicAddress, setPublicAddress] = useState<string | null>(null);
  // const { data } = useReadCurateTokenBalanceOf({
  //   address: contract.TOKEN as `0x${string}`,
  //   args: [publicAddress as `0x${string}`],
  // });

  const { token, setToken } = useMagicState();

  return (
    <nav className="h-[56px] border-b border-gray-100 fixed top-0 left-0 right-0 bg-white z-50">
      <div className="max-w-[1280px] h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="curate ai logo" width={40} height={40} />
          <div className="relative max-w-[420px] hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-[6px] text-[14px] border border-transparent bg-gray-100 rounded-lg hover:border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
          </div>
        </div>
        <div className="flex items-center gap-6 cursor-pointer">
          <Link href={"/"} className="text-sm">
            Explore
          </Link>
          {token && (
            <>
              <Link
                href="/new-post"
                className="cursor-pointer text-[14px] px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium"
              >
                Create Post
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href={"/user/wallet"} className="flex w-full">
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {/* <span className="flex w-full">
                      {data?.toLocaleString()} SMT
                    </span> */}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Disconnect token={token as string} setToken={setToken} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

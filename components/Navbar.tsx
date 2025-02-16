"use client"

import Link from "next/link"
import { useReadCurateTokenBalanceOf } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "@/constants/contract"
import { Search } from "lucide-react"
import Disconnect from "./magic/wallet-methods/Disconnect"
import { useMagicState } from "@/app/context/magic.provider"
import { useEffect, useState } from "react"

export function Navbar() {
  
  useEffect(() => {
     const user = localStorage.getItem('user');
     setPublicAddress(user as string)
  }, []);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);
  const {data} = useReadCurateTokenBalanceOf({
    address: CONTRACT.TOKEN as `0x${string}`,
    args: [publicAddress as `0x${string}`]
  });

  const {token, setToken} = useMagicState();

  return (
    <nav className="h-[56px] border-b border-gray-100 fixed top-0 left-0 right-0 bg-white z-50">
            <div className="max-w-[1280px] h-full mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="curate ai logo" width={40} height={40}/>
                <div className="relative max-w-[420px] hidden md:block">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-[6px] text-[14px] border border-transparent bg-gray-100 rounded-lg hover:border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                  
                </div>
                
              </div>
              <div className="flex items-center gap-20">
                <Link href={'/'} className="text-sm">Explore</Link>
                <div className="flex items-center gap-20">
                {token && <>
                <Link href={'#'} className="text-sm text-gray-500">{data?.toLocaleString()} SMT</Link>
                <Link href={'#'} className="text-sm text-gray-500">{publicAddress}</Link>
                </>}
                </div>
              </div>
              {token && <> <Link href='/new-post' className="text-[14px] px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium">
                Create Post
              </Link> 
              <Disconnect token={token as string} setToken={setToken}/>
              </>}

            </div>
            </nav>
  )
}


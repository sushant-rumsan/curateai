"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"
import { useReadCurateTokenBalanceOf } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "@/constants/contract"
import Image from "next/image"
import { Search } from "lucide-react"

export function Navbar() {
  const {address} = useAccount();
  const {data} = useReadCurateTokenBalanceOf({
    address: CONTRACT.TOKEN as `0x${string}`,
    args: [address as `0x${string}`]
  });

  return (
    <nav className="h-[56px] border-b border-gray-100 fixed top-0 left-0 right-0 bg-white z-50">
            <div className="max-w-[1280px] h-full mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/022/242/738/non_2x/smart-learning-education-book-shop-store-logo-design-template-free-vector.jpg"
                  alt="Logo"
                  width={28}
                  height={28}
                  unoptimized
                />
                <div className="relative max-w-[420px] hidden md:block">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-[6px] text-[14px] border border-transparent bg-gray-100 rounded-lg hover:border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                  
                </div>
                
              </div>
              <div className="flex items-center gap-8">
                <Link href={'/'}>Explore</Link>
                <Link href={'#'}>{data} SMT</Link>
                <ConnectKitButton />
              </div>
              <Link href='/new-post' className="text-[14px] px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium">
                Create Post
              </Link>
            </div>
            </nav>
  )
}


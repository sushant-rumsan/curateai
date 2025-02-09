"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"
import { useReadCurateTokenBalanceOf } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "@/constants/contract"

export function Navbar() {
  const {address} = useAccount();
  const {data} = useReadCurateTokenBalanceOf({
    address: CONTRACT.TOKEN as `0x${string}`,
    args: [address as `0x${string}`]
  });

  return (
    <nav className="border-b">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-4">
         <img src="https://static.vecteezy.com/system/resources/previews/022/242/738/non_2x/smart-learning-education-book-shop-store-logo-design-template-free-vector.jpg" width={50} height={50} /> 
         <span>Curate AI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href={'/'}>Explore</Link>
          <Button variant="ghost">Profile</Button>
          <Link href={'/new-post'}>Write</Link>
          <Link href={'#'}>{data} SMT</Link>
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  )
}


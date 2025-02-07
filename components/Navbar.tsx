"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectKitButton } from "connectkit"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Curate AI
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Explore</Button>
          <Button variant="ghost">Profile</Button>
          <Link href={'/new-post'}>Write</Link>
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  )
}


"use client"

import dynamic from "next/dynamic"
import { useIPFSFetch } from "@/hooks/ipfs/fetchFromIpfs"
import { useReadCuratePosts, useReadCuratePostsPosts, useReadCurateTokenBalanceOf, useWriteCuratePostsVote } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "@/constants/contract"
import { useState } from "react"
import { useAccount } from "wagmi"
import { Loader2, AlertCircle, Calendar, Star, Award, ThumbsUp, Coins } from "lucide-react"
import type React from "react"
import { buttons } from "@/constants/vote_button"
import { useSearchParams } from "next/navigation"
import { Button } from "./ui/button"

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview").then((mod) => mod.default), { ssr: false })

interface BlogPostProps {
  id: string
}

export function BlogPost({ id }: BlogPostProps) {
  const { data, isPending } = useIPFSFetch(id)
  const { writeContract, isPending:isScorePending } = useWriteCuratePostsVote()
  const [voteValue, setVoteValue] = useState<bigint | undefined>(BigInt(0))

  const searchParams = useSearchParams();
  const cid = searchParams.get('cid') || '0';
 
  const {data: postData} = useReadCuratePostsPosts({
    address: CONTRACT.POST as `0x${string}`,
    args: [BigInt(+cid)],
  })

  const { address } = useAccount()
  const { data: tokenBalance } = useReadCurateTokenBalanceOf({
    address: CONTRACT.TOKEN as `0x${string}`,
    args: [address as `0x${string}`],
  })

  const handleScore = (e: React.FormEvent) => {
    e.preventDefault()
    if (voteValue) {
      writeContract({
        address: CONTRACT.POST as `0x${string}`,
        args: [BigInt(+cid), voteValue],
      })
    }
  }

  const handleVoteChange = (percentage?: number) => {
    if (!tokenBalance) return;
    const newValue = percentage ? (tokenBalance * BigInt(percentage)) / BigInt(100) : tokenBalance;
    setVoteValue(newValue);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <AlertCircle className="w-16 h-16 mb-4" />
        <p className="text-2xl font-semibold">Blog post not found</p>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">{data.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <time dateTime={data.date}>Published on {new Date(data.date).toLocaleDateString()}</time>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-blue-100 text-blue-800 px-6 py-1 rounded-full">
            <Star className="w-5 h-5 mr-1" />
            <span className="font-medium text-xs">Total Score: {postData && postData[3].toString()}</span>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 px-6 py-1 rounded-full">
            <Award className="w-5 h-5 mr-1" />
            <span className="font-medium text-xs">Settled Score: {postData && postData[4].toString()}</span>
          </div>
          <div className="flex items-center bg-gray-100 text-gray-800 px-6 py-1 rounded-full">
            <span className="font-light text-xs">Author: {postData && postData[1]}</span>
          </div>
        </div>
      </header>

      <div className="prose max-w-none mb-12">
        <MarkdownPreview source={data.content} />
      </div>

      <div className="bg-gray-50 rounded-lg p-8 shadow-inner">
        <form onSubmit={handleScore} className="space-y-6">
          <div>
            <label htmlFor="vote-amount" className="block text-sm font-medium text-gray-700 mb-2">
              Score Amount
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <input
                  id="vote-amount"
                  type="number"
                  value={voteValue?.toString()}
                  onChange={(e) => setVoteValue(e.target.value ? BigInt(e.target.value) : undefined)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                  placeholder="Enter vote amount"
                />
                <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <div className="flex space-x-2">
                {buttons.map(({ label, percentage }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleVoteChange(percentage)}
                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 flex items-center">
              <Coins className="w-4 h-4 mr-1" />
              Your balance: {tokenBalance?.toString() || "0"} SMT
            </div>
            <Button
              type="submit"
              disabled={isScorePending}
             >
              <Star className="w-5 h-5 mr-2" />
              Score
            </Button>
          </div>
        </form>
      </div>
    </article>
  )
}


"use client"

import dynamic from "next/dynamic"
import { useIPFSFetch } from "@/hooks/ipfs/fetchFromIpfs"
import { useWriteCuratePostsVote } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "@/constants/contract"

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview").then((mod) => mod.default), { ssr: false })

interface BlogPostProps {
  id: string
}

export function BlogPost({ id }: BlogPostProps) {

  const {data, isPending} = useIPFSFetch(id);
  const {writeContract} = useWriteCuratePostsVote();

  const handleScore = (e: any) => {
    e.preventDefault();
    const amount = +e.target.amount.value;
    writeContract({
      address: CONTRACT.POST as `0x${string}`,
      args: [BigInt(0), BigInt(amount)],
    })
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Blog post not found</div>
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{data?.data.title}</h1>
      <p className="text-gray-500 mb-6">Published on {data?.data.date}</p>
      <MarkdownPreview source={data?.data.content} />
      <form>
      <input type="text" name="amount"/>
      <button type="submit" onClick={handleScore}>Score</button>
      </form>
    </article>
  )
}


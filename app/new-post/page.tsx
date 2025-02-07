"use client"
import { BlogEditor } from "@/components/BlogEditor"
import { useEffect, useState } from "react"
import { useIPFSUpload } from "@/hooks/ipfs/uploadToIpfs"
import { useRouter } from "next/navigation"
import { useWriteCuratePostsCreatePost } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "../constants/contract"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("# Hello, world!")
  const {mutateAsync, isPending, data} = useIPFSUpload();
  const router = useRouter();

  const {writeContract} = useWriteCuratePostsCreatePost()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync({title, content})
  }

  useEffect(() => {
    if(data) {
      writeContract({
        address: CONTRACT.TOKEN as `0x${string}`,
        args: [data]
      })
      router.push(`/read/${data?.IpfsHash}`);
    }
  }, [data])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <BlogEditor 
          handleSubmit={handleSubmit} 
          content={content}
          setContent={setContent}
          setTitle={setTitle}
          isPending={isPending}
        />
      </main>
    </div>
  )
}
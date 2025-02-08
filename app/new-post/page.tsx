"use client"
import { BlogEditor } from "@/components/BlogEditor"
import { useEffect, useState } from "react"
import { useIPFSUpload } from "@/hooks/ipfs/uploadToIpfs"
import { useRouter } from "next/navigation"
import { useWriteCuratePostsCreatePost } from "@/hooks/wagmi/contracts"
import { CONTRACT } from "../../constants/contract"
import { ROUTES } from "@/constants/routes"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("# Hello, world!")
  const {mutateAsync, isPending, data} = useIPFSUpload();
  const router = useRouter();

  const {writeContractAsync, isPending: contractPending} = useWriteCuratePostsCreatePost()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync({title, content})
  }

  const handleContractWrite = async () => {
    await writeContractAsync({
      address: CONTRACT.POST as `0x${string}`,
      args: [data.IpfsHash]
    })
    router.push(ROUTES.READ(data.IpfsHash))
  }

  useEffect(() => {
    data && handleContractWrite();
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
          contractPending={contractPending}
        />
      </main>
    </div>
  )
}
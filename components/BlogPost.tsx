"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import axios from "axios"

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview").then((mod) => mod.default), { ssr: false })

interface BlogPostProps {
  id: string
}

interface BlogData {
  title: string
  content: string
  date?: string
}

export function BlogPost({ id }: BlogPostProps) {
  const [blogData, setBlogData] = useState<BlogData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log(id, "is the hash")
  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await axios.get(
          `https://gateway.pinata.cloud/ipfs/${id}`
        );
      setIsLoading(true)
      setBlogData({
        title: response.data.title,
        content: response.data.content,
        date: new Date(response.data.date).toLocaleDateString(),
      })
      setIsLoading(false)
    }

    fetchBlogData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!blogData) {
    return <div>Blog post not found</div>
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
      <p className="text-gray-500 mb-6">Published on {blogData.date}</p>
      <MarkdownPreview source={blogData.content} />
    </article>
  )
}


"use client"

import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false })

export function BlogEditor({handleSubmit, title, setTitle, setContent, content, isPending}: any) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        placeholder="Enter Your Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="!text-[25px] h-16 border-none p-0 shadow-none placeholder-gray-300 focus:border-none focus:ring-0"
      />
      <MDEditor value={content} onChange={(value) => setContent(value || "")} height={500} />
      <Button type="submit" className="w-full" disabled={isPending}>
        {!isPending ? "Publish": "Uploading"}
      </Button>
    </form>
  )
}


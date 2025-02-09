"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Type, Hash, Edit3, Eye } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BlogEditorProps {
  handleSubmit: (e: React.FormEvent) => void
  title: string
  setTitle: (title: string) => void
  content: string
  setContent: (content: string) => void
  isPending: boolean
  contractPending: boolean
}

export function BlogEditor({
  handleSubmit,
  title,
  setTitle,
  setContent,
  content,
  isPending,
  contractPending,
}: BlogEditorProps) {
  const [wordCount, setWordCount] = useState(0)
  const [activeTab, setActiveTab] = useState("edit")

  useEffect(() => {
    const words = content.trim().split(/\s+/)
    setWordCount(words.length)
  }, [content])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <Type className="w-5 h-5" />
            <span className="text-sm font-medium">Title</span>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter Your Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold h-16 border-none p-0 shadow-none placeholder-gray-300 focus:border-none focus:ring-0"
              maxLength={100}
            />
            <span className="absolute right-0 bottom-0 text-sm text-gray-400">{title?.length}/100</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5" />
              <span className="text-sm font-medium">Content</span>
            </div>
            <span className="text-sm">{wordCount} words</span>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="edit" className="flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[700px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your content here (Markdown supported)"
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="w-full h-[700px] p-4 border border-gray-200 rounded-lg overflow-auto bg-white">
                <ReactMarkdown className="prose max-w-none">{content}</ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={isPending || contractPending}
          >
            {!isPending ? (
              "Publish"
            ) : contractPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Waiting for contract...
              </>
            ) : (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading to IPFS...
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}


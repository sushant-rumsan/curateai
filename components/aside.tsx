"use client"

import { ConnectKitButton } from "connectkit"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HashIcon as Hashtag } from "lucide-react"

// Get tags from API
import { tags } from "@/constants/tags"

export function Aside() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = searchParams?.get("t")

  const [selectedTag, setSelectedTag] = useState<string | null>("all")

  useEffect(() => {
    setSelectedTag(t || "all")
  }, [])

  const handleTagClick = (tag: string) => {
    const newTag = tag === selectedTag ? null : tag
    setSelectedTag(newTag)

    const query = tag === 'all' ? "?" : newTag ? `?t=${newTag}` : ""
    router.push(query, { scroll: false })
  }

  return (
    <aside className="hidden lg:block space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-bold text-2xl mb-3 text-gray-800">CurateAI Community</h2>
        <p className="text-gray-600 text-sm mb-6">
          Share your content, retain ownership, and earn SMT coins based on engagement.
        </p>
        <div className="space-y-3">
          <ConnectKitButton.Custom>
            {({ isConnected, show }) => (
              <button
                onClick={show}
                className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {isConnected ? "Connected" : "Connect Wallet"}
              </button>
            )}
          </ConnectKitButton.Custom>
          <button className="w-full py-2.5 px-4 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Create Post
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <h2 className="font-bold text-lg px-6 py-4 border-b border-gray-200 text-gray-800">Trending Topics</h2>
        <ScrollArea className="h-[400px] mt-4">
          <ul className="divide-y divide-gray-100">
            {tags.map((tag) => (
              <li key={tag}>
                <button
                  className={`w-full px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 transition duration-150 ease-in-out ${
                    selectedTag === tag ? "bg-blue-50 text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  <Hashtag className={`w-4 h-4 ${selectedTag === tag ? "text-blue-500" : "text-gray-400"}`} />
                  <span className="text-sm font-medium">{tag}</span>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </aside>
  )
}

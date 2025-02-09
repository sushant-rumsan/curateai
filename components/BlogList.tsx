"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tag, Search, Calendar, Star } from "lucide-react"

export type BlogPost = {
  id: string
  title: string
  content: string
  imageUrl: string
  contentHash: string
  internal_id: string
  tags: string[]
  date: string
  score: number
}

const tags = ["All", "Technology", "Design", "Business", "Lifestyle", "Health"]

export default function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  const router = useRouter()
  const [selectedTag, setSelectedTag] = useState("All")

  const filteredPosts = selectedTag === "All" ? blogPosts : blogPosts.filter((post) => post.tags.includes(selectedTag))

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <WebsiteInfo />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">Latest Articles</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="space-y-8">
          {filteredPosts.map((post: BlogPost) => (
            <article
              key={post.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-102 cursor-pointer"
              onClick={() => router.push(`/read/${post.contentHash}?cid=${post.internal_id}`)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  <Image
                    src={`https://picsum.photos/id/${post.internal_id}/1200/600`}
                    alt={`Cover image for ${post.title}`}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center mb-2">
                    <Tag className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">Blockchain</span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-blue-300 hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-400 mb-4">{post.content.slice(0, 150)}...</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Star className="w-4 h-4 mr-1" />
                    <span>{post.score} points</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function WebsiteInfo() {
  return (
    <section className="bg-gradient-to-r from-gray-700 to-black-900 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">Welcome to CurateAi</h2>
          <p className="text-md mb-6">
          Unlock the power of blockchain with Curate AI. Share your content, retain ownership, and earn tokens based on engagement. Experience transparency, security, and fair rewards—empowering creators with every word. Join Curate AI today and be part of the decentralized future!
          <br />
          <br />
          Earn SMT coins, get creative! 😉
          </p>
          <button className="bg-white text-gray-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition-colors">
            Discover More
          </button>
        </div>
          <Image
            src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
            alt="Futuristic technology illustration"
            width={300}
            height={400}
            unoptimized
          />
      </div>
    </section>
  )
}


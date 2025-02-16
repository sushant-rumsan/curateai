"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Aside } from "./aside";

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  contentHash: string;
  internal_id: string;
  tags: string[];
  date: string;
  score: number;
  userRating: number;
  aiRating: number;
};

const tags = ["All", "Technology", "Design", "Business", "Lifestyle", "Health"];

export default function BlogList({ blogPosts }: { blogPosts: BlogPost[] }) {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState("All");
console.log(blogPosts)
  const filteredPosts =
    selectedTag === "All"
      ? blogPosts
      : (blogPosts.filter((post) => post.tags.includes(selectedTag)) ?? []);

  return (
    <div className='min-h-screen bg-white'>
      <main className='max-w-[1280px] mx-auto px-4 pt-[72px] grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4'>
        <div>
          <header className='mb-4'>
            <nav className='flex gap-3 border-b border-gray-100'>
              {["Top", "Latest", ].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 text-[16px] border-b-2 -mb-[1px] ${
                    item === "Top"
                      ? "border-blue-600 text-blue-600 font-medium"
                      : "border-transparent text-gray-600 hover:text-blue-600"
                  }`}>
                  {item}
                </button>
              ))}
            </nav>
          </header>

          <div className='space-y-2'>
            {filteredPosts?.map((post: BlogPost) => (
              <article
                key={post.id}
                className='p-5 border border-gray-100 rounded-lg hover:border-gray-200 cursor-pointer bg-white'
                onClick={() =>
                  router.push(
                    `/read/${post.contentHash}?cid=${post.internal_id}`
                  )
                }>
                <div className='flex gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 text-[14px]'>
                      <span className='font-medium text-gray-900 hover:text-blue-600'>
                        Author Name
                      </span>
                      <span className='text-gray-500'>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className='text-[20px] font-bold text-gray-900 hover:text-blue-600 my-2'>
                      {post.title}
                    </h2>
                    <div className='flex flex-wrap gap-1 mb-3'>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-[14px] text-gray-600 hover:text-blue-600 hover:bg-blue-50 py-1 px-1.5 rounded'>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className='flex items-center gap-4 text-[14px] text-gray-600'>
                      <button className='flex items-center gap-2 hover:text-blue-600'>
                        ❤️ {post?.userRating} user score | {post?.aiRating || 0}{" "}
                        AI rating
                      </button>
                      <button className='flex items-center gap-2 hover:text-blue-600'>
                        💬 Add comment
                      </button>
                      <span className='ml-auto'>4 min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Aside />
      </main>
    </div>
  );
}

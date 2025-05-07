"use client";

import dynamic from "next/dynamic";
import { useIPFSFetch } from "@/hooks/ipfs/fetchFromIpfs";

import { contract } from "@/constants/contract";
import { useState } from "react";
import {
  Loader2,
  AlertCircle,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Coins,
} from "lucide-react";
import type React from "react";
import { buttons } from "@/constants/vote_button";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  useReadCurateAiPostsPosts,
  useReadCurateAiTokenBalanceOf,
  useWriteCurateAiVoteVote,
} from "@/hooks/wagmi/contracts";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface BlogPostProps {
  id: string;
}

export function BlogPost({ id }: BlogPostProps) {
  const { data, isPending } = useIPFSFetch(id);
  const { writeContract, isPending: isScorePending } =
    useWriteCurateAiVoteVote();
  const [voteValue, setVoteValue] = useState<bigint | undefined>(BigInt(0));

  const searchParams = useSearchParams();
  const cid = searchParams?.get("cid") || "0";

  const { data: postData } = useReadCurateAiPostsPosts({
    address: contract.post as `0x${string}`,
    args: [BigInt(+cid) || BigInt(0)],
  });

  const address = localStorage.getItem("user");

  const { data: tokenBalance } = useReadCurateAiTokenBalanceOf({
    address: contract.token as `0x${string}`,
    args: [address as `0x${string}`],
  });

  const handleScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (voteValue) {
      writeContract({
        address: contract.post as `0x${string}`,
        args: [BigInt(+cid), voteValue],
      });
    }
  };

  const handleVoteChange = (percentage?: number) => {
    if (!tokenBalance) return;
    const newValue = percentage
      ? (tokenBalance * BigInt(percentage)) / BigInt(100)
      : tokenBalance;
    setVoteValue(newValue);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <AlertCircle className="w-16 h-16 mb-4 text-red-500" />
        <p className="text-xl font-semibold text-gray-900">
          Blog post not found
        </p>
        <p className="text-gray-600 mt-2">
          The post you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-[1280px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
        <article className="bg-white">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-gray-900">Legends</div>
                <div className="text-sm text-gray-600">
                  Posted on {new Date(data.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {data.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {["blockchain", "web3", "development"].map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 py-1 px-2 rounded-full cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 text-gray-600">
              <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span>{postData ? postData[3].toString() : "0"} reactions</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span>Add comment</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Bookmark className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          <Separator className="my-8" />

          <div className="prose max-w-none mb-12">
            <MarkdownPreview source={data.content} />
          </div>

          <Separator className="my-8" />

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Score this post</h2>
            <form onSubmit={handleScore} className="space-y-6">
              <div>
                <label
                  htmlFor="vote-amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Score Amount
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <input
                      id="vote-amount"
                      type="number"
                      value={voteValue?.toString()}
                      onChange={(e) =>
                        setVoteValue(
                          e.target.value ? BigInt(e.target.value) : undefined
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                      placeholder="Enter vote amount"
                    />
                    <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {buttons.map(({ label, percentage }) => (
                      <Button
                        key={label}
                        type="button"
                        variant="outline"
                        onClick={() => handleVoteChange(percentage)}
                        className="flex-1 sm:flex-none"
                      >
                        {label}
                      </Button>
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
                  className="px-6"
                >
                  {isScorePending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scoring...
                    </>
                  ) : (
                    "Score Post"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-gray-500 text-sm">
                  {postData
                    ? `${postData[1].toString().slice(0, 8)}...${postData[1]
                        .toString()
                        .slice(-8)}`
                    : "Anonymous"}
                </div>
                <div className="text-sm text-gray-600">Author</div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Follow
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <h2 className="font-bold px-6 py-4 border-b border-gray-200">
              More from CurateAI
            </h2>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3].map((i) => (
                <a
                  key={i}
                  href="#"
                  className="block p-6 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-1">
                    Another interesting blockchain post
                  </h3>
                  <div className="text-sm text-gray-600">
                    {new Date().toLocaleDateString()} • 5 min read
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

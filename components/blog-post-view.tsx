"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageSquare,
  Flag,
  Share2,
  Calendar,
  Clock,
  ThumbsUp,
  Send,
  User,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

// Mock data for the blog post
const mockBlogPost = {
  id: "1",
  slug: "understanding-blockchain-technology",
  title: "Understanding Blockchain Technology: A Comprehensive Guide",
  content: `
# Understanding Blockchain Technology

![Blockchain Technology](/placeholder.svg?height=400&width=800)

## Introduction

Blockchain technology has emerged as one of the most transformative innovations of the 21st century. At its core, blockchain is a distributed ledger technology that enables secure, transparent, and immutable record-keeping without the need for a central authority.

## How Blockchain Works

Blockchain operates on a decentralized network of computers, each maintaining a copy of the ledger. When a new transaction is initiated, it is grouped with others into a "block." This block is then:

1. **Verified** by the network through consensus mechanisms
2. **Added** to the existing chain of blocks
3. **Distributed** across the network

This process creates an immutable record that cannot be altered without consensus from the network.

## Key Features of Blockchain

- **Decentralization**: No single entity controls the network
- **Transparency**: All transactions are visible to network participants
- **Immutability**: Once recorded, data cannot be altered
- **Security**: Cryptographic techniques protect the integrity of the data

## Applications Beyond Cryptocurrency

While blockchain is most commonly associated with cryptocurrencies like Bitcoin, its applications extend far beyond:

- **Supply Chain Management**: Tracking products from origin to consumer
- **Healthcare**: Secure sharing of patient records
- **Voting Systems**: Creating tamper-proof election processes
- **Smart Contracts**: Self-executing contracts with terms written in code

## Code Example

\`\`\`javascript
// Simple example of a blockchain block
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index + 
      this.previousHash + 
      this.timestamp + 
      JSON.stringify(this.data)
    ).toString();
  }
}
\`\`\`

## Conclusion

Blockchain technology continues to evolve and find new applications across industries. As we move forward, the focus will likely shift toward addressing scalability challenges and regulatory concerns while expanding the technology's utility beyond its current applications.
  `,
  author: {
    id: "author1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Blockchain researcher and technology enthusiast",
  },
  publishedAt: new Date("2023-09-15T10:30:00"),
  readTime: "8 min read",
  tags: ["blockchain", "technology", "cryptocurrency", "web3"],
  upvotes: 124,
  claps: 89,
  comments: [
    {
      id: "comment1",
      author: {
        id: "user1",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      content:
        "Great article! I've been trying to understand blockchain for a while, and this really helped clarify some concepts.",
      createdAt: new Date("2023-09-15T14:22:00"),
      upvotes: 12,
    },
    {
      id: "comment2",
      author: {
        id: "user2",
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      content:
        "I'd love to see a follow-up article on how blockchain is being implemented in supply chain management specifically. There are some fascinating use cases there!",
      createdAt: new Date("2023-09-16T09:15:00"),
      upvotes: 8,
    },
  ],
};

interface BlogPostViewProps {
  slug: string;
}

export default function BlogPostView({ slug }: BlogPostViewProps) {
  const router = useRouter();
  const [post, setPost] = useState(mockBlogPost);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [upvoteWeight, setUpvoteWeight] = useState(50);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasClapped, setHasClapped] = useState(false);
  const [hasFlagged, setHasFlagged] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [clapCount, setClapCount] = useState(post.claps);
  const [comments, setComments] = useState(post.comments);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Simulate loading the blog post
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle upvote
  const handleUpvote = () => {
    if (!hasUpvoted) {
      // Calculate the weighted upvote (in a real app, you'd send this to the server)
      const weightedValue = Math.ceil(upvoteWeight / 100);
      setUpvoteCount((prev) => prev + weightedValue);
      setHasUpvoted(true);
    } else {
      // Remove upvote
      setUpvoteCount((prev) => prev - 1);
      setHasUpvoted(false);
    }
  };

  // Handle clap
  const handleClap = () => {
    setClapCount((prev) => prev + 1);
    setHasClapped(true);

    // Add animation effect
    setTimeout(() => {
      setHasClapped(false);
    }, 300);
  };

  // Handle flag
  const handleFlag = () => {
    setHasFlagged(!hasFlagged);
    // In a real app, you would send a report to the server
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmittingComment(true);

    // Simulate API call
    setTimeout(() => {
      const newCommentObj = {
        id: `comment${comments.length + 1}`,
        author: {
          id: "currentUser",
          name: "Current User",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        content: newComment,
        createdAt: new Date(),
        upvotes: 0,
      };

      setComments((prev) => [newCommentObj, ...prev]);
      setNewComment("");
      setIsSubmittingComment(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f9fafb] to-[#f9fafb] pt-16 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-blue-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-blue-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f9fafb] to-[#f9fafb] pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3 border border-gray-200">
                <AvatarImage
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.bio}</p>
              </div>
            </div>

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {formatDistanceToNow(post.publishedAt, { addSuffix: true })}
              </span>
            </div>

            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <article className="prose prose-blue max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>

        {/* Interaction Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Upvote with Weight Slider */}
              <div className="flex items-center">
                <Button
                  variant={hasUpvoted ? "default" : "outline"}
                  size="sm"
                  onClick={handleUpvote}
                  className={`mr-2 ${
                    hasUpvoted
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 border-blue-200"
                  }`}
                >
                  <ThumbsUp
                    className={`h-4 w-4 mr-1.5 ${
                      hasUpvoted ? "fill-white" : ""
                    }`}
                  />
                  <span>{upvoteCount}</span>
                </Button>

                <div className="hidden sm:flex items-center gap-2 w-32">
                  <Slider
                    value={[upvoteWeight]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setUpvoteWeight(value[0])}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500 w-8">
                    {upvoteWeight}%
                  </span>
                </div>
              </div>

              {/* Clap Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                animate={hasClapped ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                onClick={handleClap}
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600"
              >
                <Heart
                  className={`h-5 w-5 ${
                    hasClapped ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>{clapCount}</span>
              </motion.button>

              {/* Comments Count */}
              <button
                onClick={() =>
                  document
                    .getElementById("comments-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{comments.length}</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Flag Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFlag}
                className={hasFlagged ? "text-red-500" : "text-gray-500"}
              >
                <Flag
                  className={`h-4 w-4 ${hasFlagged ? "fill-red-100" : ""}`}
                />
              </Button>

              {/* Share Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="text-gray-500"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div
          id="comments-section"
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3 min-h-[100px] border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!newComment.trim() || isSubmittingComment}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmittingComment ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Post Comment
              </Button>
            </div>
          </form>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.author.avatar || "/placeholder.svg"}
                        alt={comment.author.name}
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">
                        {comment.author.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(comment.createdAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{comment.upvotes}</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-600">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No comments yet
              </h3>
              <p className="text-gray-500">
                Be the first to share your thoughts on this post
              </p>
            </div>
          )}
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-100">
              <AvatarImage
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
              />
              <AvatarFallback className="text-xl">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Written by {post.author.name}
              </h3>
              <p className="text-gray-600 mb-3">{post.author.bio}</p>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

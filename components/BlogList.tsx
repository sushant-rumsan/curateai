"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Heart,
  MessageSquare,
  Bookmark,
  Clock,
  TrendingUp,
  FlameIcon as Fire,
  HomeIcon,
  BookmarkIcon,
  TagIcon,
  Settings,
  BarChart3,
  Zap,
  Star,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  contentHash: string;
  internal_id: string;
  tags: string[];
  date: string;
  score: number;
  userRating: number;
  aiRating: number;
  ipfsHash?: string;
};

// Sample blog cover images from Unsplash
const blogImages = [
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
];

export default function BlogList({ blogPosts }: { blogPosts?: BlogPost[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("relevant");
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null);
  const [animateNotification, setAnimateNotification] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      direction: number;
      opacity: number;
      color: string;
    }>
  >([]);

  // Generate enhanced particles with more vibrant colors
  useEffect(() => {
    const particleCount = 15; // Reduced count since they'll be much larger
    const vibrantColors = [
      "rgba(59, 130, 246, 0.2)", // Blue
      "rgba(99, 102, 241, 0.2)", // Indigo
      "rgba(139, 92, 246, 0.2)", // Purple
      "rgba(236, 72, 153, 0.2)", // Pink
      "rgba(14, 165, 233, 0.2)", // Sky
      "rgba(6, 182, 212, 0.2)", // Cyan
    ];

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 100, // Huge size (100-250px)
      speed: Math.random() * 0.05 + 0.01, // Very slow movement
      direction: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.05, // Very low opacity (0.05-0.2)
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
    }));
    setParticles(newParticles);
  }, []);

  // Animation triggers
  useEffect(() => {
    // Pulse notification every 5 seconds
    const interval = setInterval(() => {
      setAnimateNotification(true);
      setTimeout(() => setAnimateNotification(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  const handleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f9fafb] to-[#f9fafb] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              background: particle.color,
              filter: `blur(${particle.size / 4}px)`, // Heavy blur effect
            }}
            animate={{
              x: [
                0,
                Math.cos(particle.direction * (Math.PI / 180)) *
                  100 *
                  particle.speed,
                Math.cos(particle.direction * (Math.PI / 180)) *
                  200 *
                  particle.speed,
              ],
              y: [
                0,
                Math.sin(particle.direction * (Math.PI / 180)) *
                  100 *
                  particle.speed,
                Math.sin(particle.direction * (Math.PI / 180)) *
                  200 *
                  particle.speed,
              ],
              opacity: [
                particle.opacity,
                particle.opacity * 1.2,
                particle.opacity,
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30 + Math.random() * 40, // Very slow animation (30-70s)
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Add animated gradient orbs */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 bg-gradient-to-r from-blue-400 to-purple-500"
          style={{ top: "10%", left: "5%", filter: "blur(80px)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 bg-gradient-to-r from-pink-400 to-blue-500"
          style={{ bottom: "15%", right: "10%", filter: "blur(100px)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -70, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </div>

      <Navbar />
      <div className="flex pt-16 relative z-10">
        {/* Left Sidebar */}
        <motion.aside
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-56 fixed left-0 top-12 h-screen py-6 px-5 bg-white border-r border-gray-200 overflow-y-auto shadow-sm"
        >
          <nav className="space-y-2 mb-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                    Home
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full group-hover:bg-blue-100 transition-colors">
                  12
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/reading-list"
                className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md group transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookmarkIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                    Reading List
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full group-hover:bg-blue-100 transition-colors">
                  5
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/tags"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md group transition-colors"
              >
                <TagIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                  # Tags
                </span>
              </Link>
            </motion.div>
          </nav>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                POPULAR TAGS
              </h3>
              <motion.button
                className="text-gray-400 hover:text-blue-500"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Settings className="h-3.5 w-3.5" />
              </motion.button>
            </div>
            <div className="space-y-1">
              {[
                "blockchain",
                "web3",
                "javascript",
                "react",
                "nextjs",
                "defi",
                "nft",
                "crypto",
              ].map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/t/${tag}`}
                    className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  >
                    <span className="font-medium">#{tag}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 ml-56 mr-72 px-10 py-8"
        >
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-6 flex items-center"
              >
                <Zap className="h-7 w-7 text-blue-500 mr-2" />
                Insights & Analysis
              </motion.h1>
              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="bg-white shadow-sm rounded-full p-1 space-x-1 border border-gray-200">
                  <TabsTrigger
                    value="relevant"
                    className="text-sm rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                  >
                    <Star className="h-3.5 w-3.5 mr-1.5" />
                    Relevant
                  </TabsTrigger>
                  <TabsTrigger
                    value="latest"
                    className="text-sm rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                  >
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Latest
                  </TabsTrigger>
                  <TabsTrigger
                    value="top"
                    className="text-sm rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                  >
                    <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                    Top
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-0"
              >
                {/* First Article */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="cursor-pointer bg-white rounded-lg shadow-sm mb-5 overflow-hidden border border-gray-100"
                  onClick={() => router.push(`/read/1?cid=1`)}
                  onMouseEnter={() => setHoveredArticle("1")}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Left content */}
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg text-xs font-bold mr-3">
                            CC
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Casey Morgan, PhD
                            </p>
                            <p className="text-xs text-gray-500">Today</p>
                          </div>

                          {hoveredArticle === "1" && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-2 text-gray-400 hover:text-blue-500"
                            >
                              <span className="text-lg">...</span>
                            </motion.button>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                          Exploring decentralized autonomous organizations as an
                          emerging governance model for modern enterprises and
                          their operational frameworks.
                        </h2>

                        <p className="text-base text-gray-700 mb-4 line-clamp-2">
                          Exploring decentralized autonomous organizations as an
                          emerging governance model for modern enterprises and
                          their operational frameworks.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {["blockchain", "technology", "web3"].map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-1"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center text-gray-500 text-sm">
                          <motion.button
                            className={`flex items-center gap-1.5 mr-5 ${
                              likedPosts.includes("1")
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                            onClick={(e) => handleLike("1", e)}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                likedPosts.includes("1") ? "fill-red-500" : ""
                              }`}
                            />
                            <span>13</span>
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-1.5 mr-5 text-gray-400"
                            whileTap={{ scale: 0.9 }}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>17</span>
                          </motion.button>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                            1m
                          </span>

                          {hoveredArticle === "1" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-auto flex"
                            >
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className={`h-9 w-9 rounded-full ${
                                  savedPosts.includes("1")
                                    ? "text-blue-500 bg-blue-50"
                                    : "text-gray-400"
                                }`}
                                onClick={(e) => handleSave("1", e)}
                              >
                                <Bookmark
                                  className={`h-4 w-4 mx-auto ${
                                    savedPosts.includes("1")
                                      ? "fill-blue-500"
                                      : ""
                                  }`}
                                />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Right image */}
                      <div className="mt-4 md:mt-0 md:w-1/4">
                        <div className="relative rounded-lg overflow-hidden h-32 w-full">
                          <img
                            src={blogImages[0] || "/placeholder.svg"}
                            alt="Blog cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Second Article */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="cursor-pointer bg-white rounded-lg shadow-sm mb-5 overflow-hidden border border-gray-100"
                  onClick={() => router.push(`/read/2?cid=2`)}
                  onMouseEnter={() => setHoveredArticle("2")}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Left content */}
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg text-xs font-bold mr-3">
                            SD
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Today
                            </p>
                          </div>

                          {hoveredArticle === "2" && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-2 text-gray-400 hover:text-blue-500"
                            >
                              <span className="text-lg">...</span>
                            </motion.button>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                          sd
                        </h2>

                        <p className="text-base text-gray-700 mb-4 line-clamp-2">
                          Exploring decentralized autonomous organizations as an
                          emerging governance model for modern enterprises and
                          their operational frameworks.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {["blockchain", "technology", "finance"].map(
                            (tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-1"
                              >
                                #{tag}
                              </Badge>
                            )
                          )}
                        </div>

                        <div className="flex items-center text-gray-500 text-sm">
                          <motion.button
                            className={`flex items-center gap-1.5 mr-5 ${
                              likedPosts.includes("2")
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                            onClick={(e) => handleLike("2", e)}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                likedPosts.includes("2") ? "fill-red-500" : ""
                              }`}
                            />
                            <span>41</span>
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-1.5 mr-5 text-gray-400"
                            whileTap={{ scale: 0.9 }}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>13</span>
                          </motion.button>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                            1m
                          </span>

                          {hoveredArticle === "2" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-auto flex"
                            >
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className={`h-9 w-9 rounded-full ${
                                  savedPosts.includes("2")
                                    ? "text-blue-500 bg-blue-50"
                                    : "text-gray-400"
                                }`}
                                onClick={(e) => handleSave("2", e)}
                              >
                                <Bookmark
                                  className={`h-4 w-4 mx-auto ${
                                    savedPosts.includes("2")
                                      ? "fill-blue-500"
                                      : ""
                                  }`}
                                />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Right image */}
                      <div className="mt-4 md:mt-0 md:w-1/4">
                        <div className="relative rounded-lg overflow-hidden h-32 w-full">
                          <img
                            src={blogImages[1] || "/placeholder.svg"}
                            alt="Blog cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Third Article */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="cursor-pointer bg-white rounded-lg shadow-sm mb-5 overflow-hidden border border-gray-100"
                  onClick={() => router.push(`/read/3?cid=3`)}
                  onMouseEnter={() => setHoveredArticle("3")}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Left content */}
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg text-xs font-bold mr-3">
                            RZD
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Dakota Chen, Consultant
                            </p>
                            <p className="text-xs text-gray-500">Today</p>
                          </div>

                          {hoveredArticle === "3" && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-2 text-gray-400 hover:text-blue-500"
                            >
                              <span className="text-lg">...</span>
                            </motion.button>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                          Poor Kid
                        </h2>

                        <p className="text-base text-gray-700 mb-4 line-clamp-2">
                          An analysis of blockchain technology's impact on
                          enterprise systems and how organizations are
                          implementing decentralized solutions to improve
                          operational efficiency.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {["blockchain", "technology", "finance"].map(
                            (tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-1"
                              >
                                #{tag}
                              </Badge>
                            )
                          )}
                        </div>

                        <div className="flex items-center text-gray-500 text-sm">
                          <motion.button
                            className={`flex items-center gap-1.5 mr-5 ${
                              likedPosts.includes("3")
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                            onClick={(e) => handleLike("3", e)}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                likedPosts.includes("3") ? "fill-red-500" : ""
                              }`}
                            />
                            <span>62</span>
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-1.5 mr-5 text-gray-400"
                            whileTap={{ scale: 0.9 }}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>14</span>
                          </motion.button>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                            1m
                          </span>

                          {hoveredArticle === "3" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-auto flex"
                            >
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className={`h-9 w-9 rounded-full ${
                                  savedPosts.includes("3")
                                    ? "text-blue-500 bg-blue-50"
                                    : "text-gray-400"
                                }`}
                                onClick={(e) => handleSave("3", e)}
                              >
                                <Bookmark
                                  className={`h-4 w-4 mx-auto ${
                                    savedPosts.includes("3")
                                      ? "fill-blue-500"
                                      : ""
                                  }`}
                                />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Right image */}
                      <div className="mt-4 md:mt-0 md:w-1/4">
                        <div className="relative rounded-lg overflow-hidden h-32 w-full">
                          <img
                            src={blogImages[2] || "/placeholder.svg"}
                            alt="Blog cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Fifth Article (Previously Compact, now matching layout) */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="cursor-pointer bg-white rounded-lg shadow-sm mb-5 overflow-hidden border border-gray-100"
                  onClick={() => router.push(`/read/5?cid=5`)}
                  onMouseEnter={() => setHoveredArticle("5")}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Left content */}
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg text-xs font-bold mr-3">
                            SA
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Sarah Adams
                            </p>
                            <p className="text-xs text-gray-500">Yesterday</p>
                          </div>

                          {hoveredArticle === "5" && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-2 text-gray-400 hover:text-blue-500"
                            >
                              <span className="text-lg">...</span>
                            </motion.button>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                          How Smart Contracts Are Changing Legal Agreements
                        </h2>

                        <p className="text-base text-gray-700 mb-4 line-clamp-2">
                          Smart contracts provide automated, trustless execution
                          of agreements without the need for intermediaries.
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {["smartcontracts", "legal"].map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-1"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center text-gray-500 text-sm">
                          <motion.button
                            className={`flex items-center gap-1.5 mr-5 ${
                              likedPosts.includes("5")
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                            onClick={(e) => handleLike("5", e)}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                likedPosts.includes("5") ? "fill-red-500" : ""
                              }`}
                            />
                            <span>56</span>
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-1.5 mr-5 text-gray-400"
                            whileTap={{ scale: 0.9 }}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>8</span>
                          </motion.button>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                            1d
                          </span>

                          {hoveredArticle === "5" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-auto flex"
                            >
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className={`h-9 w-9 rounded-full ${
                                  savedPosts.includes("5")
                                    ? "text-blue-500 bg-blue-50"
                                    : "text-gray-400"
                                }`}
                                onClick={(e) => handleSave("5", e)}
                              >
                                <Bookmark
                                  className={`h-4 w-4 mx-auto ${
                                    savedPosts.includes("5")
                                      ? "fill-blue-500"
                                      : ""
                                  }`}
                                />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Right image */}
                      <div className="mt-4 md:mt-0 md:w-1/4">
                        <div className="relative rounded-lg overflow-hidden h-32 w-full">
                          <img
                            src={blogImages[4] || "/placeholder.svg"}
                            alt="Blog cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Add more articles as needed */}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>

        {/* Right Sidebar */}
        <motion.aside
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-72 fixed right-0 top-12 h-screen py-8 px-6 bg-white border-l border-gray-200 overflow-y-auto shadow-sm"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Newsletter Section */}
            <motion.div
              whileHover={{
                y: -2,
                boxShadow:
                  "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.05)",
              }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 shadow-sm"
            >
              <motion.div className="flex items-center mb-2">
                <h3 className="font-bold text-lg text-gray-900">
                  Stay Updated
                </h3>
                <motion.div
                  animate={animateNotification ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className="w-2 h-2 rounded-full bg-blue-500 ml-2"
                />
              </motion.div>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest insights and analysis delivered to your inbox
                weekly.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>

            {/* Trending Section */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> Trending
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Why TypeScript is Taking Over Frontend Development",
                    count: "374",
                  },
                  {
                    title:
                      "Building a Full-Stack App with Next.js and Supabase",
                    count: "290",
                  },
                  {
                    title: "The Future of Web3: Beyond the Hype",
                    count: "295",
                  },
                  {
                    title: "Mastering React Server Components",
                    count: "353",
                  },
                  {
                    title: "How to Optimize Your Docker Containers",
                    count: "216",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.4,
                    }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "#F0F7FF",
                    }}
                    className="group hover:bg-blue-50 rounded-lg p-3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="font-bold text-blue-400 text-sm mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                          <Fire className="w-3.5 h-3.5 text-amber-500" />
                          <span>{item.count}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Discuss Section */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />{" "}
                Discussions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "What's your favorite VS Code extension?",
                    comments: "17",
                    time: "3h",
                  },
                  {
                    title: "Unpopular opinion: TypeScript is overrated",
                    comments: "52",
                    time: "9h",
                  },
                  {
                    title: "How do you stay productive as a developer?",
                    comments: "54",
                    time: "5h",
                  },
                  {
                    title: "React vs. Vue vs. Svelte: Your thoughts?",
                    comments: "8",
                    time: "11h",
                  },
                  {
                    title: "What's your debugging workflow?",
                    comments: "18",
                    time: "11h",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.4,
                    }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "#F0F7FF",
                    }}
                    className="group hover:bg-blue-50 rounded-lg p-3 transition-colors cursor-pointer"
                  >
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                        <span>{item.comments}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.aside>
      </div>
    </div>
  );
}

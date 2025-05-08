"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  FileText,
  BarChart2,
  Shield,
  Edit2,
  Calendar,
  MapPin,
  LinkIcon,
  Twitter,
  Github,
  Heart,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
  ChevronRight,
  Wallet,
} from "lucide-react";
import WalletComponent from "@/components/walletComponent";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
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

  const router = useSearchParams();

  useEffect(() => {
    setActiveTab(router?.get("tabs") || "wallet");
  }, [router]);

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

  // Dummy user data
  const userData = {
    name: "Alex Johnson",
    username: "alexjohnson",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Blockchain developer and writer. Passionate about decentralized technologies and their potential to transform industries.",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    twitter: "@alexjohnson",
    github: "alexjohnson",
    joinDate: "January 2022",
    followers: 1243,
    following: 567,
    posts: 42,
  };

  // Dummy posts data
  const userPosts = [
    {
      id: "1",
      title: "Understanding Zero-Knowledge Proofs: A Comprehensive Guide",
      excerpt:
        "Zero-knowledge proofs allow one party to prove to another that a statement is true without revealing any additional information.",
      date: "2 days ago",
      readTime: "8 min read",
      likes: 124,
      comments: 32,
      views: 1890,
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
      tags: ["blockchain", "cryptography", "privacy"],
    },
    {
      id: "2",
      title: "The Evolution of Smart Contract Platforms",
      excerpt:
        "From Ethereum to newer platforms like Solana and Avalanche, this article explores the evolution of smart contract technology.",
      date: "1 week ago",
      readTime: "12 min read",
      likes: 256,
      comments: 48,
      views: 3420,
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1000&auto=format&fit=crop",
      tags: ["blockchain", "ethereum", "smart-contracts"],
    },
    {
      id: "3",
      title: "Building Decentralized Applications: Best Practices",
      excerpt:
        "Learn the best practices for designing, developing, and deploying decentralized applications on modern blockchain platforms.",
      date: "2 weeks ago",
      readTime: "10 min read",
      likes: 189,
      comments: 27,
      views: 2150,
      image:
        "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000&auto=format&fit=crop",
      tags: ["dapps", "development", "web3"],
    },
  ];

  // Dummy draft posts
  const draftPosts = [
    {
      id: "draft1",
      title: "The Future of Decentralized Finance",
      lastEdited: "Yesterday",
      completionPercentage: 85,
    },
    {
      id: "draft2",
      title: "NFTs Beyond Digital Art: Real-World Applications",
      lastEdited: "3 days ago",
      completionPercentage: 60,
    },
  ];

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
              repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                  />
                  <AvatarFallback className="text-3xl bg-blue-600 text-white">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {userData.name}
                    </h1>
                    <p className="text-gray-500">@{userData.username}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{userData.bio}</p>

                <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-gray-600 mb-6">
                  {userData.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {userData.location}
                    </div>
                  )}
                  {userData.website && (
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 mr-2 text-gray-400" />
                      <a
                        href={userData.website}
                        className="text-blue-600 hover:underline"
                      >
                        {userData.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {userData.joinDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Joined {userData.joinDate}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  {userData.twitter && (
                    <a
                      href={`https://twitter.com/${userData.twitter.replace(
                        "@",
                        ""
                      )}`}
                      className="flex items-center text-blue-500 hover:text-blue-600"
                    >
                      <Twitter className="h-5 w-5 mr-1" />
                      <span>{userData.twitter}</span>
                    </a>
                  )}
                  {userData.github && (
                    <a
                      href={`https://github.com/${userData.github}`}
                      className="flex items-center text-gray-700 hover:text-gray-900"
                    >
                      <Github className="h-5 w-5 mr-1" />
                      <span>{userData.github}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {userData.posts}
                </p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {userData.followers.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {userData.following.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs
              defaultValue="posts"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="bg-white shadow-sm rounded-xl p-1 space-x-1 border border-gray-200 mb-8">
                <TabsTrigger
                  value="posts"
                  className="text-sm rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="drafts"
                  className="text-sm rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Drafts
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="text-sm rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="text-sm rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="wallet"
                  className="text-sm rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-600 px-4 py-2 transition-all"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </TabsTrigger>
              </TabsList>

              {/* Posts Tab */}
              <TabsContent value="posts" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {userPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-5">
                          {/* Left content */}
                          <div className="md:w-3/4">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                              {post.title}
                            </h2>

                            <p className="text-base text-gray-700 mb-4">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
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
                              <div className="flex items-center gap-1.5 mr-5">
                                <Heart className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1.5 mr-5">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center gap-1.5 mr-5">
                                <Eye className="h-4 w-4" />
                                <span>{post.views}</span>
                              </div>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                                {post.readTime}
                              </span>
                            </div>
                          </div>

                          {/* Right image */}
                          <div className="mt-4 md:mt-0 md:w-1/4">
                            <div className="relative rounded-lg overflow-hidden h-32 w-full">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt="Blog cover"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-50"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Drafts Tab */}
              <TabsContent value="drafts" className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Your Drafts
                  </h2>
                  <div className="space-y-4">
                    {draftPosts.map((draft) => (
                      <div
                        key={draft.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {draft.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Last edited: {draft.lastEdited}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Continue Editing
                          </Button>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${draft.completionPercentage}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {draft.completionPercentage}% complete
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Create New Post
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Total Views
                      </h3>
                      <Eye className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">24,892</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">12.5%</span>
                      <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Total Likes
                      </h3>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">3,487</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">8.2%</span>
                      <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Total Comments
                      </h3>
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">1,024</p>
                    <div className="flex items-center mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">5.7%</span>
                      <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Performing Posts
                  </h3>
                  <div className="space-y-4">
                    {userPosts.slice(0, 3).map((post, index) => (
                      <div
                        key={post.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50/50"
                      >
                        <div className="font-bold text-2xl text-blue-500 opacity-50">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900">
                            {post.title}
                          </h4>
                          <div className="flex gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-3.5 w-3.5 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Profile Information
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              defaultValue={userData.name}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              defaultValue={userData.username}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            defaultValue={userData.bio}
                            className="mt-1 h-24"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              defaultValue={userData.location}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              defaultValue={userData.website}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                              id="twitter"
                              defaultValue={userData.twitter}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                              id="github"
                              defaultValue={userData.github}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Save Changes
                        </Button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Account Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="alex.johnson@example.com"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Button variant="outline">Change Password</Button>
                        </div>

                        <Separator className="my-4" />

                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">
                            Danger Zone
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Once you delete your account, there is no going
                            back. Please be certain.
                          </p>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Email Notifications
                            </p>
                            <p className="text-sm text-gray-500">
                              Receive email about your account activity
                            </p>
                          </div>
                          <Switch defaultChecked id="email-notifications" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Comment Notifications
                            </p>
                            <p className="text-sm text-gray-500">
                              Get notified when someone comments on your post
                            </p>
                          </div>
                          <Switch defaultChecked id="comment-notifications" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Like Notifications
                            </p>
                            <p className="text-sm text-gray-500">
                              Get notified when someone likes your post
                            </p>
                          </div>
                          <Switch defaultChecked id="like-notifications" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Newsletter
                            </p>
                            <p className="text-sm text-gray-500">
                              Receive our weekly newsletter
                            </p>
                          </div>
                          <Switch id="newsletter" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Privacy
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Public Profile
                            </p>
                            <p className="text-sm text-gray-500">
                              Make your profile visible to everyone
                            </p>
                          </div>
                          <Switch defaultChecked id="public-profile" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Show Email
                            </p>
                            <p className="text-sm text-gray-500">
                              Show your email on your public profile
                            </p>
                          </div>
                          <Switch id="show-email" />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              Two-Factor Authentication
                            </p>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Enable
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="mt-0">
                <WalletComponent />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

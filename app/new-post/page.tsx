"use client";

import { MediumEditor } from "@/components/MediumEditor";
import { useState, useEffect } from "react";
import { useIPFSUpload } from "@/hooks/ipfs/uploadToIpfs";
import { useRouter } from "next/navigation";
import {
  useReadCurateAiPostsPostCounter,
  useWriteCurateAiPostsCreatePost,
} from "@/hooks/wagmi/contracts";
import { contract } from "../../constants/contract";
import { ConfirmActionModal } from "@/components/modal/confirmActionModal";
import { useCreatePost } from "@/hooks/api-hooks";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Save, 
  Send, 
  Image, 
  Tag, 
  X, 
  HelpCircle, 
  Info,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const {
    mutateAsync,
    isPending,
    data,
    isSuccess: isIPFSUploadSucees,
  } = useIPFSUpload();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const { mutateAsync: apiMutatePost } = useCreatePost();

  const account = localStorage.getItem("user");

  const {
    writeContractAsync,
    isPending: contractPending,
    error,
  } = useWriteCurateAiPostsCreatePost();

  const { data: postCount } = useReadCurateAiPostsPostCounter({
    address: contract.post as `0x${string}`,
  });

  const handlePublish = () => {
    setIsConfirmOpen(true);
  };

  const handleContractWrite = async () => {
    const ipfsHash = data.IpfsHash;
    try {
      await writeContractAsync({
        address: contract.post as `0x${string}`,
        args: [ipfsHash, tags.join(',') || "general"],
      });

      await apiMutatePost({
        title,
        content,
        ipfsHash,
        userWalletAddress: account,
        internal_id: Number(postCount) + 1,
        coverImage,
      });
      setIsConfirmOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Contract write failed:", err);
    }
  };

  const confirmAction = async () => {
    await mutateAsync({
      title,
      content,
      userWalletAddress: account as string,
      tags,
      coverImage,
    });
  };

  useEffect(() => {
    if (isIPFSUploadSucees) {
      handleContractWrite();
    }
  }, [isIPFSUploadSucees]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const saveDraft = () => {
    // In a real app, save to localStorage or backend
    localStorage.setItem('postDraft', JSON.stringify({
      title,
      content,
      coverImage,
      tags
    }));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      {/* Header with glass effect */}
      <header className="sticky top-0 backdrop-blur-sm bg-white/80 border-b z-20 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={saveDraft}
              >
                <Save className="h-4 w-4" />
                <span>{isDraftSaved ? "Saved!" : "Save Draft"}</span>
              </Button>
              {isDraftSaved && (
                <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                  Draft saved successfully!
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-sm"
              disabled={isPending || contractPending}
            >
              <Clock className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            
            <Button
              onClick={handlePublish}
              disabled={isPending || contractPending || !title || !content}
              className="text-sm gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              {isPending || contractPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-0 flex flex-col lg:flex-row gap-6">
        {/* Main Editor Section */}
        <div className="w-full lg:w-3/4">
          <div className="border border-gray-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <div className="p-0">
              <MediumEditor
                content={content}
                setContent={setContent}
                title={title}
                setTitle={setTitle}
                coverImage={coverImage}
                setCoverImage={setCoverImage}
              />
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 space-y-4">
          {/* Tags Section */}
          <div className="border border-gray-200 shadow-sm rounded-xl bg-white">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                Tags
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors group"
                  >
                    {tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-400 group-hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add a tag"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Writing Tips */}
          <div className="border border-gray-200 shadow-sm rounded-xl bg-white">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-gray-500" />
                Writing Tips
              </h3>
              
              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-gray-600">
                  <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Start with a compelling headline that captures attention</span>
                </li>
                <li className="flex gap-2 text-sm text-gray-600">
                  <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Add a high-quality cover image to increase engagement</span>
                </li>
                <li className="flex gap-2 text-sm text-gray-600">
                  <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Use formatting tools to highlight important points</span>
                </li>
                <li className="flex gap-2 text-sm text-gray-600">
                  <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Include relevant tags to help readers discover your content</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Publication Status */}
          <div className="border border-gray-200 shadow-sm rounded-xl bg-white">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                Publication Status
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${title ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Title added</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${content ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Content written</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${coverImage ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Cover image added</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${tags.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Tags added</span>
                </div>
              </div>
              
              {title && content ? (
                <Button 
                  className="w-full mt-4 gap-2"
                  onClick={handlePublish}
                  disabled={isPending || contractPending}
                >
                  Ready to Publish <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <p className="text-sm text-amber-600 mt-4 flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Complete the required fields to publish
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <ConfirmActionModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmAction}
        actionText="Publish Story"
      />
    </motion.div>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardAuth";
import { X, Plus, Save, Send } from "lucide-react";
import { motion } from "framer-motion";
import AdvancedEditor from "@/components/advanced-editor";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server or a service like S3
      // For this example, we'll create a local object URL
      const objectUrl = URL.createObjectURL(file);
      setCoverImage(objectUrl);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      // In a real app, you would redirect to the published post
      alert("Post published successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f9fafb] to-[#f9fafb]">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Create New Post
            </h1>

            <div className="space-y-6">
              {/* Title Input */}
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="pt-6">
                  <Label
                    htmlFor="title"
                    className="text-base font-medium text-gray-700 mb-2 block"
                  >
                    Post Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium border-gray-200 focus:border-blue-300"
                  />
                </CardContent>
              </Card>

              {/* Content Editor */}
              <div className="mb-6">
                <Label className="text-base font-medium text-gray-700 mb-2 block">
                  Post Content
                </Label>
                <AdvancedEditor />
              </div>

              {/* Tags */}
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-400 hover:text-blue-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add up to 5 tags..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                      disabled={tags.length >= 5}
                    />
                    <Button
                      onClick={handleAddTag}
                      disabled={!tagInput || tags.length >= 5}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Tags help readers discover your post. Add up to 5 tags
                    related to your content.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-gray-200">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={isPublishing || !title}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPublishing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Publish
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Type, Hash, Edit3, Eye, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogEditorProps {
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  isPending: boolean;
  contractPending: boolean;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export function BlogEditor({
  handleSubmit,
  title,
  setTitle,
  setContent,
  content,
  isPending,
  contractPending,
  tags,
  setTags
}: BlogEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [activeTab, setActiveTab] = useState("edit");
  

  useEffect(() => {
    setWordCount(content.trim().split(/\s+/).length);
  }, [content]);

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(tags.length >= 5) {
      alert("You can only have 5 tags");
      return;
    }

    const value = e.target.value;
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag && !tags.includes(tag));
      setTags([...tags, ...newTags]);
      e.target.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <Type className="w-5 h-5" />
            <span className="text-sm font-medium">Title</span>
          </div>
          <Input
            type="text"
            placeholder="Enter Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold h-16 border-none p-0 shadow-none placeholder-gray-300 focus:ring-0"
            maxLength={100}
          />
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
                className="w-full h-[700px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
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

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-sm font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
                <X
                  className="ml-2 w-4 h-4 cursor-pointer hover:text-red-500"
                  onClick={() => removeTag(index)}
                />
              </div>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Enter Tags (Comma Separated)"
            onChange={handleTagInput}
            className="text-sm font-bold h-12 border-none p-0 shadow-none placeholder-gray-300 focus:ring-0"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
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
  );
}

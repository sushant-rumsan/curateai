"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Send, Save, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";
import AdvancedEditor from "@/components/advanced-editor";
import AIContentAssistant from "@/components/ai-content-assistant";
import { uploadToIpfs } from "@/hooks/ipfs/uploadToIpfs";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [isAssistantCollapsed, setIsAssistantCollapsed] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const tagInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

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

  const handlePublish = async () => {
    // Upload to ipfs
    const ipfsData = await uploadToIpfs({
      title,
      content: editorContent,
      tags,
    });

    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      // In a real app, you would redirect to the published post
      alert("Post published successfully!");
    }, 1500);
  };

  const handleInsertContent = (content: string) => {
    // If we have selected text, replace only that part
    if (selectedText && editorContent.includes(selectedText)) {
      // Replace the selected text with the new content
      const newContent = editorContent.replace(selectedText, content);
      setEditorContent(newContent);
    } else if (!editorContent.trim()) {
      // If editor is empty, just set the content
      setEditorContent(content);
    } else {
      // Otherwise append to existing content
      setEditorContent((prev) => `${prev}\n\n${content}`);
    }

    // Clear the selected text
    setSelectedText("");
  };

  const toggleAssistant = () => {
    setIsAssistantCollapsed(!isAssistantCollapsed);
  };

  // Function to handle text selection from the editor
  const handleTextSelection = (text: string) => {
    setSelectedText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f9fafb] to-[#f9fafb]">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Title Input - Large editable text */}
            <div className="px-6 pt-6 pb-3">
              <input
                type="text"
                placeholder="New post title here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl font-bold text-gray-900 border-0 focus:outline-none focus:ring-0 placeholder-gray-400"
              />
            </div>

            {/* Tags Input */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2 mb-2">
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
                {tags.length < 5 && (
                  <div className="relative">
                    <input
                      ref={tagInputRef}
                      type="text"
                      placeholder="Add up to 5 tags..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleAddTag}
                      className="bg-gray-50 border border-gray-200 text-sm rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 placeholder-gray-500"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Add up to 5 tags to help readers discover your post
              </p>
            </div>

            {/* Split Layout for Editor and AI Assistant */}
            <div
              className="flex flex-col md:flex-row border-t border-gray-100"
              style={{ height: "calc(100vh - 220px)" }}
            >
              {/* Editor Column - Now on the left */}
              <div
                className={`${
                  isAssistantCollapsed ? "md:w-full" : "md:w-full" // Change this to "md:w-2/3" if you want the AI assistant to be visible
                } transition-all duration-300 h-full overflow-hidden`}
              >
                <AdvancedEditor
                  initialContent={editorContent}
                  onTextSelection={handleTextSelection}
                  // ref={editorRef}
                />
              </div>

              {/* AI Assistant Column - Now on the right */}
              {/* <div
                className={`${
                  isAssistantCollapsed ? "md:w-[50px]" : "md:w-1/3"
                } border-l border-gray-100 transition-all duration-300 flex flex-col h-full`}
              >
                <div className="p-2 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  {!isAssistantCollapsed && (
                    <span className="text-sm font-medium text-gray-700">
                      AI Assistant
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleAssistant}
                    className="h-8 w-8 p-0 text-gray-500"
                  >
                    {isAssistantCollapsed ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {!isAssistantCollapsed && (
                  <div className="flex-grow overflow-hidden h-[calc(100%-40px)]">
                    <AIContentAssistant
                      onInsertContent={handleInsertContent}
                      selectedText={selectedText}
                    />
                  </div>
                )}
              </div> */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
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
        </motion.div>
      </div>
    </div>
  );
}

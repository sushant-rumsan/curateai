"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  ImageIcon,
  Type,
  Quote,
  Code,
  List,
  ListOrdered,
  Plus,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getSelectionCoordinates,
  formatText,
  createHeading,
  createQuote,
  createCodeBlock,
  insertImage,
  htmlToMarkdown,
} from "@/lib/editor-utils";
import axios from "axios";

interface MediumEditorProps {
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  coverImage: string;
  setCoverImage: (url: string) => void;
}

export function MediumEditor({
  content,
  setContent,
  title,
  setTitle,
  coverImage,
  setCoverImage,
}: MediumEditorProps) {
  const [showFormatBar, setShowFormatBar] = useState(false);
  const [formatBarPosition, setFormatBarPosition] = useState({ x: 0, y: 0 });
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [plusMenuPosition, setPlusMenuPosition] = useState({ x: 0, y: 0 });
  const [isUploading, setIsUploading] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle selection change to show/hide format bar
  useEffect(() => {
    const handleSelectionChange = () => {
      const coords = getSelectionCoordinates();
      if (!coords || coords.isEmpty) {
        setShowFormatBar(false);
        return;
      }

      const windowHeight = window.innerHeight;
      const barHeight = 40;
      let yPos = coords.y;
      if (coords.y + barHeight > windowHeight + window.scrollY) {
        yPos = coords.y - barHeight - 10;
      }

      setFormatBarPosition({ x: coords.x, y: yPos });
      setShowFormatBar(true);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  // Handle key press to show plus menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && document.activeElement === editorRef.current) {
      e.preventDefault();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setPlusMenuPosition({
        x: 0,
        y: rect.bottom + window.scrollY + 10,
      });
      setShowPlusMenu(true);
    }
  };

  // Handle editor blur to update content as Markdown
  const handleEditorBlur = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const markdown = htmlToMarkdown(html);
      setContent(markdown);
    }
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setShowPlusMenu(false);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (editorRef.current) {
        insertImage(editorRef.current, response.data.url);
        const markdown = htmlToMarkdown(editorRef.current.innerHTML);
        setContent(markdown);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle cover image upload
  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCoverImage(response.data.url);
    } catch (error) {
      console.error("Error uploading cover image:", error);
      alert("Failed to upload cover image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Apply formatting with selection preservation
  const applyFormatting = (command: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const selection = window.getSelection();
    if (
      !selection ||
      selection.rangeCount === 0 ||
      selection.toString().length === 0
    ) {
      setShowFormatBar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    try {
      formatText(command);
      selection.removeAllRanges();
      selection.addRange(range); // Restore selection
    } catch (error) {
      console.error(`Error applying ${command}:`, error);
    }

    setShowFormatBar(false);
    editorRef.current?.focus();
    handleEditorBlur(); // Update Markdown content
  };

  // Insert content type
  const insertContentType = (type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    switch (type) {
      case "h1":
        createHeading(1);
        break;
      case "h2":
        createHeading(2);
        break;
      case "quote":
        createQuote();
        break;
      case "code":
        createCodeBlock();
        break;
      case "image":
        fileInputRef.current?.click();
        break;
      case "ul":
        document.execCommand("insertUnorderedList", false);
        break;
      case "ol":
        document.execCommand("insertOrderedList", false);
        break;
      default:
        break;
    }

    // Restore selection after formatting
    selection.removeAllRanges();
    selection.addRange(range);
    setShowPlusMenu(false);
    editorRef.current?.focus();
    handleEditorBlur(); // Update Markdown content
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Cover image section */}
      <div className="mb-8 relative">
        {coverImage ? (
          <div className="relative">
            <img
              src={coverImage || "/placeholder.svg"}
              alt="Cover"
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setCoverImage("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() =>
              document.getElementById("cover-image-input")?.click()
            }
          >
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-500">Add a cover image</p>
            <input
              id="cover-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageUpload}
            />
          </div>
        )}
      </div>

      {/* Title input */}
      <textarea
        ref={titleRef}
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="w-full text-4xl font-bold border-none outline-none resize-none overflow-hidden mb-4 bg-transparent"
        rows={1}
      />

      {/* Content editor */}
      <div
        ref={editorRef}
        contentEditable
        className="prose prose-lg max-w-none focus:outline-blue-500 min-h-[500px]"
        dangerouslySetInnerHTML={{ __html: content }} // Note: content is Markdown, needs conversion if displayed
        onBlur={handleEditorBlur}
        onKeyDown={handleKeyDown}
        onClick={() => setShowPlusMenu(false)}
      />

      {/* Hidden file input for image uploads */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Floating format bar (only Bold and Italic) */}
      {showFormatBar && (
        <div
          className="fixed bg-white shadow-lg rounded-md px-2 py-1 flex items-center z-50 transform -translate-x-1/2"
          style={{
            left: `${formatBarPosition.x}px`,
            top: `${formatBarPosition.y}px`,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => applyFormatting("bold", e)}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => applyFormatting("italic", e)}
          >
            <Italic className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Plus menu for adding content types */}
      {showPlusMenu && (
        <div
          className="absolute bg-white shadow-lg rounded-md p-2 flex flex-col gap-1 z-50"
          style={{
            left: `${plusMenuPosition.x}px`,
            top: `${plusMenuPosition.y}px`,
          }}
        >
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("h1", e)}
          >
            <Type className="h-4 w-4 mr-2" /> Heading 1
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("h2", e)}
          >
            <Type className="h-4 w-4 mr-2" /> Heading 2
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("quote", e)}
          >
            <Quote className="h-4 w-4 mr-2" /> Quote
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("code", e)}
          >
            <Code className="h-4 w-4 mr-2" /> Code
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("image", e)}
          >
            <ImageIcon className="h-4 w-4 mr-2" /> Image
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("ul", e)}
          >
            <List className="h-4 w-4 mr-2" /> Bullet List
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={(e) => insertContentType("ol", e)}
          >
            <ListOrdered className="h-4 w-4 mr-2" /> Numbered List
          </Button>
        </div>
      )}

      {/* Loading overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Uploading image...</span>
          </div>
        </div>
      )}
    </div>
  );
}

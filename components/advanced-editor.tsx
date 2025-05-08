"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { lowlight } from "lowlight";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  FileCode,
  Eye,
  Edit,
  Undo,
  Redo,
  Highlighter,
} from "lucide-react";

const MenuBar = ({ editor }: { editor: any }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = useCallback(() => {
    if (!linkUrl) return;

    // Update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();

    // Reset and close
    setLinkUrl("");
    setIsLinkModalOpen(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!imageUrl) return;

    editor.chain().focus().setImage({ src: imageUrl }).run();

    setImageUrl("");
    setIsImageModalOpen(false);
  }, [editor, imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server or a service like S3
      // For this example, we'll create a local object URL
      const objectUrl = URL.createObjectURL(file);
      editor.chain().focus().setImage({ src: objectUrl }).run();

      // Reset the input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex flex-wrap items-center gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("bold")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("italic")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("strike")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("highlight")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`h-8 w-8 p-0 ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`h-8 w-8 p-0 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("bulletList")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("orderedList")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("codeBlock")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Code Block"
        >
          <FileCode className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("code")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLinkModalOpen(true)}
          className={`h-8 w-8 p-0 ${
            editor.isActive("link")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsImageModalOpen(true)}
          className="h-8 w-8 p-0 text-gray-700"
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0 text-gray-700"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0 text-gray-700"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2 items-center">
            <Input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button
              onClick={setLink}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add
            </Button>
            <Button
              onClick={() => setIsLinkModalOpen(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Input
                type="url"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button
                onClick={addImage}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add
              </Button>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                Or upload from your device:
              </span>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200"
              >
                Upload Image
              </Button>
            </div>
            <Button
              onClick={() => setIsImageModalOpen(false)}
              variant="ghost"
              size="sm"
              className="self-end"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdvancedEditor = ({ initialContent = "" }) => {
  const [activeTab, setActiveTab] = useState("edit");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      //   CodeBlockLowlight.configure({
      //     lowlight,
      //   }),
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your post content here...",
      }),
    ],
    content:
      initialContent ||
      `
      <h1>Welcome to the Advanced Editor</h1>
      <p>This editor supports rich text formatting, images, code blocks, and more.</p>
      <p>Try adding some content or uploading an image!</p>
    `,
    editorProps: {
      attributes: {
        class:
          "prose prose-blue max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="edit"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <div className="text-xs text-gray-500">Markdown supported</div>
        </div>

        <TabsContent value="edit" className="mt-0 p-0">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </TabsContent>

        <TabsContent value="preview" className="mt-0 p-0">
          <div className="prose prose-blue max-w-none p-6 min-h-[300px] border-t border-gray-200">
            {editor && (
              <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center">
        <span className="mr-2">Tip:</span> You can use Markdown shortcuts like #
        for headings, * for lists, and ** for bold text.
      </div>
    </motion.div>
  );
};

export default AdvancedEditor;

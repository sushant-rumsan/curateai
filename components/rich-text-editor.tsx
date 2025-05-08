"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// Importing icons from react-icons (FontAwesome set)
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHighlighter,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaHeading,
  FaParagraph,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-100 rounded-t-lg shadow-sm">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Heading 1"
      >
        <FaHeading className="w-4 h-4" />
        <span className="sr-only">Heading 1</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Heading 2"
      >
        <FaHeading className="w-4 h-4" />
        <span className="sr-only">Heading 2</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("heading", { level: 3 })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Heading 3"
      >
        <FaHeading className="w-4 h-4" />
        <span className="sr-only">Heading 3</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("paragraph")
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Paragraph"
      >
        <FaParagraph className="w-4 h-4" />
        <span className="sr-only">Paragraph</span>
      </button>

      <div className="w-px h-8 bg-gray-200 mx-1 self-center"></div>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("bold")
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Bold"
      >
        <FaBold className="w-4 h-4" />
        <span className="sr-only">Bold</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("italic")
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Italic"
      >
        <FaItalic className="w-4 h-4" />
        <span className="sr-only">Italic</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("strike")
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Strike"
      >
        <FaStrikethrough className="w-4 h-4" />
        <span className="sr-only">Strike</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive("highlight")
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Highlight"
      >
        <FaHighlighter className="w-4 h-4" />
        <span className="sr-only">Highlight</span>
      </button>

      <div className="w-px h-8 bg-gray-200 mx-1 self-center"></div>

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive({ textAlign: "left" })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Align Left"
      >
        <FaAlignLeft className="w-4 h-4" />
        <span className="sr-only">Align Left</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive({ textAlign: "center" })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Align Center"
      >
        <FaAlignCenter className="w-4 h-4" />
        <span className="sr-only">Align Center</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive({ textAlign: "right" })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Align Right"
      >
        <FaAlignRight className="w-4 h-4" />
        <span className="sr-only">Align Right</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded-md transition-colors ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        title="Align Justify"
      >
        <FaAlignJustify className="w-4 h-4" />
        <span className="sr-only">Align Justify</span>
      </button>
    </div>
  );
};

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: `
      <h3 class="text-center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p class="text-center">
        I come home in the morning light<br>
        My mother says, <mark>"When you gonna live your life right?"</mark><br>
        Oh mother dear we're not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p class="text-center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you're still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p class="text-center">
        That's all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 overflow-hidden"
    >
      <MenuBar editor={editor} />
      <div className="p-5 prose max-w-none">
        <EditorContent
          editor={editor}
          className="min-h-[300px] focus:outline-none"
        />
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
        Tip: Use the toolbar above to format your text. You can also use
        keyboard shortcuts like Ctrl+B for bold.
      </div>
    </motion.div>
  );
};

export default RichTextEditor;

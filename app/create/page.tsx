"use client";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
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

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
        }`}
        title="Heading 1"
      >
        <FaHeading className="w-5 h-5" />
        <span className="sr-only">Heading 1</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
        }`}
        title="Heading 2"
      >
        <FaHeading className="w-5 h-5" />
        <span className="sr-only">Heading 2</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
        }`}
        title="Heading 3"
      >
        <FaHeading className="w-5 h-5" />
        <span className="sr-only">Heading 3</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("paragraph") ? "bg-gray-300" : ""
        }`}
        title="Paragraph"
      >
        <FaParagraph className="w-5 h-5" />
        <span className="sr-only">Paragraph</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
        title="Bold"
      >
        <FaBold className="w-5 h-5" />
        <span className="sr-only">Bold</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
        title="Italic"
      >
        <FaItalic className="w-5 h-5" />
        <span className="sr-only">Italic</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("strike") ? "bg-gray-300" : ""
        }`}
        title="Strike"
      >
        <FaStrikethrough className="w-5 h-5" />
        <span className="sr-only">Strike</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("highlight") ? "bg-gray-300" : ""
        }`}
        title="Highlight"
      >
        <FaHighlighter className="w-5 h-5" />
        <span className="sr-only">Highlight</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
        }`}
        title="Align Left"
      >
        <FaAlignLeft className="w-5 h-5" />
        <span className="sr-only">Align Left</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
        }`}
        title="Align Center"
      >
        <FaAlignCenter className="w-5 h-5" />
        <span className="sr-only">Align Center</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
        }`}
        title="Align Right"
      >
        <FaAlignRight className="w-5 h-5" />
        <span className="sr-only">Align Right</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
        }`}
        title="Align Justify"
      >
        <FaAlignJustify className="w-5 h-5" />
        <span className="sr-only">Align Justify</span>
      </button>
    </div>
  );
};

export default () => {
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
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p class="text-center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p class="text-center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

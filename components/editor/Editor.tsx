import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // Upload the image to your server or IPFS here and get the URL
        const url = URL.createObjectURL(file); // Replace with actual upload logic
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  }, [editor]);

  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${
          editor.isActive("bold") ? "bg-gray-300" : "bg-gray-100"
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded ${
          editor.isActive("italic") ? "bg-gray-300" : "bg-gray-100"
        }`}
      >
        Italic
      </button>
      <button onClick={addImage} className="px-3 py-1 rounded bg-gray-100">
        Add Image
      </button>
    </div>
  );
};

const MediumEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
      }),
    ],
    content: "<p>Start writing your blog post...</p>",
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <MenuBar editor={editor} />
      <div className="border p-4 min-h-[400px] rounded">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default MediumEditor;

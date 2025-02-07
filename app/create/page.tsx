"use client"

import { useIPFSUpload } from "@/hooks/ipfs/uploadToIpfs";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {mutate} = useIPFSUpload();

  const handleUpload = async (e: any) => {
    e.preventDefault();
    mutate({title, description})
  }

  return (
    <div>
      <h1>Create</h1>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          name="title"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="des"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Submit your post</button>
      </form>
    </div>
  );
}

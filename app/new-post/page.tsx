"use client";
import { BlogEditor } from "@/components/BlogEditor";
import { useEffect, useState } from "react";
import { useIPFSUpload } from "@/hooks/ipfs/uploadToIpfs";
import { useRouter } from "next/navigation";
import { useWriteCuratePostsCreatePost } from "@/hooks/wagmi/contracts";
import { CONTRACT } from "../../constants/contract";
import { ROUTES } from "@/constants/routes";
import { useCreatePost } from "@/hooks/api-hooks";
import axios from "axios";
import { useAccount } from "wagmi";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("# Hello, world!");
  const { mutateAsync, isPending, data } = useIPFSUpload();
  const router = useRouter();
  const { address } = useAccount();
  const [tags, setTags] = useState<string[]>([]);

  const { writeContractAsync, isPending: contractPending, error } =
    useWriteCuratePostsCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({
      title,
      content,
      userWalletAddress: address,
      tags,
    });
  };

  const handleContractWrite = async () => {
    await writeContractAsync({
      address: CONTRACT.POST as `0x${string}`,
      args: [data.IpfsHash, tags],
    });
    // router.push("/");
  };

  useEffect(() => {
    data && handleContractWrite();
  }, [data]);

  console.log(error, "is the error");

  console.log(data, "is the data");
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-6 py-8'>
        <BlogEditor
          handleSubmit={handleSubmit}
          content={content}
          setContent={setContent}
          title={title}
          setTitle={setTitle}
          isPending={isPending}
          contractPending={contractPending}
          tags={tags}
          setTags={setTags}
        />
      </main>
    </div>
  );
}

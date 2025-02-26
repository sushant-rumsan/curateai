"use client";
import { BlogEditor } from "@/components/BlogEditor";
import { useEffect, useState } from "react";
import { useIPFSUpload } from "@/hooks/ipfs/uploadToIpfs";
import { useRouter } from "next/navigation";
import {
  useReadCurateAiPostsPostCounter,
  useWriteCurateAiPostsCreatePost,
} from "@/hooks/wagmi/contracts";
import { contract } from "../../constants/contract";
import { useAccount } from "wagmi";
import { ConfirmActionModal } from "@/components/modal/confirmActionModal";
import { useCreatePost } from "@/hooks/api-hooks";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("# Hello, world!");
  const {
    mutateAsync,
    isPending,
    data,
    isSuccess: isIPFSUploadSucees,
  } = useIPFSUpload();
  const router = useRouter();
  const { address } = useAccount();
  const [tags, setTags] = useState<string[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutateAsync: apiMutatePost } = useCreatePost();

  const account = useAccount();

  const {
    writeContractAsync,
    isPending: contractPending,
    error,
  } = useWriteCurateAiPostsCreatePost();

  const { data: postCount } = useReadCurateAiPostsPostCounter({
    address: contract.post as `0x${string}`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmOpen(true); // Open confirmation modal
  };

  const handleContractWrite = async () => {
    const ipfsHash = data.IpfsHash;
    try {
      await writeContractAsync({
        address: contract.post as `0x${string}`,
        args: [ipfsHash, "tag1"],
      });

      await apiMutatePost({
        title,
        content,
        ipfsHash,
        userWalletAddress: account.address,
        internal_id: Number(postCount) + 1,
      });
      setIsConfirmOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Contract write failed:", err);
    }
  };

  const confirmAction = async () => {
    await mutateAsync({
      title,
      content,
      userWalletAddress: address,
      tags,
    });
  };

  useEffect(() => {
    if (isIPFSUploadSucees) {
      handleContractWrite();
    }
  }, [isIPFSUploadSucees]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
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
        <ConfirmActionModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmAction}
          actionText="Create Post"
        />
      </main>
    </div>
  );
}

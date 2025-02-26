"use client";

import BlogList from "@/components/BlogList";
import Login from "@/components/magic/Login";
import MagicDashboardRedirect from "@/components/ui/MagicDashboardRedirect";
import { getRecentPosts } from "@/constants/queries";
import { PostHash, useIPFSMultipleFetch } from "@/hooks/ipfs/fetchFromIpfs";
import { fetchFromSubgraph } from "@/utils/subgraph";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useMagicState } from "./context/magic.provider";

export default function Home() {
  const [hashes, setHashes] = useState<PostHash[]>([]);

  const { data, isFetching, isSuccess } = useIPFSMultipleFetch(hashes);

  // const { data: posts } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: async () => {
  //     const p = await axios.get("/api/posts");
  //     return p.data;
  //   },
  // });

  // console.log("posts", posts);

  const getPosts = async () => {
    const { postCreateds } = await fetchFromSubgraph(getRecentPosts);
    Promise.all(
      postCreateds.map(async (post: PostHash) => {
        return { ...post, contentHash: post.contentHash };
      })
    )
      .then((hashes) => setHashes(hashes))
      .catch((error) => console.error("Error fetching hashes:", error));
  };

  // const pData = data?.map((d) => {
  //   const p = posts.find((p) => p.ipfsHash === d.contentHash);
  //   return {
  //     ...d,
  //     ...p,
  //     content: d.content.toString(),
  //   };
  // });
  // console.log("pData", pData);

  const { token, setToken } = useMagicState();

  console.log(token, "is token");

  useEffect(() => {
    setToken(localStorage.getItem("token") ?? "");
  }, [setToken]);

  useEffect(() => {
    getPosts();
  }, []);

  if (isFetching) return <h1>Fetching posts...</h1>;
  if (!isSuccess) return <h1>Couldn't fetch</h1>;

  return (
    <>
      <ToastContainer />
      {process.env.NEXT_PUBLIC_MAGIC_API_KEY ? (
        token.length > 0 ? (
          <BlogList blogPosts={data} />
        ) : (
          <Login token={token} setToken={setToken} />
        )
      ) : (
        <MagicDashboardRedirect />
      )}
    </>
  );
}

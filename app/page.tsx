"use client"

import BlogList from "@/components/BlogList";
import { getRecentPosts } from "@/constants/queries";
import { PostHash, useIPFSMultipleFetch } from "@/hooks/ipfs/fetchFromIpfs";
import { fetchFromSubgraph } from "@/utils/subgraph";
import { useEffect, useState } from "react";

export default function Home() {

  const [hashes, setHashes] = useState<PostHash[]>([])

  const {data, isFetching, isSuccess} = useIPFSMultipleFetch(hashes)
  
  const getPosts = async () => {
    const {postCreateds} = await fetchFromSubgraph(getRecentPosts);
    Promise.all(postCreateds.map(async (post: PostHash) => {
      return {...post, contentHash: post.contentHash}
    }))
    .then((hashes) => setHashes(hashes))
    .catch((error) => console.error("Error fetching hashes:", error));
  }

  useEffect(() => {
    getPosts();
  }, [])


  if(isFetching) return <h1>Fetching posts...</h1>
  if(!isSuccess) return <h1>Couldn't fetch</h1>

  return (
    <div>
      {data && <BlogList blogPosts={data}/>}
    </div>
  );
}

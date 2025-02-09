import { ROUTES } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type PostHash = {
  contentHash: string;
  internal_id: string
}

const fetchFromIpfs = async (hash: string) => {
  const data = await axios.get(ROUTES.IPFS_FETCH(hash));
  return data.data
}

export const useIPFSFetch = (id: string) => {
  return useQuery({
    queryKey: [`fetch-from-ipfs-${id}`] ,
    queryFn: () => fetchFromIpfs(id)
  });
};

export const useIPFSMultipleFetch = (ids: PostHash[]) => {
  return useQuery({
    queryKey: [`fetch-multiple-from-ipfs-${ids.join(",")}`],
    queryFn: async () => {
      const results = await Promise.all(
        ids.map(async (post) => {
          try {
            const data = await fetchFromIpfs(post.contentHash);
            return {...data, ...post};
          } catch (error) {
            return null;
          }
        })
      );
      return results;
    }
  });
};



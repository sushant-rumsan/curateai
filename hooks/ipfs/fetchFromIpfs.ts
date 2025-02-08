import { ROUTES } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFromIpfs = async (hash: string) => {
  return axios.get(ROUTES.IPFS_FETCH(hash));
}

export const useIPFSFetch = (id: string) => {
  return useQuery({
    queryKey: [`fetch-from-ipfs-${id}`] ,
    queryFn: () => fetchFromIpfs(id)
  });
};

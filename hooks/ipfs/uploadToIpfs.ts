import { PINATA } from "@/constants/pinata";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCreatePost } from "../api-hooks";

type Content = {
  title: string;
  content: string;
  date?: string;
  userWalletAddress?: string;
  tags: string[];
  coverImage?: string;
};

export const uploadToIpfs = async (data: Content) => {
  console.log(data, "is the data");
  data.date = new Date().toISOString();
  const res = await axios.post(PINATA.PINANATE_URL, data, {
    headers: {
      pinata_api_key: PINATA.PINATA_API_KEY,
      pinata_secret_api_key: PINATA.PINATA_SECRET_KEY,
    },
  });

  return res.data;
};

export const useIPFSUpload = () => {
  // const { mutate } = useCreatePost();

  return useMutation({
    mutationFn: uploadToIpfs,
    // onSuccess(data, variables, context) {
    //   mutate({
    //     title: variables.title,
    //     content: variables.content,
    //     ipfsHash: data.IpfsHash,
    //     userWalletAddress: variables.userWalletAddress,
    //     published: false,
    //   });
    // },
  });
};

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const createPost = async (data: Omit<any, "id" | "authorId">) => {
  const res = await axios.post("/api/posts", data);
  return res.data;
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
  });
};

export const createUser = async (data: any) => {
  const { token, email, walletAddress } = data;
  const res = await axios.post("/api/auth", {
    token,
    email,
    walletAddress,
  });

  return res.data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

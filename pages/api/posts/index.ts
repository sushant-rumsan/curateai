import { prisma } from "@/prisma/prisma.client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany({
        include: {
          aiRating: true,
          author: {
            select: {
              walletAddress: true,
            },
          },
        },
      });

      res.status(200).json(posts);
    } catch (error) {
      console.error(
        "Error fetching post entries:",
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content, ipfsHash, userWalletAddress, internal_id } =
        req.body;

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published: true,
          ipfsHash,
          internal_id,
          author: {
            connect: {
              walletAddress: userWalletAddress,
            },
          },
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error(
        "Error creating post entry:",
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

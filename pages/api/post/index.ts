import { prisma } from "@/prisma/prisma.client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany({});

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching post entries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content } = req.body;

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published: true,
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post entry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;

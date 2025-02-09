import { prisma } from "@/prisma/prisma.client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const ratings = await prisma.aIPostRating.findMany({});
      console.log("ratings", ratings);
      res.status(200).json(ratings);
    } catch (error) {
      console.error(
        "Error fetching AI post ratings:",
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        postId,
        sentimentAnalysisLabel,
        sentimentAnalysisScore,
        biasDetectionScore,
        biasDetectionDirection,
        originalityScore,
        similarityScore,
        readabilityFleschKincaid,
        readabilityGunningFog,
        mainTopic,
        secondaryTopics,
        rating, // make sure this is provided in the request body
      } = req.body;

      if (rating === undefined) {
        throw new Error("Missing required field: rating");
      }

      const newAIPostRating = await prisma.aIPostRating.create({
        data: {
          postId,
          sentimentAnalysisLabel,
          sentimentAnalysisScore,
          biasDetectionScore,
          biasDetectionDirection,
          originalityScore,
          similarityScore,
          readabilityFleschKincaid,
          readabilityGunningFog,
          mainTopic,
          secondaryTopics,
          rating, // now included
        },
      });

      res.status(201).json(newAIPostRating);
    } catch (error) {
      console.error(
        "Error creating AI post rating:",
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

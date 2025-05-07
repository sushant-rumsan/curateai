import { prisma } from "@/prisma/prisma.client";
import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import { transfer_cat, transfer_sonic } from "@/utils/contract/transfer";
import { assign_curator } from "@/utils/contract/assign_curator";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { token, email, walletAddress } = req.body;

      console.log(walletAddress);

      // Throws error if token is invalid
      magic.token.validate(token);

      if (true) {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email,
              walletAddress,
            },
          });

          // Give role of curator to new account
          await assign_curator(walletAddress);
          // Transfer sonic to the new account
          await transfer_sonic(walletAddress, 0.01);
          // Transfer CAT token to new account
          await transfer_cat(walletAddress);
          res.status(201).json(newUser);
        }

        return res.status(200).json({ message: "User already created" });
      }
    } catch (error) {
      console.error(
        "Error creating user: ",
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ message: "Invalid did token" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

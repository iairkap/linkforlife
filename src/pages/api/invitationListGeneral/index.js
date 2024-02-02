import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken";
import verifyToken from "../verifyToken";
// Add this line
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = verifyToken(req);

  if (!userId) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "GET") {
    try {
      const weddingInvitationList = await prisma.weddingInvitationList.findMany(
        {
          where: {
            userId: Number(userId),
          },
          include: {
            groups: {
              include: {
                weddingInvitationList: true,
              },
            },
          },
        }
      );

      res.status(200).json(weddingInvitationList);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch data" });
    }
  } else if (req.method === "POST") {
    const invitations = req.body;

    try {
      const createInvitations = invitations.map((invitation) => {
        return prisma.weddingInvitationList.create({
          data: {
            ...invitation,
            user: {
              connect: {
                id: Number(userId),
              },
            },
          },
        });
      });

      const newInvitations = await prisma.$transaction(createInvitations);

      res.status(201).json(newInvitations);
    } catch (error) {
      console.log("Failed to create invitations:", error);
      res.status(500).json({ error: "Unable to create invitations" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

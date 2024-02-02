import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken"; // Add this line
import verifyToken from "../verifyToken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = verifyToken(req);

  if (!userId) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "GET") {
    try {
      const groupsList = await prisma.group.findMany({
        where: {
          userId: Number(userId),
        },
      });

      res.status(200).json(groupsList);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch data" });
    }
  } else if (req.method === "POST") {
    const groups = req.body;

    try {
      const createGroups = groups.map((group) => {
        return prisma.group.create({
          data: {
            ...group,
            user: {
              connect: {
                id: Number(userId),
              },
            },
          },
        });
      });

      const newGroups = await prisma.$transaction(createGroups);

      res.status(201).json(newGroups);
    } catch (error) {
      console.log("Failed to create groups:", error);
      res.status(500).json({ error: "Unable to create groups" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

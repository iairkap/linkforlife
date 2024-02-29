import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import JWT from "jsonwebtoken"; // Add this line
import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });

  const userEmail = token.email;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const userId = user.id;

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

    // Check if groups is an array
    if (!Array.isArray(groups)) {
      res.status(400).json({ error: "Expected an array of groups" });
      return;
    }

    try {
      // Use Promise.all to create all groups concurrently
      const newGroups = await Promise.all(
        groups.map(async (group) => {
          const newGroup = await prisma.group.create({
            data: {
              name: group.name,
              user: {
                connect: {
                  id: Number(userId),
                },
              },
              wedding: {
                connect: {
                  id: group.weddingId,
                },
              },
            },
          });

          return newGroup;
        })
      );

      res.status(201).json(newGroups);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

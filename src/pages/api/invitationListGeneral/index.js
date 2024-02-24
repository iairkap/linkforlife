import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import prisma from "../../../utils/prismaClient";
import JWT from "jsonwebtoken";
import { decode } from "next-auth/jwt";
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
      const weddingInvitationList = await prisma.weddingInvitationList.findMany(
        {
          where: {
            userId: userId, // Use userId instead of email
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
      console.error("Error fetching data:", error); // Log any errors
      res.status(500).json({ error: "Unable to fetch data" });
    }
  } else if (req.method === "POST") {
    const invitations = req.body;

    try {
      let invitationsArray;

      if (Array.isArray(invitations)) {
        invitationsArray = invitations;
      } else {
        invitationsArray = [invitations];
      }
      let createInvitations = invitationsArray.map((invitation) => {
        const { weddingId, groups, ...invitationWithoutGroups } = invitation;
        return prisma.weddingInvitationList.create({
          data: {
            ...invitationWithoutGroups,
            user: {
              connect: {
                id: Number(userId),
              },
            },

            wedding: {
              connect: {
                id: weddingId,
              },
            },
          },
        });
      });
      const newInvitations = await prisma.$transaction(createInvitations);

      res.status(201).json(newInvitations);
    } catch (error) {
      console.error("Failed to create invitations:", error);
      res.status(500).json({ error: "Unable to create invitations" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

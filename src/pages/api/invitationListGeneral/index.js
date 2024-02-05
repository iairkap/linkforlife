import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken";
import { decode } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = req.cookies["next-auth.session-token"];

  const nextSecret = process.env.NEXTAUTH_SECRET;
  const jwtSecret = process.env.JWT_SECRET;

  const decoded = await decode({ token, secret: nextSecret });
  const userEmail = decoded.token.email;

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
    console.log("GET request"); // Log when a GET request is made
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
    console.log("POST request"); // Log when a POST request is made

    const invitations = req.body;
    console.log("Invitations:", invitations); // Log the invitations

    console.log(userId);
    try {
      let invitationsArray;

      if (Array.isArray(invitations)) {
        invitationsArray = invitations;
      } else {
        invitationsArray = [invitations];
      }

      let createInvitations = invitationsArray.map((invitation) => {
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
      console.error("Failed to create invitations:", error);
      res.status(500).json({ error: "Unable to create invitations" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

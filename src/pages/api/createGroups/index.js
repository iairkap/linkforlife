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
  if (req.method === "POST") {
    const { groups, weddingId, invitationId } = req.body;
    console.log("Invitation ID in createGroups:", invitationId);

    try {
      let createGroupsPromises = groups.map((group) => {
        if (typeof group === "string") {
          return prisma.group.create({
            data: {
              name: group,
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
              weddingInvitationList: {
                connect: {
                  id: invitationId,
                },
              },
            },
          });
        }
      });

      const newGroups = await prisma.$transaction(createGroupsPromises);
      res.status(201).json(newGroups);
    } catch (error) {
      console.error("Failed to create groups:", error);
      res.status(500).json({ error: "Unable to create groups" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

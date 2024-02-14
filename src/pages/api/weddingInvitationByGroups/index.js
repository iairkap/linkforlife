import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";
import verifyToken from "../verifyToken";

export default async function handler(req, res) {
  const userId = verifyToken(req);

  if (!userId) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  if (req.method === "POST") {
    const updates = req.body; // This should be an array of updates

    try {
      const updatePromises = updates.map(
        ({ weddingInvitationListId, groupId }) =>
          prisma.weddingInvitationList.update({
            where: { id: Number(weddingInvitationListId) },
            data: {
              groups: {
                connect: { id: Number(groupId) },
              },
            },
          })
      );

      const updatedWeddingInvitationLists = await Promise.all(updatePromises);

      res.status(200).json(updatedWeddingInvitationLists);
    } catch (error) {}
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

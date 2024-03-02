import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  try {
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
      include: {
        weddings: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const userId = user.id;
    if (req.method === "PATCH") {
      const { tableId, weddingInvitationID } = req.body;
      const wedding = user.weddings[0];

      // Check if the table exists
      const table = await prisma.table.findUnique({
        where: {
          id: Number(tableId),
        },
      });

      if (!table) {
        res.status(404).json({ error: "Table not found" });
        return;
      }

      try {
        const changeTable = await prisma.table.update({
          where: {
            id: Number(tableId),
          },
          data: {
            weddingInvitationLists: {
              connect: {
                id: Number(weddingInvitationID),
              },
            },
          },
        });
      } catch (error) {
        res.status(400).json({ error: "An error occurred" });
        console.log(error);
      }
    } else if (req.method === "DELETE") {
      const { tableId, weddingInvitationID } = req.body;
      const wedding = user.weddings[0];

      // Check if the table exists
      const table = await prisma.table.findUnique({
        where: {
          id: Number(tableId),
        },
      });

      if (!table) {
        res.status(404).json({ error: "Table not found" });
        return;
      }

      try {
        const changeTable = await prisma.table.update({
          where: {
            id: Number(tableId),
          },
          data: {
            weddingInvitationLists: {
              disconnect: {
                id: Number(weddingInvitationID),
              },
            },
          },
        });
      } catch (error) {
        res.status(400).json({ error: "An error occurred" });
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
    console.log(error);
  }
}

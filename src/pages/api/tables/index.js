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
        weddings: true, // Add this line
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const userId = user.id;

    if (req.method === "GET") {
      const tables = await prisma.table.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          weddingInvitationLists: true,
        },
      });
      res.status(200).json(tables);
    } else if (req.method === "POST") {
      const { numberTable, numberChairs } = req.body;

      const wedding = user.weddings[0];
      if (!wedding) {
        res.status(400).json({ message: "User doesn't have any weddings" });
        return;
      }

      const tables = [];
      for (let i = 0; i < numberTable; i++) {
        try {
          const newTable = await prisma.table.create({
            data: {
              numberOfChairs: numberChairs,
              user: {
                connect: {
                  id: userId,
                },
              },
              wedding: {
                connect: {
                  id: wedding.id,
                },
              },
            },
          });
          tables.push(newTable);
        } catch (error) {
          console.error(`Failed to create table: ${error}`);
        }
      }
      res.json(tables);
    } else if (req.method === "PATCH") {
      const tables = req.body;
      if (!Array.isArray(tables)) {
        res.status(400).json({ error: "Expected an array of tables" });
        return;
      }
      const newTables = await Promise.all(
        tables.map(async (table) => {
          const newTable = await prisma.table.create({
            data: {
              name: table.name,
              user: {
                connect: {
                  id: Number(userId),
                },
              },
              wedding: {
                connect: {
                  id: Number(table.weddingId),
                },
              },
            },
          });
          return newTable;
        })
      );
      res.status(201).json(newTables);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

import prisma from "../../../../utils/prismaClient";
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

    if (req.method === "PATCH") {
      const { id } = req.query;
      const { tableName, numberChairs } = req.body;
      const updatedTable = await prisma.table.update({
        where: { id: Number(id) },
        data: {
          name: tableName,
          numberOfChairs: numberChairs,
        },
      });

      res.status(200).json(updatedTable);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

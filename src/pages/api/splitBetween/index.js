import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "PATCH") {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        weddings: true,
      },
    });
    if (!user || user.weddings.length === 0) {
      res.status(404).json({ message: "No wedding found for this user" });
      return;
    }
    try {
      const weddingId = user.weddings[0].id;
      const newSplitBetween = await prisma.wedding.update({
        where: {
          id: weddingId, // specify which Wedding record to update
        },
        data: {
          splitBetween: req.body.splitBetween,
        },
      });

      res.status(200).json({ message: "Wedding updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}

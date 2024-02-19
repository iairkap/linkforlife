import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "POST") {
    const { budget } = req.body;
    const budgetToFloat = parseFloat(budget);

    if (!budget) {
      res.status(400).json({ message: "Budget is required" });
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

    const updatedWedding = await prisma.wedding.updateMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
      data: {
        budget: budgetToFloat,
      },
    });

    res.status(200).json(updatedWedding);
  } else {
    res.status(404).json({ message: "Method not allowed" });
    return;
  }
}

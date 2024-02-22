import { getToken } from "next-auth/jwt";
import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        weddings: {
          select: {
            weddingExpenses: {
              where: {
                paymentDate: {
                  gt: new Date(),
                },
              },
              orderBy: {
                paymentDate: "asc",
              },
              take: 4,
            },
          },
        },
      },
    });

    const upcomingExpenses = user.weddings.flatMap(
      (wedding) => wedding.weddingExpenses
    );

    res.json(upcomingExpenses);
  }
}

import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";
import { expenseDataTemplate } from "../utils/expenseDataTemplate";
export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;
  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "POST") {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newWedding = await prisma.wedding.create({
      data: {
        ...req.body,
        weddingDate: `${req.body.weddingDate}T00:00:00Z`,
        users: {
          connect: {
            id: user.id,
          },
        },
        admin: {
          connect: {
            id: user.id,
          },
        },
        weddingExpenses: {
          create: expenseDataTemplate.map((expense) => ({
            name: expense.name,
            description: expense.description,
            amount: expense.amount,
            categories: expense.category,
          })),
        },
      },
    });

    res.status(201).json(newWedding);
  } else if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        weddings: {
          include: {
            weddingInvitationList: {
              include: {
                groups: true,
              },
            },
            groups: true,
            users: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.weddings || user.weddings.length === 0) {
      res.status(404).json({ message: "Wedding not found" });
      return;
    }

    res.status(200).json(user.weddings);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

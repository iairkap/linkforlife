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
    try {
      const generateExpenses = await prisma.expenses.create({
        data: {
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
            })),
          },
        },
      });
      res.status(201).json(generateExpenses);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating wedding expenses", message: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

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
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    try {
      const createInstallment = await prisma.installment.create({
        data: {
          ...req.body,
          expenseId: req.body.expenseId,
        },
      });
      res.status(201).json(createInstallment);
    } catch (error) {
      res.status(404).json(error);

      return;
    }
  }
  res.status(502).json({ message: "No expenses found" });
}

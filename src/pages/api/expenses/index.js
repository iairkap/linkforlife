import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      where: {
        email: userEmail,
      },
      include: {
        weddings: {
          include: {
            weddingExpenses: {
              include: {
                installments: true, // Include installments here
              },
            },
          },
        },
      },
    });

    if (!users || users.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = users[0]; // Assuming you want the first user

    let allExpenses = [];
    user.weddings.forEach((wedding) => {
      allExpenses = [...allExpenses, ...wedding.weddingExpenses];
    });

    if (allExpenses.length === 0) {
      res.status(200).json({ message: "No expenses found" });
      return;
    }

    res.status(200).json(allExpenses);
  } else if (req.method === "POST") {
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
      const newExpense = await prisma.expenses.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          amount: req.body.amount,
          splitBetween: req.body.splitBetween,
          alreadyPay: req.body.alreadyPay,
          paymentDate: new Date(req.body.paymentDate),
          status: req.body.status,
          weddingId: weddingId,
        },
      });

      if (req.body.installments) {
        const newInstallment = await prisma.installment.create({
          data: {
            amount: parseFloat(req.body.installmentAmout),
            dueDate: new Date(req.body.installmentDueDate),
            paid: req.body.installmentPaid,
            expenseId: newExpense.id,
          },
        });
      }

      res.status(201).json(newExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  } else if (req.method === "PATCH") {
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
      const updatedExpense = await prisma.expenses.update({
        where: {
          id: req.body.expenseId,
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          amount: req.body.amount,
          splitBetween: req.body.splitBetween,
          alreadyPay: req.body.alreadyPay,
          paymentDate: new Date(req.body.paymentDate),
          status: req.body.status,
          weddingId: weddingId,
        },
      });

      res.status(200).json(updatedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      // First, delete all related installments
      await prisma.installment.deleteMany({});

      // Then, delete all expenses
      const deleteExpenses = await prisma.expenses.deleteMany({});

      res.status(200).json({
        message: "All expenses and related installments deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(404).json({ message: "Method not allowed" });
  }
}

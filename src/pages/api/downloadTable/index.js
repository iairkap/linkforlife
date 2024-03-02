import { PrismaClient } from "@prisma/client";
import { Parser } from "json2csv";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (req.method === "GET") {
    try {
      const tables = await prisma.table.findMany({
        where: {
          userId: user.id,
        },
        include: {
          weddingInvitationLists: true, // Include WeddingInvitationList data
        },
      });

      const data = tables.map((table) => {
        const guests = table.weddingInvitationLists.map(
          (guest) => `${guest.name} ${guest.lastName}`
        );

        const guestColumns = guests.reduce((columns, guest, index) => {
          columns[`Guest ${index + 1}`] = guest;
          return columns;
        }, {});

        return {
          tableName: table.name,
          numberOfChairs: table.numberOfChairs,
          ...guestColumns,
        };
      });
      const parser = new Parser();
      const csv = parser.parse(data);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=table.csv");

      // Send the CSV data
      res.status(200).end(csv);
    } catch (error) {
      res.status(500).json({ error: "Error generating CSV file" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "DELETE") {
    try {
      await prisma.inviteToken.deleteMany();
      await prisma.weddingInvitationList.deleteMany();
      const deleteWeddings = await prisma.wedding.deleteMany();

      res.json(deleteWeddings);
    } catch (error) {
      res.status(500).json({ error: "Error deleting weddings" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

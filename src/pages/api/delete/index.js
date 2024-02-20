import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handle(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user || !user.superAdmin) {
    res
      .status(403)
      .json({ error: "Access denied. Only super admins can delete." });
    return;
  }

  if (req.method === "DELETE") {
    try {
      await prisma.inviteToken.deleteMany();
      await prisma.installment.deleteMany();
      await prisma.expenses.deleteMany();
      await prisma.group.deleteMany();
      await prisma.weddingInvitationList.deleteMany();
      await prisma.wedding.deleteMany();
      await prisma.user.deleteMany();

      res.status(200).json({
        message: "All users and associated data deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deleting users and associated data",
        message: error,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

import prisma from "../../../utils/prismaClient";

export default async function handle(req, res) {
  if (req.method === "DELETE") {
    try {
      await prisma.inviteToken.deleteMany();
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

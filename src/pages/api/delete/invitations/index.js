import prisma from "../../../utils/prismaClient";

export default async function handle(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const deletedInvitation = await prisma.weddingInvitationList.delete({
        where: {
          id: id,
        },
      });

      res.json(deletedInvitation);
    } catch (error) {
      res.status(500).json({ error: "Error deleting wedding invitation" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

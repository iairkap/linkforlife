import prisma from "../../../../utils/prismaClient";

export default async function handle(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const invitationCard = await prisma.weddingInvitationCard.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!invitationCard) {
        return res.status(404).json({ error: "Invitation card not found" });
      }

      return res.status(200).json(invitationCard);
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

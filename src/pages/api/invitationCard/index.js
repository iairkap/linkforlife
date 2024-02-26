import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const invitationCards = await prisma.weddingInvitationCard.findMany();
    res.status(200).json(invitationCards);
  } else {
    res.status(405).json({ message: error.message });
  }
}

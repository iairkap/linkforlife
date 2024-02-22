import { getToken } from "next-auth/jwt";
import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;
  const { searchTerm } = req.query;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    // Get the user first to obtain the userId
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        weddings: true, // Include the weddings associated with the user
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the weddingId of the weddings associated with the user
    const weddingIds = user.weddings.map((wedding) => wedding.id);

    const expenses = await prisma.expenses.findMany({
      where: {
        weddingId: {
          in: weddingIds, // Search for expenses associated with the weddingIds
        },
        OR: [
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });

    const invitations = await prisma.weddingInvitationList.findMany({
      where: {
        userId: user.id,
        OR: [
          { name: { contains: searchTerm } },
          { lastName: { contains: searchTerm } },
          { emailInvitation: { contains: searchTerm } },
        ],
      },
    });

    return res.status(200).json({ expenses, invitations });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

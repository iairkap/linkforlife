import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const userId = user.id;
  if (req.method === "POST") {
    const { token, weddingId } = req.body;

    const weddingIdnumb = parseInt(req.body.weddingId);

    try {
      const wedding = await prisma.wedding.update({
        where: { id: weddingIdnumb },
        data: { tokenForInvitation: token },
      });

      res.status(200).json(wedding);
    } catch (error) {
      res.status(500).json({ error: error.message });
      error;
    }
  }
}

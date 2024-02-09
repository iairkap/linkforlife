import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const token = await getToken({ req });

  const email = token.email;
  const accesToken = req.body.accesToken;
  const accesTokenToNumber = parseInt(accesToken);

  const inviteToken = await prisma.inviteToken.findUnique({
    where: {
      token: accesTokenToNumber,
    },
  });

  if (!inviteToken || inviteToken.email !== email) {
    res.status(400).json({ error: "Invalid access token or email" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({ error: "User not found" });
    return;
  }

  const updatedWedding = await prisma.wedding.update({
    where: {
      id: inviteToken.weddingId,
    },
    data: {
      users: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  res.status(200).json({ message: "User added to wedding" });
}

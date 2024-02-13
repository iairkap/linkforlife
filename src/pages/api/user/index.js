import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  console.log("userEmail", userEmail);

  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        weddings: {
          include: {
            weddingInvitationList: true,
            groups: true,
            users: {
              select: {
                name: true,
                profilePicture: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(user);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import nextCookies from "next-cookies";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { token } = nextCookies(req);

  if (!token) {
    res.status(400).json({ message: "No token provided" });
    return;
  }

  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    const weddingInvitationList = await prisma.weddingInvitationList.findMany({
      where: {
        userId: Number(userId),
      },
    });

    res.status(200).json(weddingInvitationList);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch data" });
  }
}

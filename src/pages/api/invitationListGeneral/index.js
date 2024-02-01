import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken"; // Add this line
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { token } = parse(req.headers.cookie || "");

  if (!token) {
    console.log("No token provided in the request");
    res.status(400).json({ message: "No token provided" });
    return;
  }

  console.log("Received token:", token);

  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
    console.log("Decoded token:", decoded);
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  try {
    const weddingInvitationList = await prisma.weddingInvitationList.findMany({
      where: {
        userId: Number(userId),
      },
    });

    console.log("Fetched wedding invitation list:", weddingInvitationList);
    res.status(200).json(weddingInvitationList);
  } catch (error) {
    console.log("Failed to fetch data:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
}

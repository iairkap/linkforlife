import { error } from "console";
import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  const { token, weddingId } = req.body;
  const weddingIdToNumber = Number(weddingId);

  if (req.method === "POST") {
    try {
      const wedding = await prisma.wedding.findUnique({
        where: {
          id: weddingIdToNumber,
        },
      });

      if (!wedding) {
        res.status(404).json({ message: "Wedding not found" });
        return;
      }

      if (wedding.tokenForInvitation === token) {
        res.status(200).json({ message: "Token matches" });
      } else {
        res.status(400).json({ message: "Token does not match" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }
  }
}

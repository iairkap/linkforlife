// pages/api/mapAndSave.js
import { extractImageNameFromURL, directoryRef } from "../../../firebase";
import { listAll, getDownloadURL } from "../../../firebase";
import prisma from "../../../utils/prismaClient";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const listRes = await listAll(directoryRef);
      await Promise.all(
        listRes.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          console.log(url);
          const model = extractImageNameFromURL(url);
          await prisma.weddingInvitationCard.create({
            data: {
              model: model,
              url: url,
              likes: 0,
            },
          });
        })
      );
      res.status(200).json({ message: "Images mapped and saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error mapping and saving images" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

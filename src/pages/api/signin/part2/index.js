import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = await getToken({ req });
  let userEmail;

  if (token?.email) {
    userEmail = token.email;
  } else if (req.query.email) {
    // Aquí se cambió req.body por req.query
    userEmail = req.query.email;
  }

  console.log(userEmail);
  if (!userEmail) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  if (req.method === "POST") {
    const {
      name,
      lastName,
      partnerName,
      partnerLastName,
      weddingDate: weddingDateInput,
      partnerRole,
      role,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "משתמש לא קיים" });
    }
    let weddingDate = weddingDateInput;

    if (weddingDate === "") {
      weddingDate = null;
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        name,
        lastName,
        partnerName,
        partnerLastName,
        weddingDate,
        partnerRole,
        role,
      },
    });

    res
      .status(200)
      .json({ user: updatedUser, message: "הפרטים עודכנו בהצלחה" });
  }
}

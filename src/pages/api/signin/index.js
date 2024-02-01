import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email ya está en uso." });
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message || "Algo salió mal." });
    }
  } else {
    // Enviar un mensaje de error si el método de la solicitud no es POST
    res.status(405).json({ error: "Método no permitido." });
  }
}

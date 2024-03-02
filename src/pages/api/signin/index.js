import prisma from "../../../utils/prismaClient";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password, name, lastName, partnerName, partnerLastName } =
        req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        "existingUser", existingUser;
        return res.status(444).json({ error: "email already in use" });
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      res.status(200).json({ user, message: "ההרשמה בוצעה בהצלחה" });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error);
    }
  } else {
    // Enviar un mensaje de error si el método de la solicitud no es POST
    res.status(405).json({ error: "Método no permitido." });
  }
}

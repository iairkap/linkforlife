import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  "Token:", token;

  const email = token.email;
  "Email:", email;

  const formDataBis = req.query.formData;
  if (!formDataBis) {
    res
      .status(400)
      .json({ error: "formDataBis is missing in the request body" });
    return;
  }

  formDataBis;

  const {
    name,
    lastName,
    partnerName,
    partnerLastName,
    weddingDate,
    weddingDateUnknown,
  } = formDataBis;
  "Request body:", req.body;

  // Actualiza el usuario en la base de datos
  const updatedUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      name: name,
      lastName: lastName,
      partnerName: partnerName,
      partnerLastName: partnerLastName,
    },
  });
  "Updated user:", updatedUser;

  // Envía la respuesta
  res.json(updatedUser);
}

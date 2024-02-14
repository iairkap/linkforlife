import prisma from "../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  console.log("Token:", token);

  const email = token.email;
  console.log("Email:", email);

  const formDataBis = req.query.formData;
  if (!formDataBis) {
    res
      .status(400)
      .json({ error: "formDataBis is missing in the request body" });
    return;
  }

  console.log(formDataBis);

  const {
    name,
    lastName,
    partnerName,
    partnerLastName,
    weddingDate,
    weddingDateUnknown,
  } = formDataBis;
  console.log("Request body:", req.body);

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
  console.log("Updated user:", updatedUser);

  // Envía la respuesta
  res.json(updatedUser);
}

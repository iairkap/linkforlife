import prisma from "../../../../utils/prismaClient";
import { getToken } from "next-auth/jwt";
import logo from "../../../../../public/logo.png";
export default async function handler(req, res) {
  const token = await getToken({ req });

  const email = token.email;

  const {
    name,
    lastName,
    partnersFirstName,
    partnersLastName,
    weddingDate,
    weddingDateUnknown,
  } = req.body;

  // Actualiza el usuario en la base de datos
  const updatedUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      name: name,
      lastName: lastName,
      partnerName: partnersFirstName,
      partnerLastName: partnersLastName,
      profilePicture: logo,
    },
  });

  // Envía la respuesta
  res.json(updatedUser);
}

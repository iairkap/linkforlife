import prisma from "../../../../utils/prismaClient";

//estoy haciendo la api wedding/id, primero quero un get para obtener la boda con el id que me pasen, si es post quiero crear DENTRO de wedding un weddingInvitationList

export default async function handler(req, res) {
  if (req.method === "GET") {
    const wedding = await prisma.wedding.findUnique({
      where: {
        id: Number(req.query.id),
      },
      include: {
        users: true,
        admin: true,
        groups: true,
        weddingInvitationList: true,
      },
    });
    if (!wedding) {
      res.status(404).json({ message: "Wedding not found" });
      return;
    }
    res.status(200).json(wedding);
  }

  if (req.method === "POST") {
    const wedding = await prisma.wedding.findUnique({
      where: {
        id: Number(req.query.id),
      },
      include: {
        users: true,
      },
    });

    if (!wedding) {
      res.statzus(404).json({ message: "Wedding not found" });
      return;
    }
    const userId = wedding.users[0].id;
    const newWeddingInvitationList = await prisma.weddingInvitationList.create({
      data: {
        ...req.body,
        wedding: {
          connect: {
            id: Number(req.query.id),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).json(newWeddingInvitationList);
  }
}

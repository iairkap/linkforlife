import prisma from "../../utils/prismaClient";

async function generateTestData() {
  for (let i = 0; i < 67; i++) {
    const weddingInvitationListId = i + 1; // Assuming IDs start at 1 and increment
    const groupId = Math.floor(Math.random() * 34) + 1; // Generates a random number between 1 and 34

    await prisma.weddingInvitationList.update({
      where: { id: weddingInvitationListId },
      data: {
        groups: {
          connect: { id: groupId },
        },
      },
    });
  }
}

generateTestData();

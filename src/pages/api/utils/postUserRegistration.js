import { PrismaClient } from "@prisma/client";

export async function postUserRegistration(event) {
  const prisma = new PrismaClient();

  try {
    const { email, name } = event.user;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          provider: "GOOGLE",
        },
      });
    } else {
    }
  } catch (error) {
    console.error("Error during postUserRegistration:", error);
  } finally {
    await prisma.$disconnect();
  }
}

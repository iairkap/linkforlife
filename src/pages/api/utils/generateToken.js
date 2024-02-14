import prisma from "../../../utils/prismaClient";
import JWT from "jsonwebtoken";

export async function generateToken(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      console.error("User not found in database");
      return;
    }

    // Generate a token
    const token = JWT.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  } catch (error) {
    console.error("Error during token generation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

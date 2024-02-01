import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ error: "No user found with this email." });
      return;
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ error: "Incorrect password." });
      return;
    }

    // User is authenticated, generate a token
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
    // Set the token in a httpOnly cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // use https in production
        sameSite: "strict",
        maxAge: 3600, // 1 hour
        path: "/",
      })
    );

    res.status(200).json({ token });
  }
}

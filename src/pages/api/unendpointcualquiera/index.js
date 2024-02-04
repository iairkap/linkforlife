import { decode } from "next-auth/jwt";

export default async (req, res) => {
  const token = req.cookies["next-auth.session-token"];

  const nextSecret = process.env.NEXTAUTH_SECRET;
  const jwtSecret = process.env.JWT_SECRET;

  try {
    if (token) {
      const decoded = await decode({ token, secret: nextSecret });
      console.log(decoded);
      res.status(200).json({ decoded });
    } else {
      res.status(200).json({ decoded: "no token" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

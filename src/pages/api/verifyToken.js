import JWT from "jsonwebtoken";
import { parse } from "cookie";

export default function verifyToken(req) {
  const { token } = parse(req.headers.cookie || "");

  if (!token) {
    console.log("No token provided in the request");
    return null;
  }

  console.log("Received token:", token);

  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
    console.log("Decoded token:", decoded);
  } catch (error) {
    console.log("Token verification failed:", error);
    return null;
  }

  return userId;
}

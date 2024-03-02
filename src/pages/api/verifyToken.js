/* import JWT from "jsonwebtoken";
import { parse } from "cookie";

export default function verifyToken(req) {
  const { token } = parse(req.headers.cookie || "");

  if (!token) {
    ("No token provided in the request");
    return null;
  }

  ("Received token:", token);

  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
    ("Decoded token:", decoded);
  } catch (error) {
    ("Token verification failed:", error);
    return null;
  }

  return userId;
}
 */

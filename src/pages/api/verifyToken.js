/* import JWT from "jsonwebtoken";
import { parse } from "cookie";

export default function verifyToken(req) {
  const { token } = parse(req.headers.cookie || "");

  if (!token) {
    
    return null;
  }

  

  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
    
  } catch (error) {
    
    return null;
  }

  return userId;
}
 */

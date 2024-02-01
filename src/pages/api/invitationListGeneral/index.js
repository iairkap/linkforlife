export default async function handler(req, res) {
  const { token } = parse(req.headers.cookie || "");

  if (!token) {
    console.log("No token provided in the request");
    res.status(400).json({ message: "No token provided" });
    return;
  }

  console.log("Received token:", token);

  let userId;
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
    console.log("Decoded token:", decoded);
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (req.method === "GET") {
    try {
      const weddingInvitationList = await prisma.weddingInvitationList.findMany(
        {
          where: {
            userId: Number(userId),
          },
        }
      );

      console.log("Fetched wedding invitation list:", weddingInvitationList);
      res.status(200).json(weddingInvitationList);
    } catch (error) {
      console.log("Failed to fetch data:", error);
      res.status(500).json({ error: "Unable to fetch data" });
    }
  } else if (req.method === "POST") {
    const { ...data } = req.body;

    try {
      const newInvitation = await prisma.weddingInvitationList.create({
        data: {
          userId: Number(userId),
          ...data,
        },
      });

      res.status(201).json(newInvitation);
    } catch (error) {
      console.log("Failed to create invitation:", error);
      res.status(500).json({ error: "Unable to create invitation" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

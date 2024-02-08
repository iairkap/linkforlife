// pages/api/emailUser.js

import nodemailer from "nodemailer";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const token = await getToken({ req });

  console.log(token);
  const { emailUser } = req.body;
  const inviteToken = uuidv4();

  const email = token.email;

  const button = `<a href="https://weddingplanningdashboard.vercel.app/token=${inviteToken}">Accept Invitation</a>`;
  const buttonLocalHost = `<a href="https://localhost:3000/token=${inviteToken}">Accept Invitation</a>`;

  const wedding = await prisma.wedding.findFirst({
    where: {
      users: {
        some: {
          email: email,
        },
      },
    },
  });

  if (wedding) {
    await prisma.inviteToken.create({
      data: {
        email: emailUser,
        token: inviteToken,
        weddingId: wedding.id,
      },
    });
  } else {
    console.log("No wedding found for user:", userEmail);
  }

  if (req.method === "POST") {
    console.log(emailUser);

    let transporter = nodemailer.createTransport({
      service: "gmail", // use your email service
      auth: {
        user: process.env.EMAIL_USERNAME, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL, // sender address
      to: emailUser, // list of receivers
      subject: "Weddinginvitation", // Subject line
      html: `Hi there,

      You've been invited by ${email} to collaborate on our Wedding Invitation List dashboard.
      
      To accept the invitation and start collaborating, simply click the button below:
      
      ${button}
      ${buttonLocalHost}
      
      If you didn't expect this invitation or have any questions, feel free to reach out to us.
      
      Looking forward to collaborating with you!
      
      Best regards,
      Weddinvitation Team`, // HTML body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent: " + info.response);
      }
    });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

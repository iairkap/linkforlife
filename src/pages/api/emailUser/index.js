// pages/api/emailUser.js

import nodemailer from "nodemailer";
import { getToken } from "next-auth/jwt";
import prisma from "../../../utils/prismaClient";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const token = await getToken({ req });

  const { emailUser } = req.body;

  const email = token.email;
  const inviteToken = Math.floor(100000 + Math.random() * 900000); // generates a 6 digit number
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
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 72); // sets the expiration date to 72 hours from now
    await prisma.inviteToken.create({
      data: {
        email: emailUser,
        token: inviteToken,
        weddingId: wedding.id,
        expiresAt: expiresAt,
      },
    });
  } else {
  }

  if (req.method === "POST") {
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
      html: `
      <h1 style="color: blue;">Hi there,</h1>
    
      <p>You've been invited by <strong>${email}</strong> to collaborate on our Wedding Invitation List dashboard.</p>
      
      <p>To accept the invitation, please follow these steps:</p>
      
      <ol>
        <li>Log in to your account.</li>
        <li>Click the 'Join Wedding' button below and enter the following code: <strong>${inviteToken}</strong></li>
      </ol>
    
      <p><strong>Note:</strong> This invitation code will expire in 72 hours.</p>
    
      <div style="margin: 1em 0;">
        ${button}
        ${buttonLocalHost}
      </div>
      
      <p>If you didn't expect this invitation or have any questions, feel free to reach out to us.</p>
      
      <p>Looking forward to collaborating with you!</p>
      
      <p>Best regards,</p>
      <p>Weddinvitation Team</p>
    `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send("Email sent: " + info.response);
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/emailUser.js

import nodemailer from "nodemailer";
import { getToken } from "next-auth/jwt";
import prisma from "../../../utils/prismaClient";
import { v4 as uuidv4 } from "uuid";
import mjml2html from "mjml";

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

    const mjml = `
    <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-hero><mj-image src="https://firebasestorage.googleapis.com/v0/b/linkforlife.appspot.com/o/logo%20weddinvitation.png?alt=media&token=38aed6b4-a558-4f25-afce-843c2f566bb9" width="300px"margin-bottom="2rem"> </mj-image></mj-hero>
          <mj-text font-size="20px" color="#000" font-family="helvetica">Hi there,</mj-text>
          <mj-text font-size="15px" color="#000000" font-family="helvetica">You've been invited by ${email} to collaborate on our Wedding Invitation List dashboard.</mj-text>
          <mj-text font-size="15px" color="#000000" font-family="helvetica">To accept the invitation, please follow these steps:</mj-text>
          <mj-text font-size="15px" color="#000000" font-family="helvetica">1. Log in to your account.</mj-text>
          <mj-text font-size="15px" color="#000000" font-family="helvetica">2. Click the 'Join Wedding' button below and enter the following code: </mj-text>
          <mj-wrapper background-color="#818369" >
          <mj-text font-size="30px" align="center" color="white"> ${inviteToken}</mj-text>
            </mj-wrapper>
          <mj-text font-size="15px" color="#000000" font-family="helvetica">Note: This invitation code will expire in 72 hours.</mj-text>
          <mj-button href="https://localhost:3000/en" font-family="helvetica" border-radius="0.5rem" background-color="818369">Accept Invitation (localhost)</mj-button>
          </mj-column>
          </mj-section>
          </mj-body>
          </mjml>
          
          
          `;

    /*           <mj-button href="https://weddingplanningdashboard.vercel.app/token=${inviteToken}" font-family="helvetica" border-radius="0.5rem" background-color="818369" >Accept Invitation</mj-button>
     */ const htmlOutput = mjml2html(mjml).html;

    let mailOptions = {
      from: process.env.EMAIL,
      to: emailUser,
      subject: "Weddinginvitation",
      html: htmlOutput,
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

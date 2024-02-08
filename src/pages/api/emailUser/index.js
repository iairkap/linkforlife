// pages/api/emailUser.js

import nodemailer from "nodemailer";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const userEmail = token.email;

  const button = `<a href="https://weddingplanningdashboard.vercel.app/">Accept Invitation</a>`;

  if (req.method === "POST") {
    const { emailUser } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail", // use your email service
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL, // sender address
      to: emailUser, // list of receivers
      subject: "Weddinginvitation", // Subject line
      html: `Hi there,

      You've been invited to collaborate on our Wedding Invitation List dashboard.
      
      To accept the invitation and start collaborating, simply click the button below:
      
      ${button}
      
      If you didn't expect this invitation or have any questions, feel free to reach out to us.
      
      Looking forward to collaborating with you!
      
      Best regards,
      [Your Brand Name] Team`, // HTML body
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

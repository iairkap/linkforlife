import nodemailer from "nodemailer";
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from "uuid";
import mjml2html from "mjml";
import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  const token = await getToken({ req });
  const {
    name,
    lastName,
    partnerName,
    partnerLastName,
    weddingDate,
    weddingTime,
    weddingPlace,
    comments,
    invitationCardModel,
    invitationCardId,
  } = req.body;

  const email = token.email;

  if (!email) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const credits = user.credits;
  if (credits === 0) {
    res.status(502).json({ message: "No Credits" });
    return;
  }

  if (req.method === "POST") {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password
      },
    });

    const mjml = `
    <mjml>
    <mj-body>
      <mj-section background-color="#fff">
        <mj-column>
          <mj-hero>
            <mj-image
              src="https://firebasestorage.googleapis.com/v0/b/linkforlife.appspot.com/o/logo%20weddinvitation.png?alt=media&token=38aed6b4-a558-4f25-afce-843c2f566bb9"
              width="300px"
              margin-bottom="2rem"
            >
            </mj-image>
          </mj-hero>
          <mj-divider border-color="#818369"></mj-divider>
          <mj-text font-size="16px" color="#000" font-family="helvetica"
            >Hay un nuevo pedido de personalizacion de card: del usuario ${email}
          </mj-text>
          <mj-text>Modelo: ${invitationCardModel} ID: ${invitationCardId}</mj-text>
          <mj-text>Nombre: ${name} </mj-text>
          <mj-text>Apellido: ${lastName} </mj-text>
          <mj-text>Nombre 2: ${partnerName} </mj-text>
          <mj-text>Apellido 2: ${partnerLastName} </mj-text>
          <mj-text>Fecha de casamiento: ${weddingDate} </mj-text>
          <mj-text>Hora de Casamiento: ${weddingTime} </mj-text>
          <mj-text>Lugar: ${weddingPlace} </mj-text>
          <mj-text>Comentarios: ${comments} </mj-text>
          <mj-text> creddits: ${credits} </mj-text>

        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>  
    `;

    const htmlOutput = mjml2html(mjml).html;

    let mailOptions = {
      from: process.env.EMAIL,
      to: `iairkap@gmail.com`,
      subjetct: "Nueva wedding invitation card",
      html: htmlOutput,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        res.status(500).send(error);
      } else {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            credits: {
              decrement: 1,
            },
          },
        });
        res.status(200).send("Email sent: " + info.response);
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const { name, email, message } = req.body;

    const mailData = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: `Message From ${email} - ${name}`,
      text: message,
      html: `<div>${message}</div>`,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log(info);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

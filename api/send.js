const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { host, port, user, pass, to, cc, bcc, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: parseInt(port) === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: user,
      to,
      cc,
      bcc,
      subject,
      text,
    });
    res.status(200).send("✅ Email sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to send email!");
  }
}

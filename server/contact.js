import nodemailer from "nodemailer";

const allowedOrigins = [
  "http://localhost:4321",
  "https://brianchaparro.vercel.app",
];

export function contactCors(req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader("Access-Control-Allow-Methods", "POST");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return next();
}

export function sendContactMessage(req, res) {
  const { name, email, message } = req.body ?? {};

  if (!email || !message || !name) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "brianmarecco@gmail.com",
    to: ["brchm.dev@gmail.com"],
    subject: "Portafolio - Mensaje de contacto",
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al enviar el mensaje" });
    }

    console.log("Mensaje enviado exitosamente");
    return res.status(200).json({ message: "Mensaje enviado exitosamente" });
  });
}

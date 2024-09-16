import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:4321",
  "https://brianchaparro.vercel.app",
];

app.disable("x-powered-by");

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "POST");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

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
    } else {
      console.log("Mensaje enviado exitosamente");
      return res.status(200).json({ message: "Mensaje enviado exitosamente" });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

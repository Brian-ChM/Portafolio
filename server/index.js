import express from "express";
import dotenv from "dotenv";
import { contactCors, sendContactMessage } from "./contact.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(contactCors);
app.use(express.json());
app.post("/contact", sendContactMessage);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

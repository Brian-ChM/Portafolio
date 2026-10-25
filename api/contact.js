import { contactCors, sendContactMessage } from "../server/contact.js";

export default function handler(req, res) {
  return contactCors(req, res, () => {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(405).json({ error: "Método no permitido" });
    }

    return sendContactMessage(req, res);
  });
}

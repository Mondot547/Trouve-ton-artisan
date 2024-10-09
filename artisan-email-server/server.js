const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Limite les requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message: "Trop de requêtes, réessayez dans 15 minutes.",
});

// Options CORS
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(limiter);

// Configure le transporteur Nodemailer avec Mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587, // Port de Mailtrap
  auth: {
    user: process.env.MAILTRAP_USER, // Récupère l'utilisateur depuis .env
    pass: process.env.MAILTRAP_PASSWORD, // Récupère le mot de passe depuis .env
  },
});

// Route POST pour envoyer l'email
app.post(
  "/send-email",
  [
    body("fromName").isLength({ min: 3 }).trim().escape(),
    body("fromEmail").isEmail().normalizeEmail(),
    body("subject").isLength({ min: 3, max: 100 }).trim().escape(),
    body("messageContent").isLength({ min: 10 }).trim().escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { toEmail, fromName, fromEmail, subject, messageContent } = req.body;

    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      subject: subject,
      text: messageContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur d'envoi de l'email:", error);
        return res.status(500).json({ error: "Erreur d'envoi de l'email" });
      }
      console.log("Email envoyé:", info.response);
      res.status(200).json({ message: "Email envoyé avec succès !" });
    });
  }
);

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Serveur backend en cours d'exécution sur http://localhost:3000");
});

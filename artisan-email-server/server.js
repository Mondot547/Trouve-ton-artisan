const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

//limiter le nombre de requête par IP pour éviter les attaques DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre de 15 minutes
  message: 'Trop de requête de cette IP, veuillez réessayer dans 15 minutes.'
});

const corsOptions = {
  origin: ['http://localhost:4200', 'www.trouve-ton-artisan.fr'],
  optionSuccessStatus: 200
};

const app = express();
app.use(express.json({ limit: '10kb' })); //limitez la taille des requêtes
app.use(cors(corsOptions)); // Activer CORS pour permettre les requêtes depuis ton frontend Angular
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "same-site" },
}));
app.use(limiter);

// Configuration de Nodemailer pour MailHog
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

// Point de terminaison pour envoyer l'email
app.post('/send-email', [
  //vérifie que seules les données valides sont acceptées par le serveur (évite les injections malveillante !)
  body('fromName').isLength({ min: 3, max: 50 }).trim().escape(),
  body('fromEmail').isEmail().normalizeEmail(),
  body('messageContent').isLength({ min: 10, max: 1000 }).trim().escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { toEmail, fromName, fromEmail, messageContent } = req.body;

  const mailOptions = {
    from: `${fromName} <${fromEmail}>`,
    to: toEmail,
    subject: 'Nouveau message de contact',
    text: messageContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
    }
    console.log('Email envoyé avec succès:', info.response);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  });
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000');
});

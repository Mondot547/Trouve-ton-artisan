const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Activer CORS pour permettre les requêtes depuis ton frontend Angular

// Configuration de Nodemailer pour MailHog
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025, // MailHog écoute par défaut sur le port 1025
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

// Point de terminaison pour envoyer l'email
app.post('/send-email', (req, res) => {
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

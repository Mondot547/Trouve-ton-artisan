const nodemailer = require("nodemailer");
const express = require("express");
const artisans = require("../assets/datas.json");

const app = express();
app.use(express.json());

// Configuration de Nodemailer avec MailHog
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  auth: {
    user: "",
    pass: "",
  },
});

function envoyerEmailArtisan(artisanId, message, callback) {
  const artisan = artisans.find((a) => a.id === artisanId);
  if (!artisan) {
    return callback(new Error("Artisan non trouvé"));
  }

  const mailOptions = {
    from: "contact@example.com",
    to: artisan.email,
    subject: "Nouveau message de client",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return callback(error);
    }
    callback(null, info);
  });
}

// Route API pour traiter le formulaire de contact
app.post("/envoyer-email", (req, res) => {
  const { artisanId, message } = req.body;

  envoyerEmailArtisan(artisanId, message, (error, info) => {
    if (error) {
      return res.status(500).send("Erreur lors de l'envoi du message");
    }
    res.send("Message envoyé avec succès");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

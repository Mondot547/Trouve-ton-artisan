const express = require("express");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const csrf = require("csurf");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const artisans = require("../assets/datas.json");

const app = express();
app.use(express.json());
app.use(cookieParser); // Utiliser cookie-parser avant csrf

// Configuration de Nodemailer avec MailHog
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  auth: {
    user: "",
    pass: "",
  },
});

// Sécuriser les en-têtes HTTP
app.use(helmet());

// Activer CORS pour restreindre l'accès à des domaines spécifiques
app.use(
  cors({
    origin: "https://votre-domaine.com", // Remplacez par votre domaine
  })
);

// Limiter le nombre de requêtes par IP pour éviter les attaques de force brute
const limiter = rateLimit.default({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes
  message: "Trop de requêtes, veuillez réessayer plus tard.",
});
app.use(limiter);

// Protection contre les attaques CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Fonction pour envoyer un email à l'artisan
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

// Route API pour traiter le formulaire de contact avec validation des entrées
app.post(
  "/envoyer-email",
  csrfProtection, // Ajouter csrfProtection comme middleware sur cette route
  [
    // Ajout des validations pour sécuriser les données entrantes
    check("artisanId").isInt().withMessage("ID d'artisan invalide"),
    check("message")
      .isLength({ min: 10 })
      .withMessage("Le message doit contenir au moins 10 caractères"),
  ],
  (req, res) => {
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { artisanId, message } = req.body;

    envoyerEmailArtisan(artisanId, message, (error, info) => {
      if (error) {
        return res.status(500).send("Erreur lors de l'envoi du message");
      }
      res.send("Message envoyé avec succès");
    });
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
